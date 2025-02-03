import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Animated,
  Easing,
  Platform,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Typography } from "../theme/Typography";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/globalStyles";
import { Feather, Ionicons } from "@expo/vector-icons";
import { SCREEN_WIDTH } from "../theme/Theme";
import Input from "../components/Input";
import Button from "../components/Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { getToken } from "../utils/token";
import { createPostsApi, updatePostsApi } from "../network/api";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function PostAdress() {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const title = route?.params?.title;
  const item = route?.params?.item;
  const update = route?.params?.update;
  const splitAddress = item?.location?.split("#");

  useEffect(() => {
    if (item?.tipPercentage && item?.tipPercentage.includes("other")) {
      setTip("Other");
      setOtherText(item?.tipPercentage?.split(":")[1]);
    } else {
      setTip(item?.tipPercentage || "");
    }
  }, [item]);

  const [selectedDate, setSelectedDate] = useState<any>(
    item?.deliveryDate && new Date(item?.deliveryDate)
  );
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const pickerBottom = useRef(new Animated.Value(-900)).current;
  const [tip, setTip] = useState<any>(item?.tipPercentage);
  const [platfrom, setPlatform] = useState<string>(item?.platform || "");
  const [address, setAddress] = useState<string>(
    (item?.location && splitAddress[0]) || ""
  );
  const [apt, setApt] = useState<string>(
    (item?.location && splitAddress[1]) || ""
  );
  const [startTip, setStartTip] = useState<string>(
    item?.tipPromised?.toString() || ""
  );
  const [endTip, setEndTip] = useState<string>(
    item?.tipReceived.toString() || ""
  );
  const [initialNote, setInitialNote] = useState<string>(
    item?.initialNote || ""
  );
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [otherText, setOtherText] = useState<string>("");

  const TipData = [
    "No Tip",
    "10% Tip",
    "30% Tip",
    "50% Tip",
    "80% Tip",
    "Other",
  ];

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: any) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  useEffect(() => {
    Animated.timing(pickerBottom, {
      toValue: showTip ? 0 : -300,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [showTip]);

  const handleSubmit = async () => {
    if (!selectedDate) {
      setError({
        error: true,
        message: "Date is required",
      });
      return;
    } else if (address === "") {
      setError({
        error: true,
        message: "Address is required",
      });
      return;
    } else if (platfrom === "") {
      setError({
        error: true,
        message: "Platform is required",
      });
      return;
    } else if (tip === "") {
      setError({
        error: true,
        message: "Tip is required",
      });
      return;
    } else if (tip !== "No Tip" && startTip === "") {
      setError({
        error: true,
        message: "Start tip is required",
      });
      return;
    } else if (tip !== "No Tip" && endTip === "") {
      setError({
        error: true,
        message: "End tip is required",
      });
      return;
    } else if (initialNote === "") {
      setError({
        error: true,
        message: "note is required",
      });
      return;
    }
    const data = {
      deliveryDate: selectedDate,
      location: address + "#" + apt,
      platform: platfrom,
      tipPercentage: tip === "Other" ? `other:${otherText}` : tip,
      tipPromised: startTip ? parseInt(startTip) : 0,
      tipReceived: endTip ? parseInt(endTip) : 0,
      initialNote: initialNote,
    };
    setLoading(true);
    getToken().then(async (token) => {
      if (update) {
        const res = await updatePostsApi(item?.id, data, token);
        if (res.error) {
          setError({
            error: true,
            message: res.message,
          });
          setLoading(false);
        } else {
          setLoading(false);
          Toast.show({
            text1: "Success",
            text2: "Post created successfully",
            type: "success",
          });
          navigation.navigate("DrawerNavigation");
        }
      } else {
        const res = await createPostsApi(data, token);
        if (res.error) {
          setError({
            error: true,
            message: res.message,
          });
          setLoading(false);
        } else {
          setLoading(false);
          Toast.show({
            text1: "Success",
            text2: "Post created successfully",
            type: "success",
          });
          navigation.navigate("DrawerNavigation");
        }
      }
    });
  };

  console.log("tip", tip);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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
              fontWeight: "400",
            }}
          >
            {title}
          </Text>
          <View></View>
        </View>
        <View
          style={{
            width: SCREEN_WIDTH,
            alignItems: "center",
          }}
        >
          <View style={styles.description_container}>
            <Text style={styles.description}>
              Post address only. Please do not list name of any individuals.
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 36,
          }}
        >
          <TouchableOpacity
            style={[
              globalStyles.input_container,
              {
                width: 240,
                height: 50,
              },
            ]}
            onPress={showDatePicker}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              {selectedDate
                ? selectedDate?.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Select Date"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            date={selectedDate}
            isVisible={datePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            textColor={"black"}
          />
          <View
            style={{
              flexDirection: "row",
              width: SCREEN_WIDTH - 72,
            }}
          >
            <Input
              placeholder="Address"
              style={styles.address_input}
              input_style={{
                fontSize: 15,
                borderRadius: 60,
              }}
              onChangeText={(text: string) => setAddress(text)}
              value={address}
            />
            <Input
              placeholder="Apt#"
              style={styles.apt_input}
              input_style={{
                fontSize: 15,
                borderRadius: 60,
              }}
              onChangeText={(text: string) => setApt(text)}
              value={apt}
            />
          </View>
          <Input
            placeholder="Platfrom (Dominos, Pizza Hut, Door dash, Uber, GH, etc)"
            style={{ marginTop: 20, height: 50 }}
            onChangeText={(text: string) => setPlatform(text)}
            value={platfrom}
          />
          {Platform.OS === "ios" ? (
            <Input
              placeholder={tip ? `${tip}` : "Select Tip"}
              style={{ marginTop: 20, height: 50 }}
              editable={false}
              handlePress={() => setShowTip(!showTip)}
              input_style={{
                width: "90%",
              }}
              forgetPassword={true}
              forgetPasswordComponent={
                <Feather
                  name="chevron-down"
                  size={24}
                  color="white"
                  onPress={() => setShowTip(!showTip)}
                />
              }
            />
          ) : (
            Platform.OS === "android" && (
              <View style={styles.picker_android}>
                <Picker
                  placeholder={"Select Tip"}
                  onValueChange={(itemValue: string, itemIndex) =>
                    setTip(itemValue)
                  }
                  selectedValue={tip}
                  style={{
                    color: "white",
                    fontSize: 14,
                  }}
                  // change color icon
                  dropdownIconColor="white"
                >
                  <Picker.Item
                    color="black"
                    label={"Select Tip"}
                    value={""}
                    style={{
                      fontSize: 14,
                    }}
                    // disable this item
                  />
                  {TipData.map((item, index) => {
                    return (
                      <Picker.Item
                        color="black"
                        label={item}
                        value={item}
                        key={index}
                        style={{
                          fontSize: 14,
                        }}
                      />
                    );
                  })}
                </Picker>
              </View>
            )
          )}
          <View>
            {tip === "Other" && (
              <Input
                placeholder="Enter Tip"
                style={{ marginTop: 20, height: 50 }}
                onChangeText={(text: string) => setOtherText(text)}
                value={otherText}
              />
            )}
          </View>
          {tip !== "No Tip" && (
            <View style={styles.tip_input_container}>
              <View>
                <Text style={styles.label}>Tip</Text>
                <Input
                  placeholder="$"
                  keyboardType={"numeric"}
                  style={{
                    width: SCREEN_WIDTH / 2 - 36,
                    marginRight: 10,
                    height: 50,
                  }}
                  onChangeText={(text) => setStartTip(text)}
                  value={startTip}
                />
              </View>
              <View>
                <Text style={styles.label}>End Tip</Text>
                <Input
                  placeholder="$"
                  keyboardType={"numeric"}
                  style={{
                    width: SCREEN_WIDTH / 2 - 36,
                    height: 50,
                  }}
                  onChangeText={(text) => setEndTip(text)}
                  value={endTip}
                />
              </View>
            </View>
          )}
          <TextInput
            style={styles.notes_container}
            placeholder="Add note..."
            placeholderTextColor="#fff"
            multiline={true}
            onChangeText={(text) => setInitialNote(text)}
            value={initialNote}
          ></TextInput>
          {error.error && (
            <Text
              style={{
                color: "red",
                fontSize: 16,
                marginTop: 10,
              }}
            >
              {error.message}
            </Text>
          )}
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Button
              onPress={handleSubmit}
              title={update ? "UPDATE" : "SUBMIT"}
              style={{ marginTop: 20, width: 258 }}
              disable={loading}
            />
          </View>
        </View>
        <View style={{ marginBottom: 40 }}></View>
      </ScrollView>
      <Animated.View style={[{ bottom: pickerBottom }, styles.pickerWrapper]}>
        <View style={styles.pickerHeader}>
          <TouchableOpacity onPress={() => setShowTip(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowTip(false)}>
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
        <Picker
          selectedValue={tip}
          onValueChange={(itemValue, itemIndex) => {
            setTip(itemValue);
          }}
        >
          {TipData.map((height, index) => {
            return <Picker.Item label={height} value={height} key={index} />;
          })}
        </Picker>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  description: {
    fontWeight: "300",
    color: "#fff",
    fontSize: 14,
    fontFamily: Typography.regular,
    width: 262,
    textAlign: "center",
  },
  description_container: {
    width: SCREEN_WIDTH - 72,
    backgroundColor: "#212121",
    borderRadius: 100,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 34,
  },
  apt_input: {
    marginTop: 20,
    width: "30%",
    height: 50,
    borderRadius: 30,
  },
  address_input: {
    marginTop: 20,
    width: "70%",
    marginRight: 10,
    height: 50,
  },
  label: {
    fontWeight: "600",
    fontFamily: Typography.bold,
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  tip_input_container: {
    flexDirection: "row",
    width: SCREEN_WIDTH - 72,
    marginTop: 20,
    justifyContent: "space-between",
  },
  notes_container: {
    width: SCREEN_WIDTH - 72,
    height: 185,
    backgroundColor: "#212121",
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    color: "#fff",
    fontSize: 16,
    textAlignVertical: "top",
  },
  pickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 15,
    borderBottomColor: "rgb(235,235,235)",
    paddingBottom: 10,
    borderBottomWidth: 1.1,
  },
  pickerWrapper: {
    position: "absolute",
    height: 300,
    width: "100%",
    zIndex: 2,
    backgroundColor: "#f5f5f5",
    borderColor: "rgb(235,235,235)",
    borderWidth: 1.1,
    borderRadius: 10,
  },
  picker_android: {
    width: SCREEN_WIDTH - 72,
    backgroundColor: "#212121",
    borderRadius: 60,
    marginTop: 20,
  },
});
