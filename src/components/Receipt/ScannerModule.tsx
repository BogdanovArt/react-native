import React from "react";
import { StyleSheet, View } from "react-native";
import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";

import Colors from "../../constants/Colors";

interface Props {
  returnValue: (code: string) => void;
}

export default function Scanner({ returnValue = () => null }: Props) {
  

  const handleBarCodeScanned: BarCodeScannedCallback = ({ data }) => {
    returnValue(data);
    // alert(`Bar code with data ${data} has been scanned!`);
  };
  return (
    <BarCodeScanner
      onBarCodeScanned={handleBarCodeScanned}
      style={{ ...styles.scanner, ...styles.container }}
    >
      <View style={styles.layerTop} />
      <View style={styles.layerCenter}>
        <View style={styles.layerLeft} />
        <View style={styles.focused}>
          <View style={{ ...styles.corner, ...styles.cornerRB }} />
          <View style={{ ...styles.corner, ...styles.cornerLB }} />
          <View style={{ ...styles.corner, ...styles.cornerLT }} />
          <View style={{ ...styles.corner, ...styles.cornerRT }} />
        </View>
        <View style={styles.layerRight} />
      </View>
      <View style={styles.layerBottom} />
    </BarCodeScanner>
  );
}

const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  scanner: {
    ...StyleSheet.absoluteFillObject,
    margin: -15,
    zIndex: 21,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  corner: {
    position: "absolute",
    height: 40,
    width: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: Colors.white,
  },
  cornerRB: {
    right: -2,
    bottom: -2,
  },
  cornerLB: {
    left: -2,
    bottom: -2,
    transform: [{ rotate: "90deg" }],
  },
  cornerLT: {
    left: -2,
    top: -2,
    transform: [{ rotate: "180deg" }],
  },
  cornerRT: {
    right: -2,
    top: -2,
    transform: [{ rotate: "270deg" }],
  },
  focused: {
    flex: 10,
    borderColor: opacity,
    borderWidth: 4,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity,
  },
});