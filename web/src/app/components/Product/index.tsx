import CartContext from "@/app/context/CartContext";
import Image from "next/image";
import { useContext } from "react";
import { FaMinus, FaPlus, FaTrashCan } from "react-icons/fa6";
import styles from "../../page.module.css";

export default function Product({ product, isCart }: any) {
  const { addCart, modifyQuantity, removeCart } = useContext(CartContext);
  return (
    <div className={styles.product} key={product.id}>
      <div style={{ position: "relative", width: "90%" }}>
        <Image
          src={product.image}
          alt="Picture of the author"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <div style={{ display: "inline-block" }}>
        <h4>{product.title}</h4>
        <p className={styles.price}>R$ {product.price}</p>
        {!isCart && (
          <button
            className={styles.linkButton}
            onClick={() => addCart(product)}
          >
            Adicionar ao carrinho
          </button>
        )}

        {isCart && (
          <div className={styles.toggleQuantity}>
            <button onClick={() => modifyQuantity(product, "sub")}>
              <FaMinus />
            </button>
            <p>{product.quantity}</p>
            <button onClick={() => modifyQuantity(product, "add")}>
              <FaPlus />
            </button>
            <FaTrashCan
              className={styles.trashIcon}
              onClick={() => removeCart(product)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
