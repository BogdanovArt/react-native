import React, { useState, useEffect, useCallback } from "react";
import { View, Platform, Text } from "react-native";
import { useSelector } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import config from "expo-constants";

import Router from "../navigation/Router";
import Login from "./Login";

import { getAuthTokens } from "../store/auth/getters";

import { loadAssets } from "../utils/assetsLoader";
import Colors from "../constants/Colors";

export default function Root() {
  const tokens = useSelector(getAuthTokens);
  const [appIsReady, setAppIsReady] = useState(false);

  const prepare = async () => {
    try {
      const splashProm = SplashScreen.preventAutoHideAsync();
      const assetsProm = loadAssets();

      await Promise.all([splashProm, assetsProm]);
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
    }
  };

  useEffect(() => {
    prepare();
  }, []);

  const onContentRender = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!tokens) {
    return (
      <View onLayout={onContentRender} style={{ flex: 1 }}>
        <Login />
        <View style={{ padding: 20 }}>
          <Text style={{ color: Colors.tintColorPrimary }}>
            Версия: {JSON.stringify(config.manifest.version)}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      onLayout={onContentRender}
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? config.statusBarHeight : 0,
      }}
    >
      <Router />
    </View>
  );
}
