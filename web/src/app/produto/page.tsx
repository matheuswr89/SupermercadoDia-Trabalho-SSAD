"use client";
import styles from "./style.module.css";
import stylesPage from "../page.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { cadastrarProduto, listarProduto, removerProduto } from "@/api/produtos";

export default function Login() {
  const [state, setState] = useState({
    nome: "",
    descricao: "",
    preco: 0,
    quantidadeEstoque: 0,
    estoqueMinimo: 0,
    id: 0
  });

  const [produtos, setProdutos] = useState<any>([]);

  useEffect(() => {
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
    setState({
      nome: "",
      descricao: "",
      preco: 0,
      quantidadeEstoque: 0,
      estoqueMinimo: 0,
      id: 0
    });
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
  return (
    <main className={stylesPage.main}>
      <div className={styles.product_create_container}>
        <h2>Create Product</h2>
        <form id="product-create-form" onSubmit={submit}>
          <div className={styles.form_group}>
            <label htmlFor="nome">Name:</label>
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
            <label htmlFor="descricao">Description:</label>
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
            <label htmlFor="preco">Price:</label>
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
            <label htmlFor="quantidadeEstoque">Stock Quantity:</label>
            <input
              type="number"
              id="quantidadeEstoque"
              name="quantidadeEstoque"
              required
              value={state.quantidadeEstoque}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="estoqueMinimo">Minimum Stock:</label>
            <input
              type="number"
              id="estoqueMinimo"
              name="estoqueMinimo"
              required
              value={state.estoqueMinimo}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.form_group}>
            <button type="submit">{!state.nome? "Create": "Update"} Product</button>
          </div>
        </form>
      </div>

      <div className={styles.product_list_container}>
        <h2>Product List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock Quantity</th>
              <th>Minimum Stock</th>
              <th>Action</th>
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
                    Edit
                  </button>
                  <button
                    className={styles.remove_btn}
                    onClick={() => removeProduct(produto)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
