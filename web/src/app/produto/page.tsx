"use client";
import styles from "./style.module.css";
import stylesPage from "../page.module.css";
import { useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  cadastrarProduto,
  listarProduto,
  removerProduto,
} from "@/api/produtos";
import ProtectedRoute from "../protected";

export default function Produto() {
  const [state, setState] = useState({
    nome: "",
    descricao: "",
    preco: 0,
    quantidadeEstoque: 0,
    estoqueMinimo: 0,
    id: 0,
  });

  const [produtos, setProdutos] = useState<any>([]);

  useLayoutEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const produtos = await listarProduto();
    setProdutos([...produtos]);
  };

  const submit = async (e: any) => {
    e.preventDefault();
    const response = await cadastrarProduto(state);
    if (!response["nome"]) {
      toast.error("Erro ao cadastrar o produto!");
    }
    getProducts();
    cancel();
  };

  const handleInputChange = (evt: any) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const editProduct = (produto: any) => {
    setState(produto);
  };
  const removeProduct = async (produto: any) => {
    const response = await removerProduto(produto);
    if (!response["nome"]) {
      toast.error("Erro ao remover o produto!");
    } else {
      toast.success("Produto removido com sucesso!");
    }
    getProducts();
  };

  const cancel = () => {
    setState({
      nome: "",
      descricao: "",
      preco: 0,
      quantidadeEstoque: 0,
      estoqueMinimo: 0,
      id: 0,
    });
  };

  return (
    <ProtectedRoute>
      <main className={stylesPage.main}>
        <div className={styles.product_create_container}>
          <h2>{state.id === 0 ? "Criar" : "Atualizar"} Produto</h2>
          <form id="product-create-form" onSubmit={submit}>
            <div className={styles.flex_div}>
              <div>
                <div className={styles.form_group}>
                  <label htmlFor="nome">Nome:</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                    value={state.nome}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="estoqueMinimo">Quantidade minima em estoque:</label>
                  <input
                    type="number"
                    id="estoqueMinimo"
                    name="estoqueMinimo"
                    required
                    value={state.estoqueMinimo}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <div className={styles.form_group}>
                  <label htmlFor="preco">Preço:</label>
                  <input
                    type="number"
                    id="preco"
                    name="preco"
                    step="0.01"
                    required
                    value={state.preco}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.form_group}>
                  <label htmlFor="quantidadeEstoque">Quantidade em estoque:</label>
                  <input
                    type="number"
                    id="quantidadeEstoque"
                    name="quantidadeEstoque"
                    required
                    value={state.quantidadeEstoque}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className={styles.form_group}>
              <label htmlFor="descricao">Descrição:</label>
              <input
                type="text"
                id="descricao"
                name="descricao"
                required
                value={state.descricao}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.form_group}>
              <button type="submit">
              {state.id === 0 ? "Criar" : "Atualizar"} Produto
              </button>
              <button onClick={cancel}>Cancelar</button>
            </div>
          </form>
        </div>

        <div className={styles.product_list_container}>
          <h2>Product List</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preco</th>
                <th>Quantidade em estoque</th>
                <th>Quantidade minima</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto: any) => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.descricao}</td>
                  <td>{produto.preco}</td>
                  <td>{produto.quantidadeEstoque}</td>
                  <td>{produto.estoqueMinimo}</td>
                  <td className={styles.action_buttons}>
                    <button
                      className={styles.edit_btn}
                      onClick={() => editProduct(produto)}
                    >
                      Editar
                    </button>
                    <button
                      className={styles.remove_btn}
                      onClick={() => removeProduct(produto)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </ProtectedRoute>
  );
}
