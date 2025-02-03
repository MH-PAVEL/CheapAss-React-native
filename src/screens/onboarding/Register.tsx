import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SCREEN_WIDTH } from "../../theme/Theme";
import { Typography } from "../../theme/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Colors } from "../../theme/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";
import { RegisterApi, verificationRequestApi } from "../../network/api";
import { getToken, setToken } from "../../utils/token";
const validator = require("email-validator");
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { saveProfilesLocal } from "../../utils/profile";

export default function Register() {
  const navigation = useNavigation();
  const isBack = useRoute();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkMark, setCheckMark] = useState(false);
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [verifyModal, setVerifyModal] = useState(false);

  const inputsData = [
    {
      placeholder: "First Name",
      onChangeText: (text: string) => setFirstName(text),
      keyboardType: "default",
      style: styles.input,
      value: firstName,
      input_style: styles.input_text,
      maxLength: 25,
    },
    {
      placeholder: "Last Name",
      onChangeText: (text: string) => setLastName(text),
      keyboardType: "default",
      style: styles.input,
      value: lastName,
      editable: true,
      input_style: styles.input_text,
      maxLength: 20,
    },
    {
      placeholder: "Cell Phone",
      onChangeText: (text: string) => setPhoneNumber(text),
      keyboardType: "phone-pad",
      style: styles.input,
      value: phoneNumber,
      input_style: styles.input_text,
    },
    {
      placeholder: "Email",
      onChangeText: (text: string) => setEmail(text),
      keyboardType: "email-address",
      style: styles.input,
      value: email,
      input_style: styles.input_text,
    },
    {
      placeholder: "Password",
      onChangeText: (text: string) => setPassword(text),
      style: styles.input,
      value: password,
      input_style: styles.password_text,
      keyboardType: "default",
      secureTextEntry: !passwordEye,
      forgetPassword: true,
      forgetPasswordComponent: (
        <TouchableOpacity onPress={() => setPasswordEye(!passwordEye)}>
          <Feather
            name={passwordEye ? "eye" : "eye-off"}
            size={16}
            color={"#fff"}
          />
        </TouchableOpacity>
      ),
    },
    {
      placeholder: "Confirm Password",
      onChangeText: (text: string) => setConfirmPassword(text),
      keyboardType: "default",
      style: styles.input,
      value: confirmPassword,
      input_style: styles.password_text,
      secureTextEntry: !confirmPasswordEye,
      forgetPassword: true,
      forgetPasswordComponent: (
        <TouchableOpacity
          onPress={() => setConfirmPasswordEye(!confirmPasswordEye)}
        >
          <Feather
            name={confirmPasswordEye ? "eye" : "eye-off"}
            size={16}
            color={"#fff"}
          />
        </TouchableOpacity>
      ),
    },
  ];
  const handleRegister = async () => {
    if (checkMark) {
      if (firstName === "")
        setError({ error: true, message: "Please enter your first name" });
      else if (firstName.length < 3)
        setError({
          error: true,
          message: "First name must be at least 3 characters",
        });
      else if (lastName === "")
        setError({ error: true, message: "Please enter your last name" });
      else if (lastName.length < 3)
        setError({
          error: true,
          message: "Last name must be at least 3 characters",
        });
      else if (phoneNumber === "")
        setError({ error: true, message: "Please enter your phone number" });
      else if (email === "")
        setError({ error: true, message: "Please enter your email" });
      else if (validator.validate(email) === false)
        setError({ error: true, message: "Please enter a valid email" });
      else if (password === "")
        setError({ error: true, message: "Please enter your password" });
      else if (password.length < 8)
        setError({
          error: true,
          message: "Password must be at least 8 characters",
        });
      else if (confirmPassword === "")
        setError({ error: true, message: "Please confirm your password" });
      else if (password !== confirmPassword)
        setError({ error: true, message: "Passwords do not match" });
      else {
        setLoading(true);
        setError({ error: false, message: "" });
        const bodyData: RegisterBodyType = {
          firstName,
          lastName,
          email,
          password,
          cellPhone: phoneNumber,
          confirmPassword,
        };
        const res = await RegisterApi(bodyData);
        if (res.error === true) {
          setLoading(false);
          setError({ error: true, message: res.message });
        } else {
          setToken("accessToken", res?.tokens?.accessToken);
          setToken("refreshToken", res?.tokens?.refreshToken);
          saveProfilesLocal(res?.data);
          await AsyncStorage.setItem("isLogin", "true");
          setLoading(false);
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Account created successfully",
            visibilityTime: 2000,
            autoHide: true,
          });
          await AsyncStorage.setItem("isPremium", "false");
          if (res.data.isEmailVerified == true) {
            navigation.navigate(
              "SelectSubscription" as never,
              {
                isBack: false,
                isClose: true,
              } as never
            );
          } else {
            setVerifyModal(true);
          }
        }
      }
    } else {
      setError({
        error: true,
        message: "Please agree to our Terms & Conditions and Privacy Policy",
      });
    }
  };
  const handleVerify = async (type: string) => {
    getToken().then(async (token) => {
      const res = await verificationRequestApi({ type }, token);
      if (res.error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: res.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      } else {
        setVerifyModal(false);
        navigation.navigate("Verification" as never, { type } as never);
      }
    });
  };
  return (
    <SafeAreaView>
      <ScrollView>
        {verifyModal && (
          <Modal visible={verifyModal} animationType="slide">
            <View style={globalStyles.centeredView}>
              <View
                style={[
                  globalStyles.modalView,
                  {
                    padding: 8,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "400",
                    color: "#000",
                    textAlign: "center",
                    fontFamily: Typography.regular,
                  }}
                >
                  Which verification method would you like to use?
                </Text>
                <View>
                  <TouchableOpacity
                    style={styles.verify_button}
                    onPress={() => handleVerify("email")}
                  >
                    <Text style={styles.verify_text}>Email</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.verify_button}
                    onPress={() => handleVerify("mobile")}
                  >
                    <Text style={styles.verify_text}>Mobile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
        <SafeAreaView>
          <View style={globalStyles.header}>
            {isBack ? (
              <View></View>
            ) : (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="white" />
              </TouchableOpacity>
            )}
            <Image
              source={require("../../../assets/user_icon.png")}
              style={globalStyles.user_icon}
            />
            <View></View>
          </View>
          <View style={styles.container}>
            <Text style={styles.create_text}>Create a new account</Text>
            <Text style={styles.description_Text}>
              Please fill in the form to continue
            </Text>

            {inputsData.map((inputData, index) => (
              <Input
                key={index}
                placeholder={inputData.placeholder}
                onChangeText={inputData.onChangeText}
                style={inputData.style}
                value={inputData.value}
                input_style={inputData?.input_style}
                secureTextEntry={inputData.secureTextEntry || false}
                keyboardType={inputData.keyboardType}
                maxLength={inputData.maxLength}
                forgetPassword={inputData?.forgetPassword || false}
                forgetPasswordComponent={inputData.forgetPasswordComponent}
              />
            ))}
            <View style={styles.terms_container}>
              <MaterialIcons
                name={checkMark ? "check-box" : "check-box-outline-blank"}
                size={16}
                color={"white"}
                onPress={() => setCheckMark(!checkMark)}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={styles.terms_text}>Agree to our</Text>
                <Pressable
                  onPress={() => navigation.navigate("Terms" as never)}
                >
                  <Text
                    style={[
                      styles.terms_text,
                      {
                        color: Colors.primary,
                      },
                    ]}
                  >
                    Terms & Conditions
                  </Text>
                </Pressable>
                <Text style={styles.terms_text}>and</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Privacy" as never)}
                >
                  <Text
                    style={[
                      styles.terms_text,
                      {
                        color: Colors.primary,
                      },
                    ]}
                  >
                    Privacy Policy
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {
              error.error && (
                <Text style={globalStyles.error_text}>{error.message}</Text>
              ) // need to add error message
            }
            <Button
              style={styles.btn}
              textStyles={{
                color: "white",
              }}
              title="REGISTER"
              onPress={handleRegister}
              disable={loading}
            />

            <View style={styles.bottom_area}>
              <Text style={styles.login_text_area}>Have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login" as never)}
              >
                <Text style={styles.login_text}> Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  create_text: {
    fontSize: 28,
    fontFamily: Typography.JosefinSansRegular,
    color: "white",
    marginTop: 24,
    marginBottom: 18,
  },
  description_Text: {
    fontSize: 14,
    color: "white",
    fontFamily: Typography.regular,
  },
  input: {
    width: 358,
    marginTop: 30,
  },
  input_text: {
    fontSize: 12,
    color: "white",
    fontWeight: "300",
  },
  password_text: {
    fontSize: 12,
    color: "white",
    fontWeight: "300",
    width: "90%",
  },
  login_text_area: {
    color: "white",
    fontSize: 16,
    fontFamily: Typography.regular,
  },
  login_text: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: Typography.regular,
  },
  btn: {
    marginTop: 22,
    marginBottom: 16,
    width: 296,
  },
  terms_container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },
  terms_text: {
    fontSize: 10,
    fontWeight: "300",
    color: "white",
    marginLeft: 6,
  },
  bottom_area: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 34,
    justifyContent: "center",
  },
  verify_button: {
    backgroundColor: Colors.primary,
    width: 296,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  verify_text: {
    color: "white",
    fontSize: 16,
    fontFamily: Typography.regular,
  },
});
