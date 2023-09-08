import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../global";

const mailFormatValidator = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const CreateAccount = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignUp = async () => {
    Keyboard.dismiss();
    if (!email.match(mailFormatValidator)) {
      Alert.alert("Por favor, preencha todos os campos corretamente!");
      return;
    }

    if (!username.length) {
      Alert.alert("O nome de usuário é obrigatório!");
      return;
    }

    if (!password.length) {
      Alert.alert("A senha é obrigatória!");
      return;
    }

    setIsLoading(true);
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={styles.viewKeyboard}
      onStartShouldSetResponder={(): any => Keyboard.dismiss()}
    >
      <Text style={styles.title}>Cadastro</Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder={"Nome de usuário"}
        style={[styles.input]}
        autoComplete={"username"}
        secureTextEntry={false}
        onSubmitEditing={Keyboard.dismiss}
        placeholderTextColor="#000"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder={"Email"}
        style={[styles.input]}
        keyboardType={"email-address"}
        autoComplete={"email"}
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
        onPress={handleSignUp}
        style={[styles.loginButtonContainer, { width: "100%" }]}
      >
        {!isLoading && <Text style={styles.loginButton}>Criar cadastro</Text>}
        {isLoading && <ActivityIndicator size="large" />}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
