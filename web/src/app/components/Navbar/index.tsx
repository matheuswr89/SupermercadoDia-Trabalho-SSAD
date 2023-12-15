import CartContext from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import styles from "../../page.module.css";
import AuthContext from "@/app/context/AuthContext";

export default function Navbar() {
  const { quantity } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const { push } = useRouter();

  const navigateToHome = () => push("/");
  const navigateToCart = () => push("/cart");
  const navigateToLogin = () => push("/login");
  const navigateToCreateAccount = () => push("/createAccount");
  const navigateToProdutos = () => push("/produto");
  const navigateToUsers = () => push("/gerente");
  const navigateToCompras = () => push("/compras");

  return (
    <nav className={styles.navbar}>
      <h1 style={{ cursor: "pointer" }} onClick={navigateToHome}>
        Supermercado Dias
      </h1>
      <div>
        {!user && (
          <>
            <a onClick={navigateToLogin}>Login</a>
            <a onClick={navigateToCreateAccount}>Criar conta</a>
          </>
        )}

        {user && user["perfil"] === "administrador" && (
          <>
            <a onClick={navigateToProdutos}>Produtos</a>
            <a onClick={navigateToCompras}>Compras</a>
            <a onClick={navigateToUsers}>Usuários</a>
          </>
        )}
        <a onClick={navigateToCart}>Carrinho ({quantity})</a>
        {user && <a onClick={logout}>Sair</a>}
      </div>
    </nav>
  );
}
