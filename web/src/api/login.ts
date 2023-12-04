import axios from "axios";

export async function login(dados: any) {
  const response = await axios.post(
    "http://localhost:8080/SuperDia/api/entrar", dados
  );
  return response.data;
}
