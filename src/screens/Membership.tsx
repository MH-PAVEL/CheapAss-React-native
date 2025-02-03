import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function Membership() {
  const navigation: any = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={globalStyles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
            }}
          >
            Membership
          </Text>
          {/* bar icon */}
          <FontAwesome5
            name="bars"
            size={24}
            color="white"
            onPress={() => navigation.openDrawer()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
