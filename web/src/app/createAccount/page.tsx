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
    let user = state;
    if (type !== "gerente") {
      user.perfil= "cliente";
    }
    console.log(user)
    createAccount(user, reload, cancel);
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
        <h2>{state.id === 0 ? "Criar" : "Atualizar"} Conta</h2>
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
                <label htmlFor="nome">Nome:</label>
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
                <label htmlFor="senha">Senha:</label>
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
                <label htmlFor="dataNascimento">Data de nascimento:</label>
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
                <label htmlFor="endereco">Endereço:</label>
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
                <label htmlFor="telefone">Telefone:</label>
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
                  <label htmlFor="perfil">Perfil:</label>
                  <select
                    id="perfil"
                    name="perfil"
                    required
                    value={state.perfil}
                    onChange={handleInputChange}
                    defaultValue={state.perfil}
                  >
                    <option value="administrador">Administrador</option>
                    <option value="caixa">Caixa</option>
                    <option value="cliente">Cliente</option>
                  </select>
                </div>
              )}
            </div>
          </div>
          <div className={styles.form_group}>
            <button type="submit">{state.id === 0 ? "Criar" : "Atualizar"} Conta</button>
            <button onClick={cancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </main>
  );
}
