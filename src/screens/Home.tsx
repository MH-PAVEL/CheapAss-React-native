import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Typography } from "../theme/Typography";
import Button from "../components/Button";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, FontAwesome5, Feather } from "@expo/vector-icons";
import Input from "../components/Input";
import { SCREEN_WIDTH } from "../theme/Theme";
import { getAllPostsApi, guestPostsApi, LocationApi } from "../network/api";
import { getToken } from "../utils/token";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const navigation: any = useNavigation();
  const [posts, setPosts] = useState([]);
  const [noPosts, setNoPosts] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [places, setPlaces] = useState([]);
  const [placeStatus, setPlaceStatus] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchPosts();
      fetchGuestMode();
      checkPremium();
      setSearchStatus(false);
      setSearchText("");
    }
  }, [isFocused]);

  const fetchGuestMode = async () => {
    const isGuest = await AsyncStorage.getItem("isGuest");
    if (isGuest == "true") setIsGuest(true);
    else setIsGuest(false);
  };
  const checkPremium = async () => {
    const isPremium = await AsyncStorage.getItem("isPremium");
    if (isPremium == "false") setIsPremium(true);
    else setIsPremium(false);
  };

  const fetchPosts = async () => {
    setLoading(true);
    getToken().then(async (token) => {
      const guest = await AsyncStorage.getItem("isGuest");
      let res;
      if (guest == "true") {
        res = await guestPostsApi(token);
      } else {
        res = await getAllPostsApi(token);
      }
      setLoading(false);
      if (res.posts) {
        if (res.posts.length === 0) setNoPosts(true);
        else {
          setSearchResults(res.posts);
          setPosts(res.posts);
          setNoPosts(false);
        }
      }
    });
  };

  const handleSearch = async (text: string) => {
    setSearchLoading(true);
    setSearchText(text);
    setPlaceStatus(true);
    const res = await LocationApi(text);
    console.log("text", text);
    if (text !== "") {
      setSearchLoading(false);
      if (res.results && res.results.length > 0) setPlaces(res.results);
    } else {
      setSearchLoading(false);
      setPlaceStatus(false);
    }
  };

  const hadleSubmitSearch = () => {
    if (searchText !== "") {
      setSearchStatus(true);
      setPlaceStatus(false);
      const results = posts.filter((post: any) =>
        post.location
          .split("#")[0]
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
      if (results.length === 0) setNoPosts(true);
      else {
        setSearchResults(results);
        setNoPosts(false);
      }
    } else {
      setSearchStatus(false);
      setSearchResults(posts);
      setNoPosts(false);
    }
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
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={[
          globalStyles.header,
          {
            paddingTop: 16,
          },
        ]}
      >
        <View></View>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
           <Ionicons name="chevron-back" size={24} color="white" /> 
        </TouchableOpacity> */}

        {/* bar icon */}
        <FontAwesome5
          name="bars"
          size={24}
          color="white"
          onPress={() => navigation.openDrawer()}
        />
      </View>

      <View style={{ width: SCREEN_WIDTH, alignItems: "center" }}>
        <Input
          placeholder="Search"
          style={{
            width: 358,
            marginTop: 30,
            height: 60,
          }}
          returnKeyLabel="search"
          returnKeyType="search"
          autoCapitalize="none"
          onChangeText={(text) => handleSearch(text)}
          value={searchText}
          search={true}
          onSubmitEditing={hadleSubmitSearch}
          searchComponent={
            <Feather
              name="search"
              size={15}
              color="white"
              style={{
                marginRight: 18,
              }}
            />
          }
        />
        {placeStatus && (
          <View style={styles.auto_complete_area}>
            {searchLoading ? (
              <View>
                <ActivityIndicator size="small" color={"black"} />
              </View>
            ) : (
              places.map((place: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSearchText(place);
                    setPlaceStatus(false);
                  }}
                >
                  <Text style={styles.auto_complete_text}>{place}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
      </View>
      <ScrollView
        style={{
          zIndex: placeStatus ? -1 : 0,
        }}
      >
        <View
          style={{
            paddingHorizontal: 36,
            zIndex: -1,
          }}
        >
          {searchStatus && (
            <View>
              <Text style={styles.search_by_address}>
                Search by Address ({searchText})
              </Text>

              <Text style={styles.cheapass_results}>CheapAss Results</Text>
              <View style={styles.cheapass_results_container}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "400",
                    color: "white",
                  }}
                >
                  {searchText}
                </Text>
              </View>
            </View>
          )}
          <View>
            {noPosts ? (
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "300",
                  marginTop: 34,
                }}
              >
                No posts yet
              </Text>
            ) : (
              <View style={{ marginTop: 16 }}>
                {loading ? (
                  <>
                    <ActivityIndicator size="large" color="#fff" />
                  </>
                ) : (
                  <View
                    style={{
                      zIndex: -1,
                    }}
                  >
                    {searchResults.map((result: any, index) => (
                      <View key={index}>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 13,
                            fontWeight: "300",
                            fontFamily: Typography.regular,
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
                            fontFamily: Typography.regular,
                          }}
                        >
                          Notes:{" "}
                          {isGuest
                            ? "  Restricted to members only"
                            : result.initialNote}
                        </Text>
                        <View style={globalStyles.border_bottom} />
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
        <View style={{ marginBottom: 50 }} />
      </ScrollView>
      <View
        style={[
          globalStyles.bottom_container,
          {
            alignItems: isGuest || isPremium ? "center" : "flex-end",
            height: isGuest ? 100 : 80,
          },
        ]}
      >
        {isGuest ? (
          <>
            <Button
              title="LOG IN"
              style={{
                width: 114,
                height: 40,
                marginBottom: 10,
              }}
              textStyles={{
                fontFamily: Typography.regular,
                fontSize: 13,
                fontWeight: "400",
              }}
              onPress={async () => {
                navigation.navigate("SplshScreen2");
              }}
            />
            <Text style={styles.restricted_text}>
              Additional info restricted to Member Only
            </Text>
          </>
        ) : isPremium ? (
          <Text style={styles.restricted_text}>
            Additional info restricted to Member Only
          </Text>
        ) : (
          <Button
            title="POST ADDRESS"
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
  },

  tip: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
    fontFamily: Typography.bold,
    marginVertical: 5,
  },
  restricted_text: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "300",
  },
  search_by_address: {
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
    marginTop: 18,
    fontWeight: "300",
  },
  auto_complete_area: {
    width: 358,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: "absolute",
    top: 90,
    zIndex: 100,
  },
  auto_complete_text: {
    fontSize: 13,
    fontWeight: "400",
    color: "#000",

    paddingVertical: 8,
  },
});
