"use client";
import styles from "./style.module.css";
import stylesPage from "../page.module.css";
import { useState } from "react";
import { login } from "@/api/login";
import { toast } from 'react-toastify';

export default function Login() {
  const [state, setState] = useState({
    login: "",
    senha: "",
  });

  const submit = async (e: any) => {
    e.preventDefault();
    const response = await login(state);
    if (!response["id"]){
      toast.error("Erro ao logar, confirme os dados e tente novamente!")
    }
  };
  
  const handleInputChange = (evt: any) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className={stylesPage.main}>
      <div className={styles.login_container}>
        <h2>Login</h2>
        <form id="login-form" onSubmit={submit}>
          <div className={styles.form_group}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="login"
              required
              value={state.login}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.form_group}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="senha"
              required
              value={state.senha}
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.form_group}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </main>
  );
}
