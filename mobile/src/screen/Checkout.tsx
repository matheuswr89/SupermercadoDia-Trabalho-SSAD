import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { useSharedValue } from "react-native-reanimated";
import CreditCard from "../components/CreditCard";
import CartContext from "../context/CartContext";
import global from "../global";
import { validaCartao } from "../api/api";
import { Toast } from "toastify-react-native";

export default function Checkout() {
  const navigation: any = useNavigation();
  const { removeAll } = useContext(CartContext);
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [cvc, setCvc] = useState("");
  const [expire, setExpire] = useState("");
  const [loading, setLoading] = useState(false);
  const spin = useSharedValue<number>(0);

  const cadastrarOrdem = async () => {
    if (!cardNumber.length || !name.length || !cvc.length || !expire.length) {
      Alert.alert("Forneça todos os dados do cartão!");
      return;
    }

    const cartaoValido = await validaCartao(cardNumber);
    setLoading(true);
    if (cartaoValido){
      Toast.success("Compra finalizada com sucesso!");
      removeAll();
      navigation.navigate("Home1");
    } else {
      Toast.error("Cartão inválido!", "top");
    }
    setLoading(false);
  };

  return (
    <View style={global.viewCheckout}>
      <CreditCard
        spin={spin}
        cardNumber={cardNumber}
        name={name}
        cvc={cvc}
        expire={expire}
      />
      <TextInputMask
        value={cardNumber}
        onChangeText={setCardNumber}
        style={global.input}
        keyboardType="numeric"
        onFocus={() => (spin.value = 0)}
        type="credit-card"
        placeholder="XXXX XXXX XXXX XXXX"
      />
      <TextInput
        value={name}
        onChangeText={setName}
        style={global.input}
        keyboardType={"default"}
        autoCapitalize="characters"
        onFocus={() => (spin.value = 0)}
        placeholder="SEU NOME"
      />
      <View style={global.inputCard}>
        <TextInputMask
          value={expire}
          onChangeText={setExpire}
          style={[global.input, { width: "49%" }]}
          keyboardType="decimal-pad"
          onFocus={() => (spin.value = 0)}
          type="datetime"
          options={{
            format: "MM/YY",
          }}
          placeholder="MM/YY"
        />
        <TextInputMask
          value={cvc}
          onChangeText={setCvc}
          style={[global.input, { width: "50%" }]}
          keyboardType={"decimal-pad"}
          onFocus={() => (spin.value = 1)}
          type="only-numbers"
          maxLength={3}
          placeholder="CVC"
        />
      </View>
      <TouchableOpacity
        onPress={cadastrarOrdem}
        style={[global.loginButtonContainer, { width: "100%" }]}
      >
        {!loading && <Text style={global.loginButton}>Finalizar compra</Text>}
        {loading && <ActivityIndicator size="large" />}
      </TouchableOpacity>
    </View>
  );
}
