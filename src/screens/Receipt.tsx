import React, { useEffect, useCallback } from "react";
import { ScrollView, View, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "../components/Receipt/DataTable";
import AddButton from "../components/Receipt/AddButton";

import { Overlay, Page } from "../constants/StyleMixins";
import Colors from "../constants/Colors";

import { getProducts, getFetching } from "../store/receiptCreate/getters";
import { saveData } from "../store/receiptCreate/actions";

import { Routes } from "../constants/enums";
import { ScreenProps } from "../types/index";
import { TableItem } from "../store/receiptList/types";
import { ProductItem, ProductPayloadItem } from "../store/receiptCreate/types";

import { removePosition, setProducts } from "../store/receiptCreate";
import getSum from "../utils/getSum";

const cellFlexValues: { [key: string]: number } = {
  index: 0.5,
  barcode: 2,
  itemid: 0,
  name: 2,
};

export default function ReceiptScreen({ navigation }: ScreenProps) {
  const table = useSelector(getProducts);
  const fetching = useSelector(getFetching);
  const dispatch = useDispatch();

  const items = table?.items;

  const removeHandler = useCallback((item: TableItem) => {
    dispatch(removePosition(item));
  }, []);

  const resetStore = useCallback(() => {
    dispatch(setProducts(null));
    navigation.navigate(Routes.receipt);
  }, []);

  const addHandler = useCallback(() => {
    navigation.navigate(Routes.modal);
  }, []);

  const itemConverter = useCallback((item: TableItem): ProductPayloadItem => {
    return {
      itemid: item.itemid as string,
      qty: item.quantity as string,
      price: item.price as string,
      total: ((item.price as number) * (item.quantity as number)).toString(),
    };
  }, []);

  const saveHandler = useCallback((items: TableItem[]) => {
    const Payload: ProductPayloadItem[] = items.map(itemConverter);
    dispatch(saveData({ items: Payload, onSuccess: resetStore }));
  }, []);

  const total = useCallback(() => {
    return items ? getSum(items) : 0;
  }, [items]);

  return (
    <ScrollView
      scrollEnabled
      contentContainerStyle={{ flexGrow: 1 }}
      style={[Page, styles.Page]}
    >
      {fetching ? (
        <View style={Overlay}>
          <Text>...Загрузка</Text>
        </View>
      ) : null}
      <View style={styles.heading}>
        <Text style={styles.title}>Мягкий чек</Text>
        <AddButton key="add" action={addHandler} />
      </View>

      <View style={styles.content}>
        {table ? (
          <DataTable
            table={table}
            flexValues={cellFlexValues}
            remove={removeHandler}
          />
        ) : (
          <Text style={styles.hint}>
            Нажмите кнопку "+", чтобы добавить позицию в чек
          </Text>
        )}
      </View>
      {items && items.length ? (
        <View style={styles.total}>
          <Text style={[styles.sumText, styles.sum]}>Итого:</Text>
          <Text style={styles.sum}>{total()}</Text>
        </View>
      ) : null}
      {items && items.length ? (
        <View style={styles.controlsWrapper}>
          <View style={styles.controls}>
            <Button
              title="Сохранить"
              color={Colors.mainColor}
              onPress={() => saveHandler(items)}
            />
            <Button
              title="Отмена"
              color={Colors.error}
              onPress={() => resetStore()}
            />
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Page: {},
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
    paddingTop: 10,
    maxWidth: "100%",
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
  hint: {
    color: Colors.tintColorSecondary,
    paddingHorizontal: 20,
  },
  controlsWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  controls: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  total: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  sum: {
    fontWeight: "bold",
  },
  sumText: {
    paddingRight: 10,
  },
});
