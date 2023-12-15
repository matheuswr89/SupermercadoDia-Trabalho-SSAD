"use client";
import styles from "./style.module.css";
import stylesPage from "../page.module.css";
import { useLayoutEffect, useState } from "react";
import ProtectedRoute from "../protected";
import { listarCompras } from "@/api/compra";

export default function Compras() {
  const [compras, setCompras] = useState<any>([]);
  const [total, setTotal] = useState(0);

  useLayoutEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const compras = await listarCompras();
    setCompras([...compras]);
    const total = compras.reduce(
      (partialSum: number, item: any) => partialSum + item.valorTotal,
      0
    );
    setTotal(total);
  };

  return (
    <ProtectedRoute>
      <main className={stylesPage.main}>
        <h1>Valor total vendido: R$ {Number(total.toFixed(2)).toLocaleString()}</h1>
        <div className={styles.product_list_container}>
          <h2>Product List</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Quantidade de produtos</th>
                <th>Valor total</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((produto: any) => (
                <tr key={produto.id}>
                  <td>{produto.id}</td>
                  <td>{produto.produtos.length}</td>
                  <td>{produto.valorTotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </ProtectedRoute>
  );
}
