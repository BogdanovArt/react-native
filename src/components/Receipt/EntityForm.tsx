import React, { useCallback, useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

import Colors from "../../constants/Colors";
import { Input } from "../../constants/StyleMixins";

import { TableItem } from "../../store/receiptList/types";
import ALERT from "../../utils/alert";

interface Props {
  item: TableItem;
  returnValue?: (item: TableItem) => void;
}

let timer: NodeJS.Timer;

export default function EntityForm({ item, returnValue = () => null }: Props) {
  const [quantity, setQuantity] = useState("0");

  const valueIsSet = (value: string) => !!parseFloat(value);

  const checkForErrors = (value: string) => {
    const max = item.remainder || 0;
    const number = parseFloat(value);
    if (!number) {
      return "Укажите количество";
    }
    if (number > max) {
      setQuantity(max.toString());
      return "Введенное значение больше остатка";
    }
    return "";
  };

  const inputHandler = (value: string) => {
    const reg = /^\d*\.?\d*$/;
    const match = reg.test(value);

    if (match || !value) {
      setQuantity(value);
    }

    clearTimeout(timer);
    timer = setTimeout(() => checkForErrors(value), 500);
  };

  const save = () => {
    const error = checkForErrors(quantity);
    if (!error) {
      const payload: TableItem = {
        ...item,
        quantity: parseFloat(quantity),
      };
      returnValue(payload);
    } else {
      ALERT({ message: error as string });
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Наименование</Text>
      <TextInput
        value={item.name?.toString()}
        multiline={true}
        editable={false}
        selectTextOnFocus={false}
        style={styles.input}
      />

      <Text style={styles.label}>Цена</Text>
      <TextInput
        value={item.price?.toString()}
        editable={false}
        selectTextOnFocus={false}
        style={styles.input}
      />

      <Text style={styles.label}>Остаток</Text>
      <TextInput
        value={item.remainder?.toString()}
        editable={false}
        selectTextOnFocus={false}
        style={styles.input}
      />

      <Text style={styles.label}>Количество</Text>
      <TextInput
        value={quantity}
        onChangeText={(val) => inputHandler(val)}
        selectTextOnFocus
        keyboardType={"number-pad"}
        placeholder={"Введите количество"}
        style={styles.input}
      />
      {!valueIsSet && (
        <Text style={styles.hint}>Укажите количество позиций</Text>
      )}
      <Button
        title="Добавить"
        color={Colors.mainColor}
        onPress={() => save()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: Input,
  form: {
    width: "100%",
    maxWidth: "100%",
  },
  label: {
    color: Colors.tintColorSecondary,
    fontSize: 12,
  },
  hint: {
    marginBottom: 10,
    color: Colors.mainColor,
  },
});
