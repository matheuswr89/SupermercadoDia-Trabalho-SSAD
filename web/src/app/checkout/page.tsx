"use client";
import { useContext, useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import InputMask from "react-input-mask";
import CartContext from "../context/CartContext";
import styles from "../page.module.css";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { validaCartao } from "@/api/api";
import { cadastrarCompra } from "@/api/compra";

export default function PaymentForm() {
  const { removeAll, cart, total } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { push } = useRouter();

  useEffect(() => {
    if (!user) {
      push("/");
      toast.error("Você não está logado!");
    }
  }, [user]);

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

  const finalizeCheckout = async (e: any) => {
    e.preventDefault();
    const cartaoValido = await validaCartao(state.number)
    if (cartaoValido){
      removeAll();
      push("/");
      cadastrarCompra({produtos:[...cart], usuario: user, valorTotal: total})
      toast.success("Compra finalizada com sucesso!")
    } else {
      toast.error("Cartão inválido!")
    }
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
      <form className={styles.cardCredit} onSubmit={finalizeCheckout}>
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
      <button className={styles.buttonCheckout} type="submit">
        Finalizar compra
      </button>
      </form>
    </div>
  );
}
