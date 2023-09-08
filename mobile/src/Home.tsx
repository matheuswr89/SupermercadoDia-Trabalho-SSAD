import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useContext } from "react";
import IconFont from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CartContext from "./context/CartContext";
import Cart from "./screen/Cart";
import Products from "./screen/Products";
import User from "./screen/User";

const Tab = createMaterialBottomTabNavigator();

export default function Home() {
  const { cart } = useContext(CartContext);
  const quantidade = cart.reduce(
    (partialSum, item) => partialSum + item.quantity,
    0
  );

  return (
    <Tab.Navigator
      barStyle={{
        height: 70,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Products}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Carrinho"
        component={Cart}
        options={{
          tabBarBadge: quantidade,
          tabBarIcon: ({ color }) => (
            <Icon name="cart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({ color }) => (
            <IconFont name="user" color={color} size={26} solid={true} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
