import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Typography } from "../theme/Typography";
import { SCREEN_WIDTH } from "../theme/Theme";
import Input from "../components/Input";
import Button from "../components/Button";
import { getProfileApi, updateProfileApi } from "../network/api";
import { getToken } from "../utils/token";
import Toast from "react-native-toast-message";

export default function Setting() {
  const navigation: any = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({} as any);
  const isFocused = useIsFocused();
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const inputsData = [
    {
      placeholder: "First Name",
      onChangeText: (text: string) => setFirstName(text),
      keyboardType: "default",
      style: styles.input,
      value: firstName,
      input_style: styles.input_text,
    },
    {
      placeholder: "Last Name",
      onChangeText: (text: string) => setLastName(text),
      keyboardType: "default",
      style: styles.input,
      value: lastName,
      editable: true,
      input_style: styles.input_text,
    },
    {
      placeholder: "Cell Phone",
      onChangeText: (text: string) => setPhoneNumber(text),
      keyboardType: "phone-pad",
      style: styles.input,
      value: phoneNumber,
      input_style: styles.input_text,
      editable: false,
    },
    {
      placeholder: "Email",
      onChangeText: (text: string) => setEmail(text),
      keyboardType: "email-address",
      style: styles.input,
      value: email,
      input_style: styles.input_text,
      editable: false,
    },
  ];

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      fetchProfile();
    }
  }, [isFocused]);

  const fetchProfile = async () => {
    getToken().then(async (token) => {
      const res = await getProfileApi(token);
      setLoading(false);
      if (res) {
        setFirstName(res.firstName);
        setLastName(res.lastName);
        setEmail(res.email);
        setPhoneNumber(res.cellPhone);
        setUserData(res);
      }
    });
  };

  const handleUpdate = async () => {
    if (firstName === "") {
      setError({
        error: true,
        message: "First Name is required",
      });
      return;
    } else if (lastName === "") {
      setError({
        error: true,
        message: "Last Name is required",
      });
      return;
    } else {
      setError({
        error: false,
        message: "",
      });
      setBtnLoading(true);
      const bodyData: updateBodyType = {
        data: {
          firstName,
          lastName,
        },
      };
      getToken().then(async (token) => {
        const res = await updateProfileApi(token, bodyData);
        console.log(res);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Profile Updated Successfully",
          position: "top",
        });
        setBtnLoading(false);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[globalStyles.header, globalStyles.center_text]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.header_text}>Settings</Text>
        {/* bar icon */}
        <FontAwesome5
          name="bars"
          size={15}
          color="white"
          onPress={() => navigation.openDrawer()}
        />
      </View>
      {loading ? (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <>
          <View style={styles.flex_center}>
            <Image
              source={require("../../assets/user_icon.png")}
              style={[globalStyles.user_icon, styles.mt_40]}
            />
            <Text style={styles.welcome_text}>
              Welcome {userData.firstName} {userData.lastName}
            </Text>
            {inputsData.map((inputData, index) => (
              <Input
                key={index}
                placeholder={inputData.placeholder}
                onChangeText={inputData.onChangeText}
                style={inputData.style}
                value={inputData.value}
                keyboardType={inputData.keyboardType}
                editable={inputData.editable}
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
              title="Update"
              onPress={handleUpdate}
              disable={btnLoading}
            />
          </View>
          <View
            style={[
              globalStyles.bottom_container,
              {
                backgroundColor: "#000",
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("ChangePassword")}
            >
              <Text style={styles.change_password}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: 358,
    marginTop: 13,
    height: 60,
    alignItems: "center",
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
  change_password: {
    fontSize: 16,
    color: "#fff",
    fontFamily: Typography.regular,
    fontWeight: "400",
  },
  header_text: {
    color: "white",
    fontSize: 28,
    fontFamily: Typography.JosefinSansRegular,
  },
  mt_40: {
    marginTop: 40,
  },
  welcome_text: {
    color: "#fff",
    marginTop: 20,
    fontSize: 14,
    fontFamily: Typography.regular,
  },
  flex_center: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  loading_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
