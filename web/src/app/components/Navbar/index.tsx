import CartContext from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import styles from "../../page.module.css";

export default function Navbar() {
  const { quantity } = useContext(CartContext);
  const { push } = useRouter();

  const navigateToHome = () => push("/");
  const navigateToCart = () => push("/cart");

  return (
    <nav className={styles.navbar}>
      <h1 style={{ cursor: "default" }} onClick={navigateToHome}>
        Supermercado Dias
      </h1>
      <div>
        <a onClick={navigateToCart}>Carrinho ({quantity})</a>
        <a>Conta</a>
      </div>
    </nav>
  );
}
