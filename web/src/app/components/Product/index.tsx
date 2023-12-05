import CartContext from "@/app/context/CartContext";
import { useContext } from "react";
import { FaMinus, FaPlus, FaTrashCan } from "react-icons/fa6";
import styles from "../../page.module.css";

export default function Product({ product, isCart }: any) {
  const { addCart, modifyQuantity, removeCart } = useContext(CartContext);
  return (
    <div className={styles.product} key={product.id}>
      <div>
        <h4>{product.nome}</h4>
        <p className={styles.price}>R$ {product.preco}</p>
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
