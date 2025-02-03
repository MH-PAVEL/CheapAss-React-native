import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/globalStyles";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Typography } from "../theme/Typography";
import { SCREEN_WIDTH } from "../theme/Theme";
import Button from "../components/Button";
import { getToken } from "../utils/token";
import { myListingApi } from "../network/api";
import moment from "moment";
import { Colors } from "../theme/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyListing() {
  const navigation: any = useNavigation();
  const [myListings, setMyListings] = useState([]);
  const [noPosts, setNoPosts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getProfile();
    }
  }, [isFocused]);
  const getProfile = async () => {
    setLoading(true);
    const isPremium = await AsyncStorage.getItem("isPremium");

    if (isPremium) {
      setIsPremium(false);
      setLoading(false);
      setNoPosts(true);
    } else {
      setIsPremium(true);
      getToken().then(async (token) => {
        const res = await myListingApi(token);
        setLoading(false);
        if (res.posts.length == 0) {
          setNoPosts(true);
        } else {
          setNoPosts(false);
          setMyListings(res.posts);
        }
      });
    }
  };

  const handleDelete = async (id: string) => {
    console.log("delete", id);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={[
          globalStyles.header,
          {
            alignItems: "center",
          },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            fontSize: 28,
            fontFamily: Typography.JosefinSansRegular,
          }}
        >
          My Listing
        </Text>
        {/* bar icon */}
        <FontAwesome5
          name="bars"
          size={15}
          color="white"
          onPress={() => navigation.openDrawer()}
        />
      </View>
      <ScrollView
        style={{
          paddingHorizontal: 36,
        }}
      >
        {loading ? (
          <View
            style={{
              marginTop: 26,
            }}
          >
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <>
            {noPosts ? (
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "300",
                  marginTop: 34,
                  textAlign: "center",
                }}
              >
                No posts yet
              </Text>
            ) : (
              <>
                {myListings.map((result: any, index: number) => (
                  <View key={index}>
                    <View style={globalStyles.border_bottom} />
                    <View style={styles.list_item}>
                      <View
                        style={{
                          width: "50%",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 13,
                            fontWeight: "300",
                          }}
                        >
                          {moment(result.createdAt).format("MM/DD/YY")} (
                          {result.platform})
                        </Text>
                        <Text style={styles.tip}>
                          Tip: ${result.tipReceived}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 13,
                            fontWeight: "300",
                          }}
                        >
                          {result.initialNote}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <TouchableOpacity
                          style={[
                            styles.icon_container,
                            {
                              marginRight: 10,
                            },
                          ]}
                          onPress={() =>
                            navigation.navigate("PostAddress", {
                              title: "Edit Address",
                              item: result,
                              update: true,
                            })
                          }
                        >
                          <Feather name="edit-2" size={19} color="white" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            )}
          </>
        )}
        <View style={{ marginBottom: 50 }}></View>
      </ScrollView>
      {showDelete && (
        <Modal visible={showDelete} animationType="fade">
          <View style={globalStyles.centeredView}>
            <View style={[globalStyles.modalView]}>
              <View>
                <TouchableOpacity
                  style={{
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    padding: 8,
                    width: SCREEN_WIDTH - 32,
                  }}
                  onPress={() => setShowDelete(false)}
                >
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  fontWeight: "300",
                  textAlign: "center",
                }}
              >
                Are you sure you want to delete this post?
              </Text>
              <View style={globalStyles.btn_container}>
                <TouchableOpacity
                  style={globalStyles.no_btn}
                  onPress={() => setShowDelete(false)}
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
                <TouchableOpacity style={globalStyles.yes_btn}>
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
      )}
      <View
        style={[
          globalStyles.bottom_container,
          {
            alignItems: !isPremium ? "center" : "flex-end",
          },
        ]}
      >
        {isPremium ? (
          <Button
            title="ADD POST"
            style={{
              width: 114,
              height: 40,
            }}
            textStyles={{
              fontFamily: Typography.regular,
              fontSize: 13,
              fontWeight: "400",
            }}
            onPress={() =>
              navigation.navigate("PostAddress", {
                title: "Post Address",
                update: false,
              })
            }
          />
        ) : (
          <Text style={styles.restricted_text}>
            Additional info restricted to Member Only
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  cheapass_results: {
    fontSize: 20,
    fontFamily: Typography.bold,
    color: "white",
    fontWeight: "600",
    paddingTop: 24,
  },
  cheapass_results_container: {
    backgroundColor: "#CF2A27",
    borderRadius: 100,
    paddingVertical: 6.5,
    paddingHorizontal: 12,
    marginTop: 14,
    marginBottom: 20,
  },
  bottom_container: {
    position: "absolute",
    bottom: 0,
    width: SCREEN_WIDTH,
    backgroundColor: "#212121",
    alignItems: "flex-end",
    justifyContent: "center",
    height: 80,
    paddingHorizontal: 35,
  },
  tip: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
    fontFamily: Typography.bold,
    marginVertical: 5,
  },
  icon_container: {
    width: 37,
    height: 37,
    backgroundColor: "#212121",
    borderRadius: 37,
    alignItems: "center",
    justifyContent: "center",
  },
  list_item: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  restricted_text: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "300",
  },
});
