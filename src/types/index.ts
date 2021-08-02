import { Routes } from "../constants/enums";
import { ActionTypes, EntityTypes, RequestCodes } from "./enums";

export interface RequestPayload {
  entity: EntityTypes;
  action: ActionTypes;
  options: RequestPayloadOptions | {};
}

export interface RequestPayloadOptions {
  [key: string]: RequestCodes | string | undefined;
}

export interface RequestPayloadOptionsModified {
  rUserId: string;
  [key: string]: RequestCodes | string | undefined;
}

export interface IBasicObject {
  [key: string]: any;
}
export interface ScreenProps {
  navigation: {
    navigate: (name: Routes) => void;
    goBack: () => void;
  };
}
