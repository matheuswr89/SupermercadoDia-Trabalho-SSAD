import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { getProductsApi } from "../api/api";
import Empty from "../components/Empty";
import ProductCard from "../components/ProductCard";
import global from "../global";
import { listarProduto } from "../api/produtos";
import Constants from "expo-constants";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response: any[] = await listarProduto();
    setProducts(response);
  };

  return (
    <FlashList
      contentContainerStyle={{    paddingTop: Constants.statusBarHeight + 10,}}
      data={products}
      renderItem={({ item }) => <ProductCard data={item} />}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={Empty}
      estimatedItemSize={200}
      progressViewOffset={10}
      showsVerticalScrollIndicator={false}
    />
  );
}
