export enum RequestMethods {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  OPTIONS = "OPTIONS",
  DELETE = "DELETE",
  PUT = "PUT",
}

export enum ActionTypes {
  text = "text",
  left_menu = "left_menu",
  get = "get",
  press = "press",
}

export enum EntityTypes {
  content = "initial",
  button = "button",
}

export enum TabCodes {  
  tab1 = "oktell_tab1",  
  tab2 = "oktell_tab2",
  tab3 = "oktell_tab3",
}

export enum ColorThemes {
  light = "light",
  dark = "dark",
}

export enum LSkeys {
  colorTheme = "color_theme",
}

export enum RequestEntities {
  login = "login",
  logo = "logo",
  favicon = "favicon",
  sessions_all = "sessions_all",
  sessions_current = "sessions_current",
}

export type RequestCodes = TabCodes;