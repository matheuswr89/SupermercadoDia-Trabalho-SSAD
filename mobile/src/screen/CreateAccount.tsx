import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../global";
import { TextInputMask } from "react-native-masked-text";
import DateTimePicker from "@react-native-community/datetimepicker";
import AuthContext from "../context/AuthContext";
import Constants from "expo-constants";

export const CreateAccount = () => {
  const {signUp} = useContext(AuthContext);
  const navigation: any = useNavigation();
  const [show, setShow] = useState(false);
  const [date, setDate] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, setState] = useState({
    id: 0,
    perfil: "cliente",
    senha: "",
    pessoa: {
      dataNascimento: "",
      email: "",
      endereco: "",
      id: 0,
      nome: "",
      telefone: "",
      cpf: "",
    },
  });

  const handleSignUp = async () => {
    Keyboard.dismiss();
    
    if(!state.pessoa.cpf || !state.pessoa.nome || !state.pessoa.email || !state.pessoa.endereco || !state.pessoa.telefone || !state.pessoa.dataNascimento || !state.senha){
      Alert.alert("Preencha todos os dados corretamente!");
      return;
    }
    setIsLoading(true)
    signUp(state).then((value)=>{
      if (!value) {
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigation.goBack();
    });
  };
  const handleInputChange = (name: string, value: string) => {
    setState((prev: any) => ({ ...prev, [name]: value.trim() }));
  };
  const handleInputPessoa = (name: string, value: any) => {
    setState((prev: any) => ({
      ...prev,
      pessoa: { ...prev.pessoa, [name]: value},
    }));
  };
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setShow(false);
    handleInputPessoa("dataNascimento", formatDate(currentDate));
  };

  function formatDate(date: Date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  }

  function formatReverseDate(date: string) {
    return date.split("-").reverse().join("/");
  }

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }

  const showDatePicker = () => {
    setShow(true)
    setDate(new Date());
  }

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={[styles.viewKeyboard, {marginTop: 0}]}
      onStartShouldSetResponder={(): any => Keyboard.dismiss()}
    >
      <ScrollView>
      <Text style={[styles.title, {marginTop: 10}]}>Crie a sua conta aqui!</Text>
      <TextInputMask
        value={state.pessoa.cpf}
        onChangeText={(text) => handleInputPessoa("cpf", text)}
        style={styles.input}
        keyboardType="numeric"
        type="cpf"
        placeholder="XXX.XXX.XXX-XX"
        onSubmitEditing={Keyboard.dismiss}
        placeholderTextColor="#000"
      />
      <TextInput
        value={state.pessoa.nome}
        onChangeText={(text) => handleInputPessoa("nome", text)}
        placeholder={"Nome"}
        style={[styles.input]}
        autoComplete={"username"}
        onSubmitEditing={Keyboard.dismiss}
        placeholderTextColor="#000"
      />
      <TextInput
        value={state.pessoa.email}
        onChangeText={(text) => handleInputPessoa("email", text)}
        placeholder={"Email"}
        style={[styles.input]}
        keyboardType={"email-address"}
        autoComplete={"email"}
        autoCapitalize="none"
        onSubmitEditing={Keyboard.dismiss}
        placeholderTextColor="#000"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          value={state.senha}
          onChangeText={(text) => handleInputChange("senha", text)}
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
      <TouchableOpacity onPress={showDatePicker} style={[styles.input]}>
        <Text style={styles.date}>
          {date ? formatReverseDate(state.pessoa.dataNascimento) : "Data de nascimento"}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <TextInput
        value={state.pessoa.endereco}
        onChangeText={(text) => handleInputPessoa("endereco", text)}
        placeholder={"Endereço"}
        style={[styles.input]}
        onSubmitEditing={Keyboard.dismiss}
        placeholderTextColor="#000"
      />

      <TextInputMask
        value={state.pessoa.telefone}
        onChangeText={(text) => handleInputPessoa("telefone", text)}
        style={styles.input}
        keyboardType="numeric"
        type="cel-phone"
        placeholder="(XX) XXXXX-XXXX"
        onSubmitEditing={Keyboard.dismiss}
        placeholderTextColor="#000"
      />

      <TouchableOpacity
        onPress={handleSignUp}
        style={[styles.loginButtonContainer, { width: "100%" }]}
      >
        {!isLoading && <Text style={styles.loginButton}>Criar cadastro</Text>}
        {isLoading && <ActivityIndicator size="large" />}
      </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
