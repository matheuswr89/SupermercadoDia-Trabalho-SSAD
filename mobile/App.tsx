import { NavigationContainer } from "@react-navigation/native";
import "react-native-get-random-values";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import { AppRoutes } from "./src/routes";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
