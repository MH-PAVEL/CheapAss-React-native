import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { globalStyles } from "../../styles/globalStyles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { getToken } from "../../utils/token";
import {
  verificationRequestApi,
  verificationSubmitApi,
} from "../../network/api";
import Toast from "react-native-toast-message";

export default function Verification() {
  const navigation = useNavigation();
  const route: any = useRoute();
  const type = route?.params?.type;

  const [code, setCode] = useState("");
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [resendTimer, setResendTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
  }, [resendTimer]);
  const handleVerify = async () => {
    getToken().then(async (token) => {
      const bodyData = {
        type: type,
        code: code,
      };
      const res = await verificationSubmitApi(bodyData, token);
      if (res.error) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Error",
          text2: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      } else {
        Toast.show({
          type: "success",
          position: "top",
          text1: "Success",
          text2: "Verification Successful",
          visibilityTime: 2000,
          autoHide: true,
        });
        navigation.navigate(
          "SelectSubscription" as never,
          {
            isBack: false,
            isClose: false,
          } as never
        );
      }
    });
  };

  const handleResend = async () => {
    getToken().then(async (token) => {
      const res = await verificationRequestApi({ type: type }, token);
      if (res.error) {
        setError({
          error: true,
          message: res.message,
        });
      } else {
        setResendTimer(60);
        Toast.show({
          type: "success",
          position: "top",
          text1: "Success",
          text2: "Verification code sent",
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    });
  };

  return (
    <SafeAreaView
      style={{
        padding: 16,
      }}
    >
      <View
        style={[
          globalStyles.header,
          {
            paddingHorizontal: 0,
          },
        ]}
      >
        <View></View>
        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "600",
          }}
        >
          Verification
        </Text>
        <View></View>
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: "#fff",
          marginTop: 8,
        }}
      >
        Enter the Verificaiton code that was sent to your email address. Make
        sure to check your spam folder
      </Text>
      <Input
        placeholder="Verification Code"
        style={{
          width: "100%",
          marginTop: 35,
        }}
        onChangeText={(text: string) => setCode(text)}
        value={code}
        keyboardType="number-pad"
        maxLength={6}
      />
      <TouchableOpacity
        onPress={resendTimer === 0 ? () => handleResend() : () => {}}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            marginTop: 16,
          }}
        >
          {resendTimer > 0
            ? `Resend Code in ${resendTimer} seconds`
            : "Resend Code"}
        </Text>
      </TouchableOpacity>
      <Button
        title="Verify"
        onPress={handleVerify}
        style={{
          width: "100%",
          marginTop: 35,
        }}
      />
    </SafeAreaView>
  );
}
