import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import Colors from "../../constants/Colors";

import { Input } from "../../constants/StyleMixins";

interface Props {
  returnValue: (code: string) => void;
}

export default function InputModule({ returnValue }: Props) {
  const [value, setValue] = useState("");
  return (
    <View style={styles.form}>
      <TextInput
        value={value}
        maxLength={13}
        keyboardType={"number-pad"}
        onChangeText={(val) => setValue(val.replace(/[^0-9]/g, ''))}
        placeholder={"Введите номер ШК"}
        style={styles.input}
      />
      <Button
        title="Добавить"
        disabled={!value}
        color={Colors.mainColor}
        onPress={() => returnValue(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {},
  form: {
    width: "100%",
  },
  input: Input,
});
