import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import DrawerNavigation from "./src/routes/DrawerNavigation";
import ChangePassword from "./src/screens/onboarding/ChangePassword";
import ForgotPassword from "./src/screens/onboarding/ForgotPassword";
import Login from "./src/screens/onboarding/Login";
import MySubscription from "./src/screens/onboarding/MySubscription";
import Register from "./src/screens/onboarding/Register";
import SelectSubscription from "./src/screens/onboarding/SelectSubscription";
import PostAdress from "./src/screens/PostAdress";
import Privacy from "./src/screens/Privacy";
import SplashScreen from "./src/screens/splashScreen/SplashScreen";
import SplshScreen2 from "./src/screens/splashScreen/SplshScreen2";
import Terms from "./src/screens/Terms";
const Stack = createStackNavigator();
import Toast from "react-native-toast-message";
import { StripeProvider } from "@stripe/stripe-react-native";
import Verification from "./src/screens/onboarding/Verification";
import { useEffect, useState } from "react";
import { paymentKeyApi } from "./src/network/api";

export default function App() {
  const [publishableKey, setPublishableKey] = useState<string>(
    "pk_test_51NDw0wJsbls8uwmAeZtr8CFzkKYMMhCrtOSDdzCfV…qmg0eBb8nUi0xCbtCUBUnhUEbj2rho7lGhBitkS00mXkKrqWX"
  );
  const [loaded] = useFonts({
    regular: require("./assets/fonts/OpenSansRegular.ttf"),
    medium: require("./assets/fonts/OpenSansMedium.ttf"),
    bold: require("./assets/fonts/OpenSansBold.ttf"),
    JosefinSansRegular: require("./assets/fonts/JosefinSansRegular.ttf"),
  });
  useEffect(() => {
    fetchPublishableKey();
  }, []);

  const fetchPublishableKey = async () => {
    const res = await paymentKeyApi();
    if (res.publicKey) {
      setPublishableKey(res.publicKey);
    }
  };

  if (!loaded) {
    return null;
  }

  const AppTheme: any = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#000",
    },
  };
  return (
    <StripeProvider publishableKey={publishableKey}>
      <NavigationContainer theme={AppTheme}>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="SplshScreen2" component={SplshScreen2} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Verification" component={Verification} />

          <Stack.Screen
            name="SelectSubscription"
            component={SelectSubscription}
          />
          <Stack.Screen name="MySubscription" component={MySubscription} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="PostAddress" component={PostAdress} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="Terms" component={Terms} />
        </Stack.Navigator>
        <StatusBar style="auto" />
        <Toast />
      </NavigationContainer>
    </StripeProvider>
  );
}
