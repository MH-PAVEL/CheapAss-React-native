import { View, Text, StyleSheet, Image, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "../../theme/Theme";
import { Typography } from "../../theme/Typography";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Colors } from "../../theme/Colors";
import { globalStyles } from "../../styles/globalStyles";
import { apiUrls, LoginApi, url } from "../../network/api";
import { setToken } from "../../utils/token";
import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveProfilesLocal } from "../../utils/profile";
const validator = require("email-validator");

export default function Login() {
  const navigation = useNavigation();
  const route: any = useRoute();
  const isBack = route?.params?.isBack;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordEye, setPasswordEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const handleLogin = async () => {
    if (email === "")
      setError({
        error: true,
        message: "Email is required",
      });
    else if (validator.validate(email) === false)
      setError({ error: true, message: "Please enter a valid email" });
    else if (password === "")
      setError({
        error: true,
        message: "Password is required",
      });
    else if (password.length < 8)
      setError({
        error: true,
        message: "Password must be at least 8 characters",
      });
    else {
      setError({
        error: false,
        message: "",
      });
      setLoading(true);

      const bodyData: LoginBodyType = {
        email,
        password,
      };
      const res = await LoginApi(bodyData);
      if (res.error) {
        setError({
          error: true,
          message: res.message,
        });
        setLoading(false);
      } else {
        setLoading(false);
        setToken("accessToken", res?.tokens?.accessToken);
        setToken("refreshToken", res?.tokens?.refreshToken);
        saveProfilesLocal(res?.data);
        setLoading(false);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Login Successful",
          visibilityTime: 2000,
          autoHide: true,
        });

        await AsyncStorage.setItem("isLogin", "true");
        await AsyncStorage.removeItem("isGuest");

        if (res?.data?.isPremium) {
          navigation.navigate("DrawerNavigation" as never);
        } else {
          await AsyncStorage.setItem("isPremium", "false");
          navigation.navigate("DrawerNavigation" as never);
        }
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={globalStyles.header}>
        {isBack ? (
          <View></View>
        ) : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.img_container}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.loginText}>Please login to your account</Text>
        <Input
          placeholder="Email"
          style={styles.input}
          onChangeText={(text: string) => setEmail(text)}
          returnKeyLabel="next"
          returnKeyType="next"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          placeholder="Password"
          style={styles.input}
          onChangeText={(text: string) => setPassword(text)}
          secureTextEntry={!passwordEye}
          forgetPassword={true}
          forgetPasswordComponent={
            <TouchableOpacity onPress={() => setPasswordEye(!passwordEye)}>
              <Feather
                name={passwordEye ? "eye" : "eye-off"}
                size={16}
                color="white"
              />
            </TouchableOpacity>
          }
          input_style={{
            width: "80%",
          }}
          returnKeyLabel="done"
          returnKeyType="done"
          autoCapitalize="none"
        />

        {error.error && <Text style={styles.error_text}>{error.message}</Text>}
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword" as never)}
        >
          <Text style={styles.forget_password}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button
          style={styles.btn}
          textStyles={{
            color: "white",
          }}
          title="LOG IN"
          onPress={handleLogin}
          disable={loading}
        />
        <View style={styles.bottom_area}>
          <Text style={styles.register_text_area}>Don’t have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register" as never)}
          >
            <Text style={styles.register_text}> Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 172,
    height: 172,
  },
  img_container: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  welcomeText: {
    color: "white",
    fontSize: 28,
    fontWeight: "400",
    fontFamily: Typography.JosefinSansRegular,
    marginBottom: 18,
    marginTop: 8,
  },
  input: {
    width: 358,
    marginTop: 48,
  },
  loginText: {
    fontSize: 14,
    color: "white",
    fontFamily: Typography.regular,
  },
  forget_password: {
    color: Colors.primary,
    fontSize: 12,
    fontFamily: Typography.regular,
    textDecorationColor: "white",
    textDecorationLine: "underline",
    marginTop: 12,
  },
  register_text_area: {
    color: "white",
    fontSize: 16,
    fontFamily: Typography.regular,
  },
  register_text: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: Typography.regular,
  },
  btn: {
    marginTop: 44,
    marginBottom: 22,
    width: 296,
  },
  bottom_area: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 34,
    justifyContent: "center",
  },
  error_text: {
    color: "red",
    fontSize: 14,
    fontWeight: "400",
    marginTop: 16,
  },
});
