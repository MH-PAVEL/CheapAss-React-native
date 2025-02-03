import {
  Text,
  TouchableOpacity,
  TextStyle,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Colors } from "../theme/Colors";
import { Typography } from "../theme/Typography";

interface ButtonProps {
  title: string;
  style?: TextStyle;
  onPress?: () => void;
  colour?: string;
  disable?: boolean;
  textStyles?: TextStyle;
}

export default function Button(props: ButtonProps) {
  const {
    title,
    style: customStyle,
    onPress,
    colour,
    disable,
    textStyles,
  } = props;
  return (
    <TouchableOpacity
      style={[styles.button, styles.normalButton, customStyle]}
      onPress={onPress}
      disabled={disable}
    >
      {disable ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={[styles.btn_text, textStyles]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  normalButton: {
    width: 165,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 100,
    backgroundColor: Colors.primary,
  },
  btn_text: {
    color: "white",
    fontSize: 16,
    fontFamily: Typography.regular,
    fontWeight: "400",
  },
});
