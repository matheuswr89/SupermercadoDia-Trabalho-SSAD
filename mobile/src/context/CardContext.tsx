import { createContext, useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";

export interface CartContextProps {
  modifyQuantity: (index: number, quantity: number) => void;
  cart: any[];
  removeCart: (index: number) => void;
  addCart: (product: any) => void;
  setRefresh: (refresh: boolean) => void;
  removeAll: () => void;
}

const CartContext = createContext<CartContextProps>({} as CartContextProps);

export const CartProvider = ({ children }: any) => {
  const { getCart, saveCart, deleteCart } = useCart();
  const [cart, setCart] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    getCart().then((data: any) => setCart(data));
  }, []);

  useEffect(() => {
    const refreshMetadata = async () => {
      if (cart.length > 0) await saveCart(cart);
      const data = await getCart();
      setCart(data);
      setRefresh(false);
    };
    refreshMetadata();
  }, [refresh]);

  const removeCart = async (index: number) => {
    cart.splice(index, 1);
    setCart([...cart]);
    await saveCart(cart);
  };

  const addCart = async (product: any) => {
    const hasInCart = cart.findIndex((item) => item.id === product.id);
    if (hasInCart >= 0) cart[hasInCart].quantity += 1;
    else {
      product.quantity = 1;
      setCart((prevState) => [...prevState, product]);
    }
  };

  const removeAll = () => {
    deleteCart();
    setCart([]);
    setRefresh(true);
  };

  const modifyQuantity = async (index: number, quantity: number) => {
    cart[index].quantity = quantity;
  };

  return (
    <CartContext.Provider
      value={{
        modifyQuantity,
        cart,
        removeCart,
        addCart,
        setRefresh,
        removeAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
