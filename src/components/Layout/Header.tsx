import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";

import * as RootNavigator from "../../utils/navigator";
import ALERT from "../../utils/alert";

import { Routes } from "../../constants/enums";
import Colors from "../../constants/Colors";

import { forceLogout } from "../../store/auth/actions";
import { getUserData } from "../../store/auth/getters";

import Logo from "../../assets/images/logo.png";

const convertName = (name: string) => {
  const names = name.split(" ");
  if (name.length > 1) {
    return `${names[0]} ${names[1]}`;
  }
  return names[0] || name;
};

export default function Header() {
  const user = useSelector(getUserData);
  const dispatch = useDispatch();

  const namePressHandler = () => {
    ALERT({
      message: "Выйти из профиля ?",
      cancel: {
        text: "Нет",
        style: "cancel",
      },
      accept: {
        text: "Да, выйти",
        onPress: () => dispatch(forceLogout()),
      },
    });
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => RootNavigator.navigate(Routes.home, {})}
      >
        <Image source={Logo} style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => namePressHandler()}>
        <Text style={styles.user}>{convertName(user?.fio || "")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 40,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowRadius: 8,
    backgroundColor: Colors.white,
    zIndex: 99,
  },
  wrapper: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 130,
    height: 40,
  },
  user: {
    fontSize: 12,
  },
});
