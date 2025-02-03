import { View, Text, StyleSheet, Image, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshTokenApi } from "../../network/api";
import { getToken } from "../../utils/token";
import { saveProfilesLocal } from "../../utils/profile";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SplashScreen() {
  let navigation = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 1000);
  }, [isFocused]);
  const checkLogin = async () => {
    try {
      const isLogin = await AsyncStorage.getItem("isLogin");
      if (isLogin && isLogin === "true") {
        const token: any = await AsyncStorage.getItem("refreshToken");
        const res = await refreshTokenApi(token);
        if (res.error) {
          await AsyncStorage.clear();
          navigation.navigate("SplshScreen2" as never);
        } else if (res.data) {
          await AsyncStorage.removeItem("isGuest");
          saveProfilesLocal(res.data);
          if (
            res.data.isMobileVerified === false &&
            res?.data?.isEmailVerified === false
          )
            navigation.navigate("Verification" as never);
          else if (!res?.data?.isPremium) {
            await AsyncStorage.removeItem("isPremium");
            navigation.navigate("DrawerNavigation" as never);
          } else navigation.navigate("DrawerNavigation" as never);
        } else {
          navigation.navigate("DrawerNavigation" as never);
          await AsyncStorage.setItem("isGuest", "true");
        }
      } else {
        navigation.navigate("SplshScreen2" as never);
      }
    } catch (err) {}
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
    <View style={styles.splashContainer}>
      <Image
        style={styles.splashImage}
        source={require("../../../assets/splash.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  splashImage: {
    width: "100%",
    height: "100%",
  },
});
