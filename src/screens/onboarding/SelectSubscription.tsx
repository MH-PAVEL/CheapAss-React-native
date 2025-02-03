import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "../../theme/Theme";
import { Typography } from "../../theme/Typography";
import Button from "../../components/Button";
import { globalStyles } from "../../styles/globalStyles";
import { subscriptionData } from "../../utils/data/SubscriptionData";
import { paymentAPi } from "../../network/api";
import { useStripe } from "@stripe/stripe-react-native";
import Toast from "react-native-toast-message";
import { getToken } from "../../utils/token";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SelectSubscription() {
  const navigation = useNavigation();
  const route: any = useRoute();
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);

  const packages = ["BASIC", "STANDARD", "PREMIUM"];
  const months = ["", "3", "6"];
  const name = route.params?.name;
  const isBack = route.params?.isBack;
  const isClose = route.params?.isClose;
  const stripe: any = useStripe();
  const isFocused = useIsFocused();

  const handlePay = async () => {
    setLoading(true);
    const bodyData: PaymentBodyType = {
      package: packages[selected],
    };
    getToken().then(async (token) => {
      const res = await paymentAPi(token, bodyData);
      setLoading(false);
      console.log(res);
      if (res.error === true) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: res?.message,
        });
        return;
      }
      if (res.secret) {
        const clientSecret = res.secret;
        const initSheet = await stripe.initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          googlePay: true,
          merchantDisplayName: "Merchant Name",
        });
        if (initSheet.error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: initSheet?.error?.message,
          });
          return;
        }
        const presentSheet = await stripe.presentPaymentSheet({
          clientSecret,
        });
        console.log(
          "🚀 ~ file: SelectSubscription.tsx ~ line 68 ~ handlePay ~ presentSheet",
          presentSheet
        );

        if (presentSheet.error) {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: presentSheet?.error?.localizedMessage,
          });
          return;
        }
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Payment Successfull",
        });
        await AsyncStorage.removeItem("isPremium");
        navigation.navigate(
          "MySubscription" as never,
          {
            data: subscriptionData[selected],
            name: name,
            goBack: true,
          } as never
        );
      }
    });
  };

  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [isFocused]);

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={globalStyles.header}>
          {isBack ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
          <Image
            source={require("../../../assets/user_icon.png")}
            style={globalStyles.user_icon}
          />
          {isClose ? (
            <TouchableOpacity
              onPress={() => navigation.navigate("DrawerNavigation" as never)}
            >
              <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
        </View>
        <View style={styles.container}>
          <Text style={styles.create_text}>
            Thank you
            {"\n"}
            for Sign in
          </Text>
          <Text style={styles.description_Text}>
            We’re so excited to welcome you.
          </Text>
          <Text
            style={[
              styles.description_Text,
              {
                marginBottom: 13,
              },
            ]}
          >
            Choose your plan
          </Text>
          <View>
            {subscriptionData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelected(index)}
                style={[
                  styles.card_container,
                  {
                    borderWidth: selected === index ? 1 : 0,
                    borderColor: "#fff",
                  },
                ]}
              >
                <Text style={styles.price_text}>
                  {item.price}
                  <Text style={styles.month_text}>{months[index]}Month</Text>
                </Text>
                {item.benefits.map((benefit, index) => (
                  <View key={index} style={globalStyles.benefit_container}>
                    <View style={globalStyles.circle} />
                    <Text style={globalStyles.benefit_text}>{benefit}</Text>
                  </View>
                ))}
              </TouchableOpacity>
            ))}
          </View>
          <Button
            style={styles.btn}
            textStyles={{
              color: "white",
            }}
            title="PAY NOW"
            onPress={handlePay}
            disable={loading}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  create_text: {
    fontSize: 20,
    fontFamily: Typography.JosefinSansRegular,
    color: "white",
    marginTop: 30,
    marginBottom: 13,
    lineHeight: 30,
  },
  description_Text: {
    fontSize: 14,
    color: "white",
    fontFamily: Typography.regular,
    marginBottom: 22,
  },
  card_container: {
    width: 358,
    backgroundColor: "#212121",
    borderRadius: 5,
    marginBottom: 5,
    padding: 28,
  },
  price_text: {
    fontSize: 32,
    fontFamily: Typography.JosefinSansRegular,
    color: "white",
    marginBottom: 16,
    fontWeight: "400",
  },

  btn: {
    marginTop: 25,
    width: 296,
    marginBottom: 24,
  },
  month_text: {
    fontSize: 20,
    color: "#fff",
    fontFamily: Typography.JosefinSansRegular,
    fontWeight: "300",
  },
});
