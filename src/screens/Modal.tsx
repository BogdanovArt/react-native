import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";

import { axios } from "../utils/axiosAccessor";
import { API } from "../utils/api";
import ALERT from "../utils/alert";

import { LinkButtonStyle } from "../components/LinkButtonStyles";
import Scanner from "../components/Receipt/ScannerModule";
import InputModule from "../components/Receipt/InputModule";
import EntityForm from "../components/Receipt/EntityForm";

import Colors from "../constants/Colors";

import { ScreenProps } from "../types/index";
import { TableItem } from "../store/receiptList/types";
import { RequestMethods } from "../types/enums";
import { Routes } from "../constants/enums";

import { setProducts } from "../store/receiptCreate";
import { getProducts } from "../store/receiptCreate/getters";

const barcodesTemp = [
  2010003455736, 2010003455743, 2010003455750, 2010003458843,
];

export default function Modal({ navigation }: ScreenProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showInput, setShowInput] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [item, setItem] = useState<TableItem | null>(null);

  const currentTable = useSelector(getProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      }
    })();
  }, []);

  const handleBarcodeAdd = (item: TableItem) => {
    try {
      const table = JSON.parse(JSON.stringify(currentTable));
      item.index = table.items.length + 1;
      table.items.push(item);
      dispatch(setProducts({ table }));
    } catch (err) {
      console.error(err);
      ALERT({ message: "Ошибка добавления позиции" });
    } finally {
      navigation.navigate(Routes.create);
    }
  };

  const handleBarCodeRequest = useCallback(async (code: string) => {
    setFetching(true);
    try {
      const res = await axios({
        url: API.RECEIPT.ADD,
        method: RequestMethods.POST,
        data: { barcode: code },
      });
      const table = res.data.data?.data?.table;
      let items = table?.items;

      if (items && items.length) {
        const item = items[0];
        const match = currentTable?.items.find(
          (entity: TableItem) => entity.itemid === item.itemid
        );
        if (match) {
          ALERT({ message: "Данная позиция уже присутствует в чеке" });
          return;
        }

        setItem(item);

        if (!currentTable) {
          table.items = [];
          dispatch(setProducts({ table }));
        }
        return;
      }
      setItem(null);

      ALERT({ message: "Товаров с таким ШК не найдено" });
    } catch (err) {
      console.error(err);
      setItem(null);
    } finally {
      setFetching(false);
    }
  }, []);

  const validateInput = (value: string, callback: () => void) => {
    callback();
    // const reg = new RegExp("^[0-9]{8}$|^[0-9]{13}$");
    // reg.test(value)
    //   ? callback()
    //   : ALERT({ message: "Некорректный EAN" });
  };

  const handleBarCodeScanned = (data: string) => {
    validateInput(data, () => {
      setShowScanner(false);
      handleBarCodeRequest(data);
    });
  };

  const handleManualInput = (value: string) => {    
    validateInput(value, () => {      
      setShowInput(false);
      setFetching(true);
      handleBarCodeRequest(value);
    });
  };

  const openScanner = useCallback(() => {
    if (hasPermission) {
      setShowScanner(true);
    } else {
      ALERT({
        message:
          "Необходимо предоставить приложению доступ к камере устройства",
      });
    }
  }, [showScanner, hasPermission]);

  const setInputMode = useCallback((state: boolean) => {
    setShowInput(state);
  }, []);

  const renderWrapper = (jsx: JSX.Element | JSX.Element[]) => {
    return (
      <View style={styles.content}>
        {fetching && (
          <View style={styles.loader}>
            <Text>Загрузка...</Text>
          </View>
        )}
        {jsx}
      </View>
    );
  };

  const renderInputType = () => {
    switch (true) {
      case !!item:
        return renderWrapper(
          <EntityForm item={item as TableItem} returnValue={handleBarcodeAdd} />
        );
      case showInput:
        return renderWrapper(<InputModule returnValue={handleManualInput} />);
      case showScanner:
        return <Scanner returnValue={handleBarCodeScanned} />;
      default:
        return renderWrapper([
          <TouchableOpacity
            key="manual"
            style={styles.button}
            onPress={() => setInputMode(true)}
          >
            <Text style={styles.buttonTitle}>Добавить ШК</Text>
          </TouchableOpacity>,
          <TouchableOpacity
            key="scanner"
            style={styles.button}
            onPress={() => openScanner()}
          >
            <Text style={styles.buttonTitle}>Сканировать ШК</Text>
          </TouchableOpacity>,
        ]);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.overlay}
        onPress={() => navigation.goBack()}
      />
      {renderInputType()}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    ...LinkButtonStyle,
    width: "100%",
    textAlign: "center",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  content: {
    position: "relative",
    padding: 20,
    backgroundColor: Colors.bgMain,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    maxWidth: "100%",
    width: "100%",
    zIndex: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  buttonTitle: {
    fontWeight: "600",
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.75,
    borderRadius: 8,
    zIndex: 2,
  },
});
