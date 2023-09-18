const CART_KEY = "@superdia:CART";

export const useCart = () => {
  const saveCart = async (cart: any[]) => {
    await localStorage.setItem(CART_KEY, JSON.stringify(cart));
  };

  const deleteCart = async () => {
    await localStorage.removeItem(CART_KEY);
  };

  const getCart = async (): Promise<any> => {
    const data = await localStorage.getItem(CART_KEY);

    return JSON.parse(data ?? "[]");
  };

  return {
    getCart,
    saveCart,
    deleteCart,
  };
};
