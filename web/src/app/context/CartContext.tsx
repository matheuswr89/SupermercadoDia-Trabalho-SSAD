"use client";
import { createContext, useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";

export interface CartContextProps {
  modifyQuantity: (index: number, type: string) => void;
  cart: any[];
  removeCart: (index: number) => void;
  addCart: (product: any) => void;
  removeAll: () => void;
  total: number;
  quantity: number;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

export const CartProvider = ({ children }: any) => {
  const { getCart, saveCart, deleteCart } = useCart();
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    getCart().then((data: any) => {
      setCart(data);
      updateCartQuantity(cart);
      updateCartSubtotal(cart);
    });
  }, []);

  useEffect(() => {
    if (cart.length > 0) saveCart(cart);
    updateCartQuantity(cart);
    updateCartSubtotal(cart);
  }, [cart]);

  const removeCart = (p: any) => {
    const index = cart.findIndex((item) => item.id === p.id);
    cart.splice(index, 1);
    setCart([...cart]);
  };

  const addCart = (product: any) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
      setCart([...cart]);
    } else {
      const newProduct = { ...product, quantity: 1 };
      setCart((prevState) => [...prevState, newProduct]);
    }
  };

  const removeAll = () => {
    deleteCart();
    setCart([]);
  };

  const modifyQuantity = (p: any, type: string) => {
    const index = cart.findIndex((item) => item.id === p.id);
    if (type === "add") p.quantity += 1;
    if (type === "sub") p.quantity -= 1;
    cart[index] = p;
    if (p.quantity === 0) cart.splice(index, 1);
    setCart([...cart]);
  };

  const updateCartQuantity = (cartData: any[]) => {
    const total = cartData.reduce(
      (partialSum, item) => partialSum + item.quantity * item.preco,
      0
    );
    setTotal(total);
  };

  const updateCartSubtotal = (cartData: any[]) => {
    const totalQuantity = cartData.reduce(
      (partialSum, item) => partialSum + item.quantity,
      0
    );
    setQuantity(totalQuantity);
  };

  return (
    <CartContext.Provider
      value={{
        modifyQuantity,
        cart,
        removeCart,
        addCart,
        removeAll,
        total,
        quantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
