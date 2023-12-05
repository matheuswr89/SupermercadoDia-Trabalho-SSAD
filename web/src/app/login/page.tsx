"use client";
import styles from "./style.module.css";
import stylesPage from "../page.module.css";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useSearchParams } from 'next/navigation'

export default function Login() {
  const {logar} = useContext(AuthContext);
  const searchParams = useSearchParams()

  const [state, setState] = useState({
    login: "",
    senha: "",
  });

  const submit = async (e: any) => {
    e.preventDefault();
    logar(state, searchParams.get('redirect'));
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
