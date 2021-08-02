import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

interface Props {
  action: () => void;
}

export default function AddButton({ action }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => action()}>
      <View style={[styles.stick]}></View>
      <View style={[styles.stick, styles.horizontal]}></View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "relative",
    height: 45,
    width: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: Colors.mainColor,
  },
  stick: {
    position: "absolute",
    width: 20,
    height: 2,
    backgroundColor: Colors.white,
  },
  horizontal: {
    transform: [{ rotate: "90deg" }],
  },
});
