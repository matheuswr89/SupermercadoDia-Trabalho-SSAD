"use client";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { criarConta, login } from "@/api/user";

export interface AuthContextProps {
  logar: (dados: any, redirect: string | null) => void;
  createAccount: (dados: any, reload: any, cancel: any) => void;
  logout: () => void;
  user: any;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>();
  const { push } = useRouter();

  useEffect(() => {
    const storage = localStorage.getItem("user");
    if (storage !== null) {
      setUser(JSON.parse(storage));
    }
  }, []);

  const logar = async (dados: any, redirect: string | null) => {
    const response = await login(dados);
    if (!response["id"]) {
      toast.error("Erro ao logar, confirme os dados e tente novamente!");
    } else {
      toast.success("Login realizado com sucesso!");
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response));
      push(redirect ? redirect : "/");
    }
  };
  const createAccount = async (dados: any, reload: any, cancel: any) => {
    const response = await criarConta(dados);
    if (!response["senha"]) {
      toast.error("Já tem um usuário com esse CPF ou EMAIL!");
    } else {
      toast.success(
        `Usuário ${dados.id === 0 ? "cadastrado" : "alterado"} com sucesso!`
      );
      if (!reload) push("/");
      else reload();
      cancel();
    }
  };
  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        logar,
        createAccount,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
