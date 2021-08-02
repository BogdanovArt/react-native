import React, { useEffect, useCallback } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import DataTable from "../components/Receipt/DataTable";

import { Page } from "../constants/StyleMixins";

import { getRatingTable, getRatingTitle } from "../store/ratings/getters";
import { getData } from "../store/ratings/actions";

export default function RatingScreen() {
  const table = useSelector(getRatingTable);
  const title = useSelector(getRatingTitle);
  const dispatch = useDispatch();

  useFocusEffect(useCallback(() => {
    dispatch(getData());
  }, []));

  return (
    <ScrollView scrollEnabled style={Page}>
      <View style={styles.heading}>
        <Text style={styles.title}>{title || "Рейтинг по ТК"}</Text>
      </View>

      <View style={styles.content}>
        {!title ? (
          <Text>Загрузка...</Text>
        ) : table ? (
          <DataTable table={table} readonly />
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
});
