import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/globalStyles";
import { SCREEN_WIDTH } from "../../theme/Theme";
import { Typography } from "../../theme/Typography";
import { getNameFromLocal } from "../../utils/profile";
import {
  cancelSubscriptionApi,
  getProfileApi,
  logoutApi,
} from "../../network/api";
import { getToken } from "../../utils/token";
import { subscriptionData } from "../../utils/data/SubscriptionData";
import { Colors } from "../../theme/Colors";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MySubscription() {
  const navigation = useNavigation();
  const route: any = useRoute();
  const data = route?.params?.data;
  const name = route?.params?.name;
  const goBack = route?.params?.goBack;
  const [localName, setLocalName] = useState(name);
  let benefits = ["Allowed to post addresses.", "Allow to edit and see notes."];
  const packages = ["BASIC", "STANDARD", "PREMIUM"];
  const [index, setIndex] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getName();
    getProfile();
    checkPremium();
  }, []);

  const [isPremium, setIsPremium] = useState(false);

  const checkPremium = async () => {
    const isPremium = await AsyncStorage.getItem("isPremium");
    console.log(isPremium);
    if (isPremium == "false") {
      navigation.navigate(
        "SelectSubscription" as never,
        {
          isBack: false,
          name: localName,
        } as never
      );
    } else setIsPremium(false);
  };

  const getName = async () => {
    const name = await getNameFromLocal();
    setLocalName(name);
  };

  const getProfile = async () => {
    getToken().then(async (token) => {
      const res = await getProfileApi(token);
      //  check packages
      if (res.error === true) {
        return;
      }
      console.log(res.subscription);
      if (res?.subscription) {
        const index = packages.indexOf(res?.subscription?.name);
        setIndex(index);
      }
    });
  };

  useEffect(() => {
    // disable back button
    const backAction = () => {
      //  disabled
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [isFocused]);

  const handleCancel = () => {
    setShowCancelModal(false);
    getToken().then(async (token) => {
      const res = await cancelSubscriptionApi(
        { package: packages[index] },
        token
      );
      if (res.error) {
        Toast.show({
          text1: "Error",
          text2: res.message,
          type: "error",
        });
      } else {
        Toast.show({
          text1: "Success",
          text2: "Subscription cancelled successfully.",
          type: "success",
          visibilityTime: 2000,
          autoHide: true,
          onHide: async () => {
            const res = await logoutApi(token);
            await AsyncStorage.clear();
            navigation.navigate("SplshScreen2" as never);
          },
        });
      }
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={globalStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Image
          source={require("../../../assets/user_icon.png")}
          style={globalStyles.user_icon}
        />
        <View></View>
      </View>
      <View style={styles.container}>
        <Text style={styles.name_text}>{name ? name : localName}</Text>
        <Text style={styles.success_text}>Successful</Text>
        <Text style={styles.description_text}>
          My Current plan is{" "}
          {data?.price ? data?.price : subscriptionData[index].price} per
          monthly.
        </Text>
        <View style={styles.card}>
          <Text style={styles.price_text}>
            {data?.price ? data?.price : subscriptionData[index].price}
            <Text style={styles.month_text}>Monthly</Text>
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={[
            styles.description_text,
            {
              marginLeft: 46,
              marginBottom: 9,
            },
          ]}
        >
          Benefits are:
        </Text>
        {benefits.map((benefit: string, index: number) => (
          <View
            key={index}
            style={[
              globalStyles.benefit_container,
              {
                marginLeft: 36,
              },
            ]}
          >
            <View style={globalStyles.circle} />
            <Text style={globalStyles.benefit_text}>{benefit}</Text>
          </View>
        ))}
      </View>
      {/* bottom */}
      <View style={styles.bottom_container}>
        <TouchableOpacity
          onPress={
            goBack
              ? () => navigation.navigate("DrawerNavigation" as never)
              : () => navigation.goBack()
          }
        >
          <Text
            style={[
              styles.cancel_text,
              {
                textDecorationLine: "underline",
              },
            ]}
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowCancelModal(true)}>
          <Text style={styles.cancel_text}>Cancel Subscription</Text>
        </TouchableOpacity>
      </View>
      {
        <Modal visible={showCancelModal} animationType="fade">
          <View style={globalStyles.centeredView}>
            <View style={[globalStyles.modalView]}>
              <View>
                <TouchableOpacity
                  style={styles.header}
                  onPress={() => setShowCancelModal(false)}
                >
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View>
                <Text>Are you sure you want to cancel your subscription?</Text>
              </View>
              <View style={globalStyles.btn_container}>
                <TouchableOpacity
                  style={globalStyles.no_btn}
                  onPress={() => setShowCancelModal(false)}
                >
                  <Text
                    style={{
                      color: Colors.primary,
                      fontSize: 14,
                    }}
                  >
                    No
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={globalStyles.yes_btn}
                  onPress={() => handleCancel()}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                    }}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  name_text: {
    fontSize: 16,
    color: "#fff",
    fontFamily: Typography.regular,
    marginTop: 10,
    marginBottom: 32,
    textAlign: "center",
  },
  success_text: {
    fontSize: 28,
    color: "#fff",
    fontFamily: Typography.JosefinSansRegular,
    marginBottom: 15,
    fontWeight: "400",
  },
  description_text: {
    fontWeight: "400",
    fontSize: 14,
    color: "#fff",
    fontFamily: Typography.regular,
  },
  card: {
    backgroundColor: "#212121",
    width: SCREEN_WIDTH - 72,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    marginTop: 30,
    borderRadius: 5,
    marginBottom: 30,
  },
  price_text: {
    fontSize: 32,
    color: "#fff",
    fontFamily: Typography.JosefinSansRegular,
    fontWeight: "400",
  },
  month_text: {
    fontSize: 20,
    color: "#fff",
    fontFamily: Typography.JosefinSansRegular,
    fontWeight: "300",
  },
  cancel_text: {
    fontSize: 16,
    color: "#fff",
    fontFamily: Typography.regular,
    fontWeight: "400",
  },
  bottom_container: {
    flexDirection: "row",
    width: SCREEN_WIDTH - 72,
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 36,
  },
  header: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 8,
    width: SCREEN_WIDTH - 32,
  },
});
