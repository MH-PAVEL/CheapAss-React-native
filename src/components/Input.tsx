import { View, Text, TextStyle, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { Typography } from "../theme/Typography";
import { globalStyles } from "../styles/globalStyles";

interface TextInputProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "visible-password"
    | any;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  style?: TextStyle | any;
  value?: string;
  editable?: boolean;
  maxLength?: number;
  secureTextEntry?: boolean;
  forgetPassword?: boolean;
  forgetPasswordComponent?: React.ReactNode;
  input_style?: TextStyle;
  returnKeyLabel?: string;
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
  onSubmitEditing?: () => void;
  handlePress?: () => void;
  search?: boolean;
  searchComponent?: React.ReactNode;
}

export default function Input(props: TextInputProps) {
  const {
    placeholder,
    autoCapitalize,
    onChangeText,
    keyboardType,
    style,
    value,
    editable,
    maxLength,
    secureTextEntry,
    forgetPassword,
    forgetPasswordComponent,
    input_style,
    returnKeyLabel,
    returnKeyType,
    onSubmitEditing,
    handlePress,
    search,
    searchComponent,
  } = props;
  return (
    <View style={[globalStyles.input_container, style]}>
      {search && <>{searchComponent}</>}
      <TextInput
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onChangeText={onChangeText}
        placeholder={placeholder}
        defaultValue={value}
        editable={editable}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="white"
        style={[styles.input, input_style]}
        onSubmitEditing={onSubmitEditing}
        returnKeyLabel={returnKeyLabel}
        returnKeyType={returnKeyType}
        onPressIn={handlePress}
      />
      {forgetPassword && <>{forgetPasswordComponent}</>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    // height: 60,
    color: "white",
    fontSize: 13,
    fontFamily: Typography.regular,
  },
});
