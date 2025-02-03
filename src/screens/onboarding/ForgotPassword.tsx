import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SCREEN_WIDTH } from "../../theme/Theme";
import { Typography } from "../../theme/Typography";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function ForgotPassword() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={globalStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Image
          source={require("../../../assets/logo.png")}
          style={{
            width: 172,
            height: 172,
          }}
        />
        <View></View>
      </View>
      <View style={styles.container}>
        <Text style={styles.h1}>Forgot Password</Text>
        <Text style={styles.p}>
          Please enter the email address associated with your account. We will
          email you a link to reset your password.
        </Text>
        <Input
          placeholder="Enter Email"
          style={{
            width: 358,
            marginTop: 35,
          }}
          returnKeyLabel="done"
          returnKeyType="done"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button
          style={styles.btn}
          textStyles={{
            color: "white",
          }}
          title="SEND RESET LINK"
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  h1: {
    color: "white",
    fontSize: 28,
    fontWeight: "400",
    fontFamily: Typography.JosefinSansRegular,
    marginBottom: 18,
    marginTop: 40,
  },
  p: {
    fontWeight: "300",
    fontSize: 14,
    color: "white",
    fontFamily: Typography.regular,
    textAlign: "center",
    width: 266,
  },
  btn: {
    marginTop: 20,
    width: 296,
  },
});
