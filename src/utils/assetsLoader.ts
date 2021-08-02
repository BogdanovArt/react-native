import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

export const loadAssets = async () => {
  return await Font.loadAsync({
    ...Ionicons.font,
    "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
};
