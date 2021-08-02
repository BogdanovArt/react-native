import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";

import { navigationRef } from "./utils/navigator";

import Root from "./screens/Root";

import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Root />
      </NavigationContainer>
    </Provider>
  );
}

registerRootComponent(App);
