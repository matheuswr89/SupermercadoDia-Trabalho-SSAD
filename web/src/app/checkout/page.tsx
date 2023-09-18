"use client";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import InputMask from "react-input-mask";
import CartContext from "../context/CartContext";
import styles from "../page.module.css";

export default function PaymentForm() {
  const { removeAll } = useContext(CartContext);
  const { push } = useRouter();

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "" || undefined,
  });

  const handleInputChange = (evt: any) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: any) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const finalizeCheckout = () => {
    removeAll();
    push("/");
  };

  return (
    <div className={styles.cardCredit}>
      <h2>Dados do cartão de crédito</h2>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
        acceptedCards={["visa", "mastercard"]}
      />
      <form className={styles.cardCredit}>
        <InputMask
          mask="9999 9999 9999 9999"
          maskChar=" "
          name="number"
          placeholder="XXXX XXXX XXXX XXXX"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className={styles.input}
        />
        <input
          type="text"
          name="name"
          placeholder="SEU NOME"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          autoCapitalize="capitalize"
          className={styles.input}
        />
        <div className={styles.divInputs}>
          <InputMask
            mask="99/99"
            maskChar=" "
            name="expiry"
            placeholder="MM/YY"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className={styles.minorInputs}
          />
          <InputMask
            mask="999"
            maskChar=" "
            name="cvc"
            placeholder="CVC"
            inputMode="numeric"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className={styles.minorInputs}
          />
        </div>
      </form>
      <button className={styles.buttonCheckout} onClick={finalizeCheckout}>
        Finalizar compra
      </button>
    </div>
  );
}
