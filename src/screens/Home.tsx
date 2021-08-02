import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

import Link from "../components/LinkButton";

import { Routes } from "../constants/enums";
import { Page } from "../constants/StyleMixins";

export default function HomeScreen() {
  return (
    <View style={[Page, { paddingHorizontal: 20 }]}>
      <Text style={styles.title}>Главное меню</Text>
      <View style={styles.content}>
        <Link title="Создание МЧ" screen={Routes.receipt} />
        <Link title="Рейтинг по ТК" screen={Routes.ratings} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 60,
  },
});
