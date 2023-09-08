import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import ProductCard from "../components/ProductCard";
import UserDetails from "../components/UserDetails";
import AuthContext from "../context/AuthContext";
import styles from "../global";

export default function User() {
  const { user, isLogged } = useContext(AuthContext);
  const navigation: any = useNavigation();

  return (
    <View style={[styles.safeArea, styles.center]}>
      {!isLogged && (
        <View style={styles.center}>
          <Text style={styles.title}>Você não está logado!</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.signUp, { fontSize: 18 }]}>
              Clique aqui para logar
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18 }}>ou</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text style={[styles.signUp, { fontSize: 18 }]}>
              Clique aqui para fazer um novo cadastro
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {isLogged && (
        <FlatList
          data={user.pedidos || []}
          renderItem={({ item }) => <ProductCard data={item} />}
          ListHeaderComponent={UserDetails}
        />
      )}
    </View>
  );
}
