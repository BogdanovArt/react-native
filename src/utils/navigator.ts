import * as React from "react";
import { NavigationContainerRef } from "@react-navigation/native";

import { IBasicObject } from "../types/index";

type Navigate = (name: string, params: IBasicObject) => void;

const navigationRef = React.createRef<NavigationContainerRef>();

const navigate: Navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
}

export { navigate, navigationRef };