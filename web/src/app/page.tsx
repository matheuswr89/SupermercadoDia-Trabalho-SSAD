"use client";
import { getProductsApi } from "@/api/api";
import { useEffect, useState } from "react";
import Product from "./components/Product";
import styles from "./page.module.css";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const productsData = await getProductsApi();

      setProducts(productsData);
    }
    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.sectionProducts}>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
