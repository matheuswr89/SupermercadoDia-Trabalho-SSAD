import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { getProductsApi } from "../api/api";
import Empty from "../components/Empty";
import ProductCard from "../components/ProductCard";
import global from "../global";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response: any[] = await getProductsApi();
    setProducts(response);
  };

  return (
    <FlashList
      contentContainerStyle={global.safeArea}
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
