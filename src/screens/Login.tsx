import React, { Dispatch, SetStateAction, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import colors from "../constants/Colors";
import logo from "../assets/images/logo.png";

import { authorize } from "../store/auth/actions";
import { getError } from "../store/auth/getters";
import { setError } from "../store/auth/index";
import { Input } from "../constants/StyleMixins";

enum Fields {
  login = "login",
  password = "password",
}

type Form = { [key in Fields]: string };

type State = [Form, Dispatch<SetStateAction<Form>>];

const initialForm = {
  [Fields.login]: "",
  [Fields.password]: "",
};

const errorMessages = {
  [Fields.login]: `Заполните поле "Логин"`,
  [Fields.password]: `Заполните поле "Пароль"`,
};

export default function Login() {
  const [form, setForm]: State = useState(initialForm);
  const errors = useSelector(getError);
  const dispatch = useDispatch();

  const setFormData = (name: Fields, value: string) => {
    const formCopy = { ...form } as Form;
    formCopy[name] = value;
    
    dispatch(setError(""));
    setForm(formCopy);
  };

  const login = async () => {
    if (form.login && form.password) {
      await dispatch(
        authorize({
          payload: form,
        })
      );
    } else {
      if (!form.login) {
        dispatch(setError(errorMessages.login));
        return;
      } 
      if (!form.password) {
        dispatch(setError(errorMessages.password));
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <View style={styles.divider} />
      <Text style={styles.title}>Авторизация</Text>
      <View style={styles.form}>
        <TextInput
          value={form[Fields.login]}
          onChangeText={(val) => setFormData(Fields.login, val)}
          placeholder={"Логин"}
          style={styles.input}
        />

        <TextInput
          value={form[Fields.password]}
          onChangeText={(val) => setFormData(Fields.password, val)}
          placeholder={"Пароль"}
          secureTextEntry={true}
          style={styles.input}
        />
        {errors ? <Text style={styles.error}>{errors}</Text> : null}
      </View>
      <TouchableOpacity style={styles.submit} onPress={login}>
        <Text style={{ color: colors.white }}>Войти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    height: 35,
    width: 140,
    margin: 20,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: colors.tintColorPrimary,
  },
  title: {
    marginVertical: 15,
    fontSize: 20,
    fontWeight: "600",
  },
  form: {
    width: "100%",
    paddingHorizontal: 20,
  },
  input: Input,
  submit: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: colors.mainColor,
  },
  error: {
    color: colors.error,
    marginBottom: 10,
  },
});
