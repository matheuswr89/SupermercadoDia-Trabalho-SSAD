"use client";
import styles from "./style.module.css";
import stylesPage from "../page.module.css";
import InputMask from "react-input-mask";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

export default function CreateAccount({
  type,
  userGerente,
  reload,
}: {
  type: "" | "gerente";
  userGerente: any;
  reload: any;
}) {
  const { createAccount } = useContext(AuthContext);
  const [state, setState] = useState({
    id: 0,
    perfil: "administrador",
    senha: "",
    pessoa: {
      dataNascimento: "",
      email: "",
      endereco: "",
      id: 0,
      nome: "",
      telefone: "",
      cpf: "",
    },
  });

  useEffect(() => {
    if (userGerente) setState(userGerente);
  }, [userGerente]);

  const handleInputChange = (evt: any) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    setState((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleInputPessoa = (evt: any) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    setState((prev: any) => ({
      ...prev,
      pessoa: { ...prev.pessoa, [name]: value },
    }));
  };

  const submit = async (e: any) => {
    e.preventDefault();
    if (state.perfil.length === 0 && type !== "gerente") {
      setState((prev: any) => ({ ...prev, perfil: "cliente" }));
    }
    createAccount(state, reload, cancel);
  };

  const cancel = () => {
    setState({
      id: 0,
      perfil: "administrador",
      senha: "",
      pessoa: {
        dataNascimento: "",
        email: "",
        endereco: "",
        id: 0,
        nome: "",
        telefone: "",
        cpf: "",
      },
    });
  };

  return (
    <main className={stylesPage.main}>
      <div className={styles.signup_container}>
        <h2>{state.id === 0 ? "Create" : "Update"} Account</h2>
        <form id="signup-form" onSubmit={submit}>
          <div className={styles.flex_div}>
            <div>
              <div className={styles.form_group}>
                <label htmlFor="cpf">CPF:</label>
                <InputMask
                  mask="999.999.999-99"
                  maskChar="_"
                  name="cpf"
                  placeholder="XXX.XXX.XXX-XX"
                  value={state.pessoa.cpf}
                  onChange={handleInputPessoa}
                  className={styles.input}
                  id="cpf"
                  required
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="nome">Name:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  value={state.pessoa.nome}
                  onChange={handleInputPessoa}
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={state.pessoa.email}
                  onChange={handleInputPessoa}
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
            </div>
            <div>
              <div className={styles.form_group}>
                <label htmlFor="dataNascimento">Date of Birth:</label>
                <input
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  required
                  value={state.pessoa.dataNascimento}
                  onChange={handleInputPessoa}
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="endereco">Address:</label>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  required
                  value={state.pessoa.endereco}
                  onChange={handleInputPessoa}
                />
              </div>

              <div className={styles.form_group}>
                <label htmlFor="telefone">Phone:</label>
                <InputMask
                  mask="(99) 99999-9999"
                  maskChar="_"
                  name="telefone"
                  placeholder="(XX) XXXXX-XXXX"
                  value={state.pessoa.telefone}
                  onChange={handleInputPessoa}
                  className={styles.input}
                  id="telefone"
                  required
                />
              </div>

              {type === "gerente" && (
                <div className={styles.form_group}>
                  <label htmlFor="perfil">Profile:</label>
                  <select
                    id="perfil"
                    name="perfil"
                    required
                    value={state.perfil}
                    onChange={handleInputChange}
                    defaultValue={state.perfil}
                  >
                    <option value="administrador">Administrator</option>
                    <option value="caixa">Cashier</option>
                    <option value="cliente">Customer</option>
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className={styles.form_group}>
            <button type="submit">Create Account</button>
            <button onClick={cancel}>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
}
