import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshTokenApi } from "../network/api";

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("accessToken");
    const time = await AsyncStorage.getItem("accessTokenTime");
    // if token time is 1 hour then remove token
    if (time) {
      const tokenTime = new Date(time);
      const currentTime = new Date();
      const diff = currentTime.getTime() - tokenTime.getTime();
      const diffInHours = diff / (1000 * 3600);
      const diffinMinutes = diff / (1000 * 60);
      console.log("diffin minutes", diffinMinutes);
      if (diffinMinutes >= 5) {
        console.log("token expired");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        console.log(refreshToken);
        if (refreshToken) {
          const res = await refreshTokenApi(refreshToken);
          if (res.accessToken) {
            await AsyncStorage.removeItem("accessToken");
            await AsyncStorage.removeItem("accessTokenTime");
            await AsyncStorage.setItem("accessToken", res.accessToken);
            await AsyncStorage.setItem(
              "accessTokenTime",
              new Date().toString()
            );
            return res.accessToken;
          }
        }
      } else {
        console.log("token not expired");
        if (value !== null) return value;
      }
    }
  } catch (err) {
    console.error({ err });
  }
};

export const setToken = async (type: string, token: string) => {
  try {
    await AsyncStorage.setItem(type, token);
    // set token time
    await AsyncStorage.setItem(`${type}Time`, new Date().toString());
  } catch (err) {
    console.error({ err });
  }
};
