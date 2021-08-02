import React, { useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SwipeRow } from "react-native-swipe-list-view";

import Colors from "../../constants/Colors";

import { TableData, TableItem } from "../../store/receiptList/types";

interface Props {
  table: TableData;
  controls?: JSX.Element | JSX.Element[];
  readonly?: boolean;
  flexValues?: { [key: string]: number };
  remove?: (item: TableItem) => void;
}

export default function Table({
  table,
  controls,
  flexValues = {},
  remove = () => null,
  readonly,
}: Props) {
  const renderControls = useCallback(() => {
    return controls ? <View style={styles.controls}>{controls}</View> : null;
  }, [controls]);

  const renderHeadings = useCallback(() => {
    const headers = table.headers.map((header, index) => {
      const flex = flexValues[header.key];
      return (
        <View
          key={index}
          style={{
            ...styles.heading,
            flex: flex || 1,
            display: flex !== 0 ? "flex" : "none",
          }}
        >
          <Text style={styles.cellText}>{header.title}</Text>
        </View>
      );
    });
    return (
      <View style={styles.rowWrapper}>
        <View style={styles.row}>
          <View style={styles.spacer} />
          {headers}
          <View style={styles.spacer} />
        </View>
      </View>
    );
  }, [table]);

  const wrapperSelect = useCallback(
    (jsx: JSX.Element | JSX.Element[], row: TableItem) => {
      if (readonly) {
        return jsx;
      }
      return (
        <SwipeRow
          rightOpenValue={-75}
          leftOpenValue={0}
          stopLeftSwipe={15}
          stopRightSwipe={-100}
          recalculateHiddenLayout={true}
        >
          <TouchableOpacity
            key="remove"
            style={styles.delete}
            onPress={() => remove(row)}
          >
            <View style={styles.deleteText}>
              <Text style={{ color: Colors.white }}>Удалить</Text>
            </View>
          </TouchableOpacity>
          {jsx}
        </SwipeRow>
      );
    },
    [readonly]
  );

  const renderRow = useCallback(
    (row: TableItem, key: string) => {
      const cells = table.headers.map((header, index) => {
        const flex = flexValues[header.key];
        return (
          <View
            key={index}
            style={{
              ...styles.heading,
              flex: flex || 1,
              display: flex !== 0 ? "flex" : "none",
            }}
          >
            <Text
              style={[
                styles.cellText,
                row.highlighted ? styles.cellCurrent : null,
              ]}
            >
              {row[header.key]}
            </Text>
          </View>
        );
      });
      return (
        <View key={key} style={styles.rowWrapper}>
          {wrapperSelect(
            <View key="row" style={styles.row}>
              <View style={styles.spacer} />
              {cells}
              <View style={styles.spacer} />
            </View>,
            row
          )}
        </View>
      );
    },
    [table]
  );

  const renderItems = useCallback(() => {
    if (!table.items || !table.items.length) {
      return <Text style={styles.hint}>Нет данных</Text>;
    }
    return table.items.map((item, index) => {
      return renderRow(item, `${item.barcode}-${index}`);
    });
  }, [table]);

  return (
    <View style={styles.table}>
      {renderControls()}
      {renderHeadings()}
      {renderItems()}
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: "row",
  },
  table: {
    position: "relative",
    width: "100%",
    maxWidth: "100%",
  },
  rowWrapper: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
  },
  temp: {
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    backgroundColor: Colors.white,
  },
  cellText: {
    paddingVertical: 10,
    fontSize: 12,
    marginRight: 3,
  },
  cellCurrent: {
    color: Colors.mainColor,
    fontWeight: "600",
  },
  heading: {},
  hint: {
    fontSize: 12,
    margin: 20,    
    color: Colors.tintColorSecondary,
  },
  spacer: {
    width: 20,
    minWidth: 20,
    maxWidth: 20,
  },
  delete: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "stretch",
    backgroundColor: Colors.error,
  },
  deleteText: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    color: Colors.white,
  },
});
