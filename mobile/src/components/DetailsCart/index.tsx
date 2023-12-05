import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";
import global from "../../global";
import styles from "./styles";

export default function DetailsCart() {
  const { cart } = useContext(CartContext);
  const { isLogged } = useContext(AuthContext);
  const navigation: any = useNavigation();

  const subtotal = cart.reduce(
    (partialSum, item) => partialSum + item.preco * item.quantity,
    0
  );
  const quantidade = cart.reduce(
    (partialSum, item) => partialSum + item.quantity,
    0
  );

  const checkoutCart = () => {
    if (!isLogged) {
      Alert.alert(
        "Você não está logado!",
        "Deseja logar antes de finalizar a compra?",
        [
          {
            text: "Sim",
            onPress: () => {
              navigation.navigate("Login");
            },
          },
          { text: "Não" },
        ]
      );
    } else {
      navigation.navigate("Checkout");
    }
  };

  return (
    cart.length > 0 && (
      <View style={[styles.centeredView, { paddingHorizontal: 10 }]}>
        <Text style={styles.textSubtotal}>
          Subtotal: R$ {Number(subtotal.toFixed(2)).toLocaleString()}
        </Text>
        <TouchableOpacity
          style={[global.loginButtonContainer, { width: "100%" }]}
          onPress={checkoutCart}
        >
          <Text style={styles.textLinkButton}>
            Fechar pedido ({quantidade} {quantidade === 1 ? "item" : "itens"})
          </Text>
        </TouchableOpacity>
      </View>
    )
  );
}
