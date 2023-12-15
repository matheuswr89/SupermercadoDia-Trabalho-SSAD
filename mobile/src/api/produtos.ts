import axios from "axios";

export async function listarProduto() {
  const response = await axios.get(
    "http://192.168.0.100:8080/SuperDia/api/produtos/listar"
  );
  return response.data;
}
