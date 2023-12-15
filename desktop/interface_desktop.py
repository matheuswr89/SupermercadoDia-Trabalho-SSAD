import json
import tkinter as tk
import requests

class CaixaSupermercado:
    def __init__(self, root):
        self.root = root
        self.root.title("Caixa de Supermercado")

        # Definindo o tamanho da janela
        self.root.geometry("650x500")  # Ajuste a largura da janela conforme necessário

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

        # Frame para os botões
        self.buttons_frame = tk.Frame(self.root)
        self.buttons_frame.pack(pady=10)

        self.plus_button = tk.Button(self.buttons_frame, text="+", command=self.incrementar_quantidade)
        self.plus_button.grid(row=0, column=0, padx=5)

        self.minus_button = tk.Button(self.buttons_frame, text="-", command=self.decrementar_quantidade)
        self.minus_button.grid(row=0, column=1, padx=5)

        self.enter_button = tk.Button(self.buttons_frame, text="Enter", command=self.processar_produto)
        self.enter_button.grid(row=0, column=2, padx=5)

        self.finalizar_button = tk.Button(self.buttons_frame, text="Finalizar Compra", command=self.finalizar_compra)
        self.finalizar_button.grid(row=0, column=3, padx=5)

        self.valor_total = 0.0

        # Fazer a requisição HTTP para obter a lista de produtos
        self.lista_produtos = self.obter_lista_produtos()

        # Adicione uma lista para armazenar os produtos selecionados
        self.lista_compras = []

    def obter_lista_produtos(self):
        try:
            with open("lista.json", "r") as file:
                lista_produtos = json.load(file)
                return lista_produtos

        except FileNotFoundError:
            print("Arquivo de produtos não encontrado.")
            return []

        except json.JSONDecodeError as e:
            print(f"Erro ao decodificar o JSON: {e}")
            return []

    def obter_preco_por_id(self, produto_id):
        for produto in self.lista_produtos:
            if str(produto["id"]) == str(produto_id):
                return produto["preco"]

        return None  # Retorna None se o ID não for encontrado na lista

    def obter_info_produto_por_id(self, produto_id):
        for produto in self.lista_produtos:
            if str(produto["id"]) == str(produto_id):
                return produto

        return None  # Retorna None se o ID não for encontrado na lista

    def processar_produto(self):
        produto_id = self.id_entry.get()

        # Verificar se um ID de produto foi fornecido
        if not produto_id:
            print("Por favor, insira o ID do produto.")
            return

        # Obter o preço correspondente ao ID
        preco_produto = self.obter_preco_por_id(produto_id)

        if preco_produto is not None:
            quantidade = self.quantidade_value.get()

            try:
                quantidade = int(quantidade)
                valor_produto = preco_produto * quantidade

                self.valor_total += valor_produto

                # Obter informações do produto da lista
                produto_info = self.obter_info_produto_por_id(produto_id)

                # Adicionar cada unidade do produto à lista de compras
                for _ in range(quantidade):
                    produto = {
                        "id": int(produto_id),
                        "descricao": produto_info["descricao"],
                        "estoqueMinimo": produto_info["estoqueMinimo"],
                        "nome": produto_info["nome"],
                        "preco": produto_info["preco"],
                        "quantidadeEstoque": produto_info["quantidadeEstoque"]
                    }
                    self.lista_compras.append(produto)

                self.produtos_text.config(state=tk.NORMAL)
                self.produtos_text.insert(tk.END, f"ID: {produto_id} \t\t\t {quantidade} unid \t\t\t R$ {valor_produto:.2f}\n")
                self.produtos_text.config(state=tk.DISABLED)

                self.valor_total_label.config(text=f"Valor Total: R$ {self.valor_total:.2f}")

                # Limpar os campos de entrada
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

    def finalizar_compra(self):
        # Criar o JSON final com a estrutura desejada
        compra_json = {
            "produtos": self.lista_compras,
            "usuario": {
                # As informações do usuário (adapte conforme necessário)
            },
            "valorTotal": self.valor_total
        }

        # Exemplo de como salvar o JSON em um arquivo
        with open("compra.json", "w") as json_file:
            json.dump(compra_json, json_file, indent=2)

        # Pode imprimir a lista de compras ou realizar outras ações necessárias

if __name__ == "__main__":
    root = tk.Tk()
    caixa = CaixaSupermercado(root)
    root.mainloop()
