import Constants from "expo-constants";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    paddingTop: Constants.statusBarHeight + 10,
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  viewKeyboard: {
    marginTop: -25,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    fontSize: 18,
    marginVertical: 8,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordIcon: {
    padding: 8,
    position: "absolute",
    right: 1,
    backgroundColor: "#fff",
    borderLeftWidth: 1,
  },
  loginButtonContainer: {
    borderRadius: 5,
    paddingVertical: 8,
    backgroundColor: "#2196F3",
    marginVertical: 16,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  signUp: {
    marginVertical: 10,
    fontSize: 15,
    color: "rgb(88, 166, 255)",
  },
  inputCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  viewCheckout: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    height: "100%",
  },
});
