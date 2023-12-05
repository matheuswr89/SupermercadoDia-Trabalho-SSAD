import axios from "axios";

export async function login(dados: any) {
  const response = await axios.post(
    "http://localhost:8080/SuperDia/api/entrar", dados
  );
  return response.data;
}

export async function criarConta(dados: any) {
  const response = await axios.post(
    "http://localhost:8080/SuperDia/api/criarConta", dados
  );
  return response.data;
}

export async function removerUser(dados: any) {
  const response = await axios.post(
    "http://localhost:8080/SuperDia/api/remover", dados
  );
  return response.data;
}

export async function listarUsers() {
  const response = await axios.get(
    "http://localhost:8080/SuperDia/api/listar"
  );
  return response.data;
}