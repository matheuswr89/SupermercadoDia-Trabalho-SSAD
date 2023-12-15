import axios from "axios";

export async function cadastrarCompra(dados: any) {
  const response = await axios.post(
    "http://192.168.0.100:8080/SuperDia/api/compras/cadastrar", dados
  );
  return response.data;
}
