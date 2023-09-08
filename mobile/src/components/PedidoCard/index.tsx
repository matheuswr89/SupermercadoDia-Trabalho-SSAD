import { Text, View } from "react-native";
import styles from "./styles";

export default function PedidoCard({ data }: any) {
  return (
    <View style={styles.centeredView}>
      <View style={styles.cardView}>
        <View style={styles.descriptionText}>
          <Text style={styles.titleText}>{data.title}</Text>
          <Text style={styles.priceText}>R$ {data.price}</Text>
        </View>
      </View>
    </View>
  );
}
