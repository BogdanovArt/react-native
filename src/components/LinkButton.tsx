import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { LinkButtonStyle } from "./LinkButtonStyles";

import * as RootNavigator from "../utils/navigator";

import { Routes } from "../constants/enums";


export default function Button({
  screen,
  title,
}: {
  screen: Routes;
  title?: string;
}) {
  return (
    <View>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => RootNavigator.navigate(screen, {})}
      >
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: LinkButtonStyle,
  text: {
    fontWeight: "600",
  }
});
