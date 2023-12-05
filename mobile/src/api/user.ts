import axios from "axios";

export async function login(dados: any) {
  const response = await axios.post(
    "http://192.168.0.105:8080/SuperDia/api/entrar", dados
  );
  return response.data;
}

export async function criarConta(dados: any) {
  const response = await axios.post(
    "http://192.168.0.105:8080/SuperDia/api/criarConta", dados
  );
  return response.data;
}
