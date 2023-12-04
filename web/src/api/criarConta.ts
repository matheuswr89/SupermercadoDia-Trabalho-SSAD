import axios from "axios";

export async function criarConta(dados: any) {
  const response = await axios.post(
    "http://localhost:8080/SuperDia/api/criarConta", dados
  );
  return response.data;
}
