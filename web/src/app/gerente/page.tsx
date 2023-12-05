"use client";
import { useLayoutEffect, useState } from "react";
import CreateAccount from "../createAccount/page";
import stylesPage from "../page.module.css";
import styles from "./style.module.css";
import { toast } from "react-toastify";
import { listarUsers, removerUser } from "@/api/user";
import ProtectedRoute from "../protected";

export default function Gerente() {
  const [users, setUsers] = useState<any>([]);
  const [user, setUser] = useState();

  useLayoutEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const produtos = await listarUsers();
    setUsers([...produtos]);
  };

  const editUser = (produto: any) => {
    setUser(produto);
  };

  const removeUser = async (produto: any) => {
    const response = await removerUser(produto);
    if (!response["nome"]) {
      toast.error("Erro ao remover o usuário!");
    } else {
      toast.success("Usuário removido com sucesso!");
    }
    getUsers();
  };

  return (
    <ProtectedRoute>
      <main className={stylesPage.main}>
        <CreateAccount type="gerente" userGerente={user} reload={getUsers} />
        <div className={styles.product_list_container}>
          <h2>User List</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.pessoa.nome}</td>
                  <td>{user.pessoa.email}</td>
                  <td className={styles.action_buttons}>
                    <button
                      className={styles.edit_btn}
                      onClick={() => editUser(user)}
                    >
                      Editar
                    </button>
                    <button
                      className={styles.remove_btn}
                      onClick={() => removeUser(user)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </ProtectedRoute>
  );
}
