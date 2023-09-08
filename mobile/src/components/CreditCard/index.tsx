import React from "react";
import { Image, Text, View } from "react-native";

import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import chipImage from "../../../assets/chip.png";
import styles from "./styles";

export default function CreditCard({
  spin,
  cardNumber,
  name,
  cvc,
  expire,
}: any) {
  const rStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  const bStyle = useAnimatedStyle(() => {
    const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
        },
      ],
    };
  }, []);

  return (
    <View>
      <View>
        <Animated.View style={[styles.front, rStyle]}>
          <Image source={chipImage} style={styles.chipImage} />
          <Text style={styles.cardText}>
            {cardNumber || "XXXX XXXX XXXX XXXX"}
          </Text>
          <View style={styles.viewDados}>
            <Text>{name || "SEU NOME"}</Text>
            <Text>{expire || "MM/YY"}</Text>
          </View>
        </Animated.View>
        <Animated.View style={[styles.back, bStyle]}>
          <View style={styles.lineView} />
          <Text style={styles.cvcText}>{cvc || "CVC"}</Text>
        </Animated.View>
      </View>
    </View>
  );
}
