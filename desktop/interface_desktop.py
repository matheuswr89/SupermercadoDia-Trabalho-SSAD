import json
import requests
import tkinter as tk
from tkinter import simpledialog, messagebox

class CaixaSupermercado:

    def __init__(self, root):
        self.root = root
        self.root.title("Caixa de Supermercado")
        self.root.geometry("650x500")

        self.produtos_text = tk.Text(self.root, height=15, width=60, state=tk.DISABLED)
        self.produtos_text.pack(pady=(10, 5))

        self.valor_total_label = tk.Label(self.root, text="Valor Total: R$ 0.00", font=("Helvetica", 12))
        self.valor_total_label.pack(pady=(10, 5))

        self.id_label = tk.Label(self.root, text="ID do Produto:", font=("Helvetica", 12))
        self.id_label.pack()

        self.id_entry = tk.Entry(self.root)
        self.id_entry.pack()

        self.quantidade_label = tk.Label(self.root, text="Quantidade:", font=("Helvetica", 12))
        self.quantidade_label.pack()

        self.quantidade_value = tk.StringVar()
        self.quantidade_value.set("1")

        self.quantidade_entry = tk.Entry(self.root, textvariable=self.quantidade_value, state=tk.DISABLED)
        self.quantidade_entry.pack()

        self.buttons_frame = tk.Frame(self.root)
        self.buttons_frame.pack(pady=10)

        self.plus_button = tk.Button(self.buttons_frame, text="+", command=self.incrementar_quantidade)
        self.plus_button.grid(row=0, column=0, padx=5)

        self.minus_button = tk.Button(self.buttons_frame, text="-", command=self.decrementar_quantidade)
        self.minus_button.grid(row=0, column=1, padx=5)

        self.enter_button = tk.Button(self.buttons_frame, text="Enter", command=self.processar_produto)
        self.enter_button.grid(row=0, column=2, padx=5)

        self.finalizar_button = tk.Button(self.buttons_frame, text="Finalizar Compra", command=self.obter_dados_cliente)
        self.finalizar_button.grid(row=0, column=3, padx=5)

        self.valor_total = 0.0

        self.lista_produtos = self.obter_lista_produtos()
        self.lista_compras = []
        self.info_funcionario = None

        self.login()

    def login(self):
        username = simpledialog.askstring("Login", "Digite o nome de usuário:")
        password = simpledialog.askstring("Login", "Digite a senha:", show="*")

        try:
            response = requests.get("http://localhost:8080/SuperDia/api/listar")
            response.raise_for_status()

            lista_usuarios = response.json()

            for usuario in lista_usuarios:
                if usuario["perfil"] == "caixa" and usuario["senha"] == password and usuario["pessoa"]["nome"] == username:
                    self.info_funcionario = usuario
                    messagebox.showinfo("Login bem-sucedido", f"Bem-vindo, {username}!")
                    return

            messagebox.showerror("Erro de login", "Credenciais incorretas. O programa será encerrado.")
            self.root.destroy()

        except requests.RequestException as e:
            messagebox.showerror("Erro de conexão", f"Erro na requisição HTTP: {e}")
            self.root.destroy()

   # ATENÇÃO!
    # Remover comentário e remover a função TEMP
   
    def obter_lista_produtos(self):
        try:
            # Fazer a requisição HTTP para obter a lista de produtos
            response = requests.get("http://localhost:8080/SuperDia/api/produtos/listar")
            response.raise_for_status()  # Verifica se a requisição foi bem-sucedida

            # Interpretar o JSON da resposta
            lista_produtos = response.json()
            return lista_produtos

        except requests.RequestException as e:
            print(f"Erro na requisição HTTP: {e}")
            return []

    def obter_preco_por_id(self, produto_id):
        for produto in self.lista_produtos:
            if str(produto["id"]) == str(produto_id):
                return produto["preco"]

        return None

    def obter_info_produto_por_id(self, produto_id):
        for produto in self.lista_produtos:
            if str(produto["id"]) == str(produto_id):
                return produto

        return None

    def processar_produto(self):
        produto_id = self.id_entry.get()

        if not produto_id:
            print("Por favor, insira o ID do produto.")
            return

        preco_produto = self.obter_preco_por_id(produto_id)

        if preco_produto is not None:
            quantidade = self.quantidade_value.get()

            try:
                quantidade = int(quantidade)
                valor_produto = preco_produto * quantidade

                self.valor_total += valor_produto

                produto_info = self.obter_info_produto_por_id(produto_id)

                for _ in range(quantidade):
                    produto = {
                        "id": int(produto_id),
                        "descricao": produto_info["descricao"],
                        "estoqueMinimo": produto_info["estoqueMinimo"],
                        "nome": produto_info["nome"],
                        "preco": produto_info["preco"],
                        "quantidadeEstoque": produto_info["quantidadeEstoque"],
                        "quantity": quantidade
                    }
                    self.lista_compras.append(produto)

                self.produtos_text.config(state=tk.NORMAL)
                self.produtos_text.insert(tk.END, f"ID: {produto_id} \t\t\t {quantidade} unid \t\t\t R$ {valor_produto:.2f}\n")
                self.produtos_text.config(state=tk.DISABLED)

                self.valor_total_label.config(text=f"Valor Total: R$ {self.valor_total:.2f}")

                self.id_entry.delete(0, tk.END)
                self.quantidade_value.set("1")

            except ValueError:
                print("Por favor, insira uma quantidade válida.")
        else:
            print(f"Produto com ID {produto_id} não encontrado.")

    def incrementar_quantidade(self):
        current_value = self.quantidade_value.get()
        try:
            current_value = int(current_value)
            self.quantidade_value.set(str(current_value + 1))
        except ValueError:
            print("A quantidade deve ser um número inteiro.")

    def decrementar_quantidade(self):
        current_value = self.quantidade_value.get()
        try:
            current_value = int(current_value)
            if current_value > 1:
                self.quantidade_value.set(str(current_value - 1))
        except ValueError:
            print("A quantidade deve ser um número inteiro.")

    def validar_cartao_credito(self, numero_cartao):
        xmls = f"""<?xml version="1.0" encoding="UTF-8"?>
                   <S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
                    <S:Header/>
                    <S:Body>
                        <ns2:validaCartao xmlns:ns2="http://soap.superdia.com.br/">
                            <numeroCartao>{numero_cartao}</numeroCartao>
                        </ns2:validaCartao>
                    </S:Body>
                   </S:Envelope>"""
        try:
            r = requests.post('http://localhost:8080/SuperDia/ValidarCartaoEndpoint', data=xmls)
            r.raise_for_status()

            valid = r.text[r.text.index('<return>') + 8:r.text.index('</return>')].capitalize()
            return valid == 'True'

        except requests.RequestException as e:
            print(f"Erro na requisição para validar cartão: {e}")
            return True

    def salvar_compra_no_banco(self, compra_json):
        try:
            url = "http://localhost:8080/SuperDia/api/compras/cadastrar"
            headers = {"Content-Type": "application/json"}

            response = requests.post(url, data=json.dumps(compra_json), headers=headers)
            response.raise_for_status()

            messagebox.showinfo("Compra Registrada", "Compra registrada no banco de dados com sucesso!")

        except requests.RequestException as e:
            messagebox.showerror("Erro ao Registrar Compra", f"Erro na requisição HTTP para registrar compra: {e}")

    def obter_dados_cliente(self):
        if not self.lista_compras:
            messagebox.showinfo("Compra Cancelada", "Adicione itens à lista de compras antes de finalizar a compra.")
            return

        if self.info_funcionario:
            numero_cartao = simpledialog.askstring("Número do Cartão", "Digite o número do Cartão de Crédito:")

            if numero_cartao:
                if self.validar_cartao_credito(numero_cartao):
                    compra_json = {
                        "produtos": self.lista_compras,
                        "usuario": {
                            "id": self.info_funcionario["id"],
                            "perfil": self.info_funcionario["perfil"],
                            "pessoa": {
                                "cpf": self.info_funcionario["pessoa"]["cpf"],
                                "dataNascimento": self.info_funcionario["pessoa"]["dataNascimento"],
                                "email": self.info_funcionario["pessoa"]["email"],
                                "endereco": self.info_funcionario["pessoa"]["endereco"],
                                "id": self.info_funcionario["pessoa"]["id"],
                                "nome": self.info_funcionario["pessoa"]["nome"],
                                "telefone": self.info_funcionario["pessoa"]["telefone"],
                            },
                        },
                        "valorTotal": self.valor_total
                    }

                    self.salvar_compra_no_banco(compra_json)

                    self.produtos_text.config(state=tk.NORMAL)
                    self.produtos_text.delete("1.0", tk.END)
                    self.produtos_text.config(state=tk.DISABLED)

                    self.valor_total = 0.0
                    self.valor_total_label.config(text=f"Valor Total: R$ {self.valor_total:.2f}")

                    self.lista_compras = []

                    messagebox.showinfo("Compra Concluída", "Compra finalizada com sucesso!")

                else:
                    messagebox.showinfo("Compra Cancelada", "Número do cartão de crédito inválido. Compra cancelada.")

            else:
                messagebox.showinfo("Compra Cancelada", "Número do cartão de crédito não fornecido. Compra cancelada.")

if __name__ == "__main__":
    root = tk.Tk()
    caixa = CaixaSupermercado(root)
    root.mainloop()
