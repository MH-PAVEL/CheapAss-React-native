import { View, Text, StyleSheet, Image, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
import { Typography } from "../../theme/Typography";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import { guestApi } from "../../network/api";
import { setToken } from "../../utils/token";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplshScreen2() {
  const navigation = useNavigation();
  const [ip, setIp] = useState<string | null>(null);

  useEffect(() => {
    fetchIpAddress();
  }, []);

  const fetchIpAddress = async () => {
    const url = `https://api.ipify.org/?format=json`;
    const response = await axios.get(url);
    setIp(response.data.ip);
  };

  const continueWithGuest = async () => {
    const res = await guestApi({ ip });
    setToken("accessToken", res?.tokens?.accessToken);
    setToken("refreshToken", res?.tokens?.refreshToken);
    await AsyncStorage.setItem("isGuest", "true");
    await AsyncStorage.setItem("isLogin", "true");
    navigation.navigate("DrawerNavigation" as never);
  };

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo.png")}
        style={{
          width: 172,
          height: 172,
        }}
      />
      <Button
        title="Log in"
        style={{
          marginTop: 40,
        }}
        textStyles={styles.btnText}
        onPress={() => navigation.navigate("Login" as never)}
      />
      <Button
        title="Register Now"
        style={styles.secondryBtn}
        textStyles={styles.btnText}
        onPress={() => navigation.navigate("Register" as never)}
      />
      <TouchableOpacity onPress={continueWithGuest}>
        <Text
          style={[
            styles.btnText,
            {
              marginTop: 22,
            },
          ]}
        >
          Continue with Guest!
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontFamily: Typography.regular,
    fontWeight: "400",
  },
  secondryBtn: {
    marginTop: 14,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#212121",
  },
});
