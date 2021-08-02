import { Platform, Alert, AlertButton } from "react-native";

const defaultButton: AlertButton = {
  text: "Понятно",
  style: "cancel",
}

interface Props {
  title?: string;
  message: string;
  cancel?: AlertButton;
  accept?: AlertButton;
}

export default function ALERT({
  title = "",
  message = "",
  accept,
  cancel = defaultButton,
}: Props) {
  if (Platform.OS === "web") {
    if (accept) {
      if (confirm(message)) accept.onPress && accept.onPress();
    } else {
      alert(message);
    }
  } else {
    const buttons = [cancel];
    if (accept) buttons.unshift(accept);
    Alert.alert(title, message, buttons);
  }
}
