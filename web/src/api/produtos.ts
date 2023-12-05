import axios from "axios";

export async function cadastrarProduto(dados: any) {
  const response = await axios.post(
    "http://localhost:8080/SuperDia/api/produtos/cadastrar", dados
  );
  return response.data;
}

export async function removerProduto(dados: any) {
  const response = await axios.post(
    "http://localhost:8080/SuperDia/api/produtos/remover", dados
  );
  return response.data;
}

export async function listarProduto() {
  const response = await axios.get(
    "http://localhost:8080/SuperDia/api/produtos/listar"
  );
  return response.data;
}
