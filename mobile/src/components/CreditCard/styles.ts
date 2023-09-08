import { StyleSheet } from "react-native";

export default StyleSheet.create({
  chipImage: {
    left: 20,
    width: 70,
    height: 50,
    marginBottom: 15,
    backgroundColor: "#a5932f",
    borderRadius: 15,
  },
  cardText: {
    left: 20,
    fontSize: 20,
    marginBottom: 30,
  },
  viewDados: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 30,
    left: 20,
  },
  lineView: {
    backgroundColor: "#000",
    height: 50,
    marginTop: 20,
  },
  cvcText: {
    left: "80%",
    fontSize: 18,
    marginTop: 20,
    backgroundColor: "#fff",
    width: 50,
    padding: 10,
  },
  front: {
    height: 210,
    width: 350,
    backgroundColor: "#D8D9CF",
    borderRadius: 16,
    position: "absolute",
    justifyContent: "flex-end",
    backfaceVisibility: "hidden",
  },
  back: {
    height: 210,
    width: 350,
    backgroundColor: "#D8D9CF",
    borderRadius: 16,
    backfaceVisibility: "hidden",
  },
});
