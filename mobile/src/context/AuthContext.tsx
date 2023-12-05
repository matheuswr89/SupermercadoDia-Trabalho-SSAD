import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { criarConta, login } from "../api/user";
import { Toast } from "toastify-react-native";
export interface AuthContextProps {
  user: any;
  isLogged: boolean;
  signIn(email: string, password: string): Promise<boolean | undefined>;
  signOut(): void;
  signUp(dados: any): Promise<boolean | undefined>;
}
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const { deleteToken, saveUser, deleteUser, getUser } = useAuth();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    logInUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    const response = await login({ login: email, senha: password });

    if (!response["id"]) {
      Toast.error("Erro ao logar, confirme os dados e tente novamente!", "top");
      return;
    }

    Toast.success("Login realizado com sucesso!");
    setUser(response);
    await saveUser(response);

    return true;
  };

  const signOut = async () => {
    await deleteToken();
    await deleteUser();
    setUser(null);
  };

  const signUp = async (dados: any) => {
    const response = await criarConta(dados);
    if (!response["senha"]) {
      Toast.error("Já tem um usuário com esse CPF ou EMAIL!", "top");
      return;
    } 
      Toast.success(
        `Usuário ${dados.id === 0 ? "cadastrado" : "alterado"} com sucesso!`
      );
      saveUser(response);
      setUser(response);
    return true;
  };

  const logInUser = async () => {
    const userData = await getUser();
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged: !!user?.id,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
