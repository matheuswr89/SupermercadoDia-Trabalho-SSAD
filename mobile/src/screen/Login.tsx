import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AuthContext from "../context/AuthContext";
import styles from "../global";

const mailFormatValidator = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const navigation: any = useNavigation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignIn = () => {
    Keyboard.dismiss();
    setIsLoading(true);

    if (!email.match(mailFormatValidator)) {
      Alert.alert("Por favor, preencha todos os campos corretamente!");
      setIsLoading(false);
      return;
    }

    signIn(email, password).then((value) => {
      if (!value) {
        Alert.alert("Dados de login incorretos!");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigation.goBack();
    });
  };

  const handleSignUp = async () => {
    navigation.navigate("CreateAccount");
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.viewKeyboard}
      onStartShouldSetResponder={(): any => Keyboard.dismiss()}
    >
      <Text style={styles.title}>Login</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder={"Email"}
        style={[styles.input]}
        keyboardType={"email-address"}
        autoComplete={"email"}
        autoCapitalize="none"
        secureTextEntry={false}
        onSubmitEditing={Keyboard.dismiss}
        placeholderTextColor="#000"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={"Senha"}
          autoCapitalize="none"
          style={[styles.input]}
          secureTextEntry={!showPassword}
          onSubmitEditing={Keyboard.dismiss}
          placeholderTextColor="#000"
        />
        <IconMaterialCommunityIcons
          name={showPassword ? "eye-off" : "eye"}
          size={20}
          onPress={() => setShowPassword(!showPassword)}
          style={styles.passwordIcon}
        />
      </View>

      <TouchableOpacity
        onPress={handleSignIn}
        style={[styles.loginButtonContainer, { width: "100%" }]}
      >
        {!isLoading && <Text style={styles.loginButton}>Login</Text>}
        {isLoading && <ActivityIndicator size="large" />}
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={handleSignUp}>
        <Text style={styles.signUp}>
          Novo no Supermecado Dias? Crie sua conta aqui.
        </Text>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
