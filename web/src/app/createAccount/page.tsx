"use client";
import styles from "./style.module.css";
import stylesPage from "../page.module.css";
import InputMask from "react-input-mask";
import { useState } from "react";
import { criarConta } from "@/api/criarConta";
import { toast } from 'react-toastify';

export default function CreateAccount() {
  const [state, setState] = useState({
    cpf: "",
    nome: "",
    login: "",
    senha: "",
    dataNascimento: "",
    endereco: "",
    telefone: "",
    perfil: "cliente"
  });

  const handleInputChange = (evt: any) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e: any) => {
    e.preventDefault()
    const response = await criarConta(state);
    if (!response['login']){
      toast.error("Já tem um usuário com esse CPF ou EMAIL!")
    } else {
      toast.success("Usuário cadastrado com sucesso!")
    }
  }

  return (
    <main className={stylesPage.main}>
      <div className={styles.signup_container}>
        <h2>Create Account</h2>
        <form id="signup-form" onSubmit={submit}>
          <div className={styles.form_group}>
            <label htmlFor="cpf">CPF:</label>
            <InputMask
              mask="999.999.999-99"
              maskChar="_"
              name="cpf"
              placeholder="XXX.XXX.XXX-XX"
              value={state.cpf}
              onChange={handleInputChange}
              className={styles.input}
              id="cpf"
            />
          </div>

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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="login"
              required
              value={state.login}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="senha">Password:</label>
            <input
              type="password"
              id="senha"
              name="senha"
              required
              value={state.senha}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="dataNascimento">Date of Birth:</label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              required
              value={state.dataNascimento}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="endereco">Address:</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              required
              value={state.endereco}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="telefone">Phone:</label>
            <InputMask
              mask="(99) 99999-9999"
              maskChar="_"
              name="telefone"
              placeholder="(XX) XXXXX-XXXX"
              value={state.telefone}
              onChange={handleInputChange}
              className={styles.input}
              id="telefone"
            />
          </div>

          <div className={styles.form_group}>
            <button type="submit">Create Account</button>
          </div>
        </form>
      </div>
    </main>
  );
}
