import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Home";
import Checkout from "../screen/Checkout";
import { CreateAccount } from "../screen/CreateAccount";
import Login from "../screen/Login";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator initialRouteName="Home1">
      <Screen
        name="Home1"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Screen name="Login" component={Login} />
      <Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{
          title: "Criar Conta",
        }}
      />
      <Screen
        name="Checkout"
        component={Checkout}
        options={{
          title: "Dados do cartão de crédito",
        }}
      />
    </Navigator>
  );
}
