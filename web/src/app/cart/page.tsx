"use client";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Product from "../components/Product";
import CartContext from "../context/CartContext";
import styles from "../page.module.css";

export default function Cart() {
  const { cart, total, quantity } = useContext(CartContext);
  const { push } = useRouter();

  const navigateToCheckout = () => push("/checkout");

  return (
    <main className={styles.main}>
      {cart.length > 0 && (
        <>
          <h1>Subtotal: R$ {Number(total.toFixed(2)).toLocaleString()}</h1>
          <button
            className={styles.buttonCheckout}
            onClick={navigateToCheckout}
          >
            Fechar pedido ({quantity} {quantity === 1 ? "item" : "itens"})
          </button>
        </>
      )}
      <section className={styles.sectionProducts}>
        {cart.map((product) => (
          <Product key={product.id} product={product} isCart={true} />
        ))}
        {cart.length === 0 && <h1>Nenhum produto no carrinho!</h1>}
      </section>
    </main>
  );
}
