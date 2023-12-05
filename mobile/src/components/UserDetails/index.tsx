import { FlashList } from "@shopify/flash-list";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AuthContext from "../../context/AuthContext";
import global from "../../global";
import Empty from "../Empty";
import PedidoCard from "../PedidoCard";
import styles from "./styles";

export default function UserDetails() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <View style={global.center}>
      <Text style={styles.dadosText}>{user.pessoa.nome}</Text>
      <Text style={styles.dadosText}>{user.pessoa.email}</Text>
      <TouchableOpacity onPress={signOut}>
        <Text style={styles.sairLink}>Sair</Text>
      </TouchableOpacity>
      <FlashList
        contentContainerStyle={styles.containerList}
        data={[]}
        renderItem={({ item }) => <PedidoCard data={item} />}
        //keyExtractor={(item) => item?.id}
        ListEmptyComponent={<Empty tipo="pedido" />}
        estimatedItemSize={200}
        progressViewOffset={10}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
