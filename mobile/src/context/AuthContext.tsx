import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
export interface AuthContextProps {
  user: any;
  isLogged: boolean;
  signIn(email: string, password: string): Promise<boolean>;
  signOut(): void;
  signUp(username: string, email: string, password: string): Promise<void>;
}
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const { deleteToken, saveUser, deleteUser, getUser } = useAuth();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    logInUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    const userData = {
      username: "Matheus",
      email: "email@email.com",
      password: "123456",
    };

    if (email !== userData.email && password !== userData.password)
      return false;

    await saveUser(userData);
    setUser(userData);
    return true;
  };

  const signOut = async () => {
    await deleteToken();
    await deleteUser();
    setUser(null);
  };

  const signUp = async (username: string, email: string, password: string) => {
    const userData = { username, email, password };
    saveUser(userData);
    setUser(userData);
  };

  const logInUser = async () => {
    const userData = await getUser();
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged: !!user?.email,
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
