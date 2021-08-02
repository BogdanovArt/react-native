import * as React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Ratings from "../screens/Ratings";
import Receipt from "../screens/Receipts";
import Modal from "../screens/Modal";
import Create from "../screens/Receipt";

import Header from "../components/Layout/Header";

import { RootStackParamList } from "../types";
import { Routes } from "../constants/enums";

const Stack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

function StackScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Stack.Navigator
        initialRouteName={Routes.home}
        headerMode={"screen"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={Routes.home} component={Home} />
        <Stack.Screen name={Routes.ratings} component={Ratings} />
        <Stack.Screen name={Routes.receipt} component={Receipt} />
        <Stack.Screen name={Routes.create} component={Create} />
      </Stack.Navigator>
    </View>
  );
}

export default function RootStackScreen() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name={Routes.main}
        component={StackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={Routes.modal}
        component={Modal}
        options={{
          headerShown: false,
          cardOverlayEnabled: true,
          cardStyle: { backgroundColor: "rgba(0, 0, 0, 0.15)" },
        }}
      />
    </RootStack.Navigator>
  );
}
