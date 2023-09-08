import { useContext } from "react";
import { FlatList, View } from "react-native";
import DetailsCart from "../components/DetailsCart";
import Empty from "../components/Empty";
import ProductCard from "../components/ProductCard";
import CartContext from "../context/CartContext";
import global from "../global";

export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <View style={global.safeArea}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "#fff" }}
        data={cart}
        renderItem={({ item, index }) => (
          <ProductCard data={item} index={index} screen={"cart"} />
        )}
        keyExtractor={(item, index) => item.id + index}
        ListEmptyComponent={Empty}
        ListHeaderComponent={DetailsCart}
        stickyHeaderIndices={[0]}
        initialNumToRender={200}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
