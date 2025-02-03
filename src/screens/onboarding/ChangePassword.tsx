import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/globalStyles";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Typography } from "../../theme/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { getToken } from "../../utils/token";
import { updateProfileApi } from "../../network/api";
import Toast from "react-native-toast-message";

export default function ChangePassword() {
  const navigation: any = useNavigation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const handleUpdate = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError({
        error: true,
        message: "Please fill all fields",
      });
      return;
    } else if (newPassword !== confirmPassword) {
      setError({
        error: true,
        message: "New password and confirm password must be same",
      });
      return;
    } else {
      setBtnLoading(true);
      setError({
        error: false,
        message: "",
      });
    }
    const bodyData = {
      auth: {
        oldPassword: oldPassword,
        password: newPassword,
        confirmPassword: confirmPassword,
      },
    };

    getToken().then(async (token) => {
      const res = await updateProfileApi(token, bodyData);
      if (res.error) {
        setError({
          error: true,
          message: res.message,
        });
        setBtnLoading(false);
      } else {
        setError({
          error: false,
          message: "",
        });
        setConfirmPassword("");
        setNewPassword("");
        setOldPassword("");
        setBtnLoading(false);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Password updated successfully",
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    });
  };

  const inputsData = [
    {
      placeholder: "Old Password",
      onChangeText: (text: string) => setOldPassword(text),
      keyboardType: "default",
      style: styles.input,
      value: oldPassword,
      input_style: styles.input_text,
      secureTextEntry: true,
    },
    {
      placeholder: "New Password",
      onChangeText: (text: string) => setNewPassword(text),
      style: styles.input,
      value: newPassword,
      input_style: styles.input_text,
      keyboardType: "default",
      secureTextEntry: true,
    },
    {
      placeholder: "Confirm Password",
      onChangeText: (text: string) => setConfirmPassword(text),
      keyboardType: "default",
      style: styles.input,
      value: confirmPassword,
      input_style: styles.input_text,
      secureTextEntry: true,
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={[globalStyles.header, globalStyles.center_text]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.header_text}>Change Password</Text>
        <View></View>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={styles.p}>
          You can change your password for security reasons or reset it if you
          forget it.
        </Text>
        {inputsData.map((inputData, index) => (
          <Input
            key={index}
            placeholder={inputData.placeholder}
            onChangeText={inputData.onChangeText}
            style={inputData.style}
            value={inputData.value}
            secureTextEntry={inputData.secureTextEntry || false}
            keyboardType={inputData.keyboardType}
          />
        ))}
        {error.error && (
          <Text style={globalStyles.error_text}>{error.message}</Text>
        )}
        <Button
          style={styles.btn}
          textStyles={{
            color: "white",
          }}
          title="UPDATE PASSWORD"
          onPress={handleUpdate}
          disable={btnLoading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  p: {
    fontWeight: "300",
    fontSize: 14,
    color: "#fff",
    marginTop: 40,
    width: 291,
    textAlign: "center",
    fontFamily: Typography.regular,
    marginBottom: 17,
  },
  input: {
    width: 358,
    marginTop: 13,
  },
  input_text: {
    fontSize: 12,
    color: "white",
    fontWeight: "300",
  },
  btn: {
    marginTop: 22,
    marginBottom: 16,
    width: 296,
  },
  container: {
    flex: 1,
  },
  header_text: {
    color: "white",
    fontSize: 28,
    fontFamily: Typography.JosefinSansRegular,
  },
});
