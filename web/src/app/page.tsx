"use client";
import { validaCartao } from "@/api/api";
import { useEffect, useState, useContext } from "react";
import Product from "./components/Product";
import styles from "./page.module.css";
import AuthContext from "./context/AuthContext";
import { listarProduto } from "@/api/produtos";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    async function fetchData() {
      const productsData = await listarProduto();
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
        {products.length === 0 && (
          <h1>Sem produtos por aqui!</h1>
        )}
      </section>
    </main>
  );
}
