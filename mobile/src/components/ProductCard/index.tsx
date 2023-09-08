import { useContext, useEffect, useState } from "react";
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CartContext from "../../context/CartContext";
import styles from "./styles";

function ProductCard({ data, index, screen }: any) {
  const { addCart, modifyQuantity, removeCart, setRefresh } =
    useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    setQuantity(data.quantity);
  }, [data]);

  const addToCard = () => {
    addCart(data);
    setRefresh(true);
  };

  const toggleQuantity = (newQuantity: number) => {
    setQuantity(newQuantity);

    if (newQuantity < 1) removeCart(index);
    else modifyQuantity(index, newQuantity);

    setRefresh(true);
  };

  const removeFromCart = () => {
    removeCart(index);
    setRefresh(true);
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.cardView}>
        <Image
          style={styles.promotionImage}
          source={{ uri: data.image }}
          resizeMode="contain"
        />
        <View style={styles.descriptionText}>
          <Text style={styles.titleText}>{data.title}</Text>
          <Text style={styles.priceText}>R$ {data.price}</Text>
          <View style={styles.buttonView}>
            {!screen && (
              <TouchableHighlight style={styles.linkButton} onPress={addToCard}>
                <Text style={styles.textLinkButton}>Adicionar ao carrinho</Text>
              </TouchableHighlight>
            )}
            {screen && (
              <View style={styles.buttonView}>
                <View style={styles.buttonView}>
                  <TouchableOpacity
                    style={styles.buttonQuantity}
                    onPress={() => {
                      toggleQuantity(quantity - 1);
                    }}
                  >
                    <Icon name="minus" size={20} />
                  </TouchableOpacity>
                  <Text style={styles.textQuantity}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.buttonQuantity}
                    onPress={() => {
                      toggleQuantity(quantity + 1);
                    }}
                  >
                    <Icon name="plus" size={20} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={removeFromCart}>
                  <Icon name="trash-can" size={30} color={"red"} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

export default ProductCard;
