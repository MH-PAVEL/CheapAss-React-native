import { View, Text } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../utils/token";
import { logoutApi } from "../network/api";

export default function SignOut() {
  const navigation = useNavigation();
  useEffect(() => {
    signOut();
  }, []);

  const signOut = async () => {
    getToken().then(async (token) => {
      const res = await logoutApi(token);
      await AsyncStorage.clear();
      navigation.navigate("SplshScreen2" as never);
    });
  };
  return (
    <View>
      <Text>Signout</Text>
    </View>
  );
}
