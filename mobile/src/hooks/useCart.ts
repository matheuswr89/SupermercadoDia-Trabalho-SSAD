import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "@superdia:CART";

export const useCart = () => {
  const saveCart = async (cart: any[]) => {
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  };

  const deleteCart = async () => {
    await AsyncStorage.removeItem(CART_KEY);
  };

  const getCart = async (): Promise<any> => {
    const data = await AsyncStorage.getItem(CART_KEY);

    return JSON.parse(data ?? "[]");
  };

  return {
    getCart,
    saveCart,
    deleteCart,
  };
};
