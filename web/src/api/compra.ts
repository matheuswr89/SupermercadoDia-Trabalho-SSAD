import axios from "axios";

export async function cadastrarCompra(dados: any) {
  const response = await axios.post(
    "http://localhost:8080/SuperDia/api/compras/cadastrar", dados
  );
  return response.data;
}

export async function listarCompras() {
  const response = await axios.get(
    "http://localhost:8080/SuperDia/api/compras/listar"
  );
  return response.data;
}