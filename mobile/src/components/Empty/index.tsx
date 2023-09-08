import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";

export default function Empty({ tipo }: any) {
  return (
    <View style={styles.centeredView}>
      {tipo ? (
        <View style={styles.viewIcon}>
          <Icon name="local-shipping" size={70} />
          <Icon name="warning" size={30} style={styles.warningIcon} />
        </View>
      ) : (
        <Icon name="remove-shopping-cart" size={70} />
      )}
      <Text style={styles.message}>
        Nenhum {tipo ? "pedido" : "produto"} por aqui!
      </Text>
    </View>
  );
}
