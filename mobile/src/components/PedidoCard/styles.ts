import { StyleSheet } from "react-native";

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
  },
  cardView: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
    minHeight: 100,
  },
  promotionImage: {
    width: "50%",
  },
  descriptionText: {
    flex: 1,
  },
  titleText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
    margin: 5,
  },
  priceText: {
    color: "#e73931",
    fontWeight: "bold",
    fontSize: 16,
    margin: 5,
  },
});
