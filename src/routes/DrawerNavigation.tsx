import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Home from "../screens/Home";
import { Feather } from "@expo/vector-icons";
import { Typography } from "../theme/Typography";
import { SCREEN_WIDTH } from "../theme/Theme";
import Setting from "../screens/Setting";
import Membership from "../screens/Membership";
import MyListing from "../screens/MyListing";
import MySubscription from "../screens/onboarding/MySubscription";
import SignOut from "../screens/SignOut";
import { getNameFromLocal } from "../utils/profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Colors } from "../theme/Colors";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [isGuest, setIsGuest] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getName();
    fetchGuest();
  }, [isFocused]);

  const getName = async () => {
    const name = await getNameFromLocal();
    setName(name);
  };
  const fetchGuest = async () => {
    const isGuest = await AsyncStorage.getItem("isGuest");
    console.log("isguest", isGuest);
    if (isGuest == "true") setIsGuest(true);
    else setIsGuest(false);
  };

  console.log("is guest state", isGuest);
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#212121",
        },
        drawerItemStyle: {
          borderRadius: 0,
          paddingVertical: 0,
          marginVertical: 0,
        },

        drawerPosition: "right",
        drawerActiveBackgroundColor: "#212121",
      }}
      // header component
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{
              flex: 1,
            }}
          >
            <View>
              <View style={styles.header}>
                <Feather
                  name="x"
                  size={16}
                  color="white"
                  onPress={() => props.navigation.closeDrawer()}
                />
              </View>
              <View style={{ paddingLeft: 16 }}>
                <Text style={styles.h1}>My Account</Text>
                <View
                  style={[
                    styles.label_container,
                    {
                      marginBottom: 34,
                    },
                  ]}
                >
                  <Image
                    source={require("../../assets/user_icon.png")}
                    style={styles.user_icon}
                  />
                  <Text
                    style={[
                      styles.label,
                      {
                        fontSize: 16,
                        width: "60%",
                        lineHeight: 26,
                      },
                    ]}
                  >
                    {isGuest ? "Guest" : name}
                  </Text>
                </View>
              </View>
            </View>
            <DrawerItemList {...props} />
            {/* bottom container */}
            <View style={styles.bottom_container}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Privacy")}
              >
                <Text
                  style={[
                    styles.label,
                    {
                      marginBottom: 13,
                    },
                  ]}
                >
                  Privacy Policy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Terms")}
              >
                <Text style={styles.label}>Terms & Conditions</Text>
              </TouchableOpacity>
              {isGuest && (
                <React.Fragment>
                  <Button
                    title="LOG IN"
                    style={{
                      width: 114,
                      height: 40,
                      marginVertical: 10,
                    }}
                    textStyles={{
                      fontFamily: Typography.regular,
                      fontSize: 13,
                      fontWeight: "400",
                    }}
                    onPress={async () => {
                      navigation.navigate(
                        "Login" as never,
                        {
                          isBack: true,
                        } as never
                      );
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.register_text_area}>
                      Don’t have an account?
                    </Text>
                    <TouchableOpacity
                      onPress={async () => {
                        navigation.navigate(
                          "Register" as never,
                          {
                            isBack: true,
                          } as never
                        );
                      }}
                    >
                      <Text style={styles.register_text}> Register Now</Text>
                    </TouchableOpacity>
                  </View>
                </React.Fragment>
              )}
            </View>
          </DrawerContentScrollView>
        );
      }}
      // black background
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: () => (
            <>
              <View style={styles.label_container}>
                <Feather
                  name="home"
                  size={24}
                  color="white"
                  style={styles.label_icon}
                />
                <Text style={styles.label}>Home</Text>
              </View>
              {isGuest ? <></> : <View style={styles.border_bottom}></View>}
            </>
          ),
        }}
      />
      {!isGuest && (
        <React.Fragment>
          <Drawer.Screen
            name="MyListing"
            component={MyListing}
            options={{
              drawerLabel: () => (
                <>
                  <View style={[styles.label_container]}>
                    <Image
                      source={{
                        uri: "https://i.ibb.co/bNPmChs/image.png",
                      }}
                      style={styles.label_icon}
                    />
                    <Text style={styles.label}>My Listing</Text>
                  </View>
                  <View style={styles.border_bottom}></View>
                </>
              ),
            }}
          />
          <Drawer.Screen
            name="Membership"
            component={MySubscription}
            options={{
              drawerLabel: () => (
                <>
                  <View style={styles.label_container}>
                    <Image
                      source={{
                        uri: "https://i.ibb.co/pvnYNJY/image.png",
                      }}
                      style={styles.label_icon}
                    />
                    <Text style={styles.label}>Membership</Text>
                  </View>
                  <View style={styles.border_bottom}></View>
                </>
              ),
            }}
          />
          <Drawer.Screen
            name="Setting"
            component={Setting}
            options={{
              drawerLabel: () => (
                <>
                  <View style={styles.label_container}>
                    <Image
                      source={{
                        uri: "https://i.ibb.co/3cvK85S/image.png",
                      }}
                      style={styles.label_icon}
                    />
                    <Text style={styles.label}>Setting</Text>
                  </View>
                  <View style={styles.border_bottom}></View>
                </>
              ),
            }}
          />
          <Drawer.Screen
            name="Sign Out"
            component={SignOut}
            options={{
              drawerLabel: () => (
                <View style={styles.label_container}>
                  <Image
                    source={{
                      uri: "https://i.ibb.co/rtq2Qmg/image.png",
                    }}
                    style={styles.label_icon}
                  />
                  <Text style={styles.label}>Sign Out</Text>
                </View>
              ),
            }}
          />
        </React.Fragment>
      )}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 36,
    paddingTop: 24,
  },
  h1: {
    color: "white",
    fontSize: 28,
    fontWeight: "400",
    fontFamily: Typography.JosefinSansRegular,
    marginBottom: 18,
    marginTop: 16,
  },
  label_icon: {
    width: 26,
    height: 26,
    marginRight: 16,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "JosefinSansRegular",
    fontWeight: "400",
    margin: 0,
    padding: 0,
  },
  label_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  user_icon: {
    width: 90,
    height: 90,
    marginRight: 16,
  },
  border_bottom: {
    width: SCREEN_WIDTH - 32,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    marginTop: 24,
  },
  bottom_container: {
    position: "absolute",
    bottom: 40,
    left: 22,
  },
  register_text_area: {
    color: "white",
    fontSize: 14,
    fontFamily: Typography.regular,
    alignItems: "center",
  },
  register_text: {
    color: Colors.primary,
    fontSize: 14,
    fontFamily: Typography.regular,
  },
});
