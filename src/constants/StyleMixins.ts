import Colors from "./Colors";
import { ViewStyle, StyleSheet } from "react-native";

export const Page: ViewStyle = {
  flex: 1,
  paddingVertical: 10,
  backgroundColor: Colors.bgMain,
};

export const Input: ViewStyle = {
  borderColor: Colors.tintColorPrimary,
  marginBottom: 10,
  paddingVertical: 6,
  paddingHorizontal: 10,
  borderWidth: 1,
  borderStyle: "solid",
  borderRadius: 4,
  width: "100%",
};

export const Overlay: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  zIndex: 2,
};
