import React, { useEffect, useCallback } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import DataTable from "../components/Receipt/DataTable";
import AddButton from "../components/Receipt/AddButton";

import { Overlay, Page } from "../constants/StyleMixins";

import { getData } from "../store/receiptList/actions";
import { getFetching, getReceiptTable } from "../store/receiptList/getters";

import { Routes } from "../constants/enums";
import { ScreenProps } from "../types/index";

export default function ReceiptsScreen({ navigation }: ScreenProps) {
  const table = useSelector(getReceiptTable);
  const fetching = useSelector(getFetching);
  const dispatch = useDispatch();

  useFocusEffect(useCallback(() => {
    dispatch(getData());
  }, []));

  const addHandler = useCallback(() => {
    navigation.navigate(Routes.create);
  }, []);

  return (
    <ScrollView scrollEnabled style={Page}>
      <View style={styles.heading}>
        <Text style={styles.title}>Мягкие чеки</Text>
        <AddButton key="add" action={addHandler} />
      </View>
      
      {fetching ? <View style={Overlay}><Text>...Загрузка</Text></View> : null}

      <View style={styles.content}>
        {table ? (
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
  modal: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000",
    opacity: 0.5,
    zIndex: 99,
  },
});
