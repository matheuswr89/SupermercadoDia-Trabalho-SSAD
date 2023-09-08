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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "94%",
    minHeight: 200,
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
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkButton: {
    backgroundColor: "#2196F3",
    borderRadius: 15,
    padding: 10,
  },
  textLinkButton: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  buttonQuantity: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#C4C4C4",
    borderColor: "#000",
    borderWidth: 1,
  },
  textButtonQuantity: {
    fontSize: 20,
  },
  textQuantity: {
    fontSize: 20,
    padding: 5,
  },
});
