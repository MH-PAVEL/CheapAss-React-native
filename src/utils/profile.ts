import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveProfilesLocal = async (data: any) => {
  try {
    await AsyncStorage.setItem("profiles", JSON.stringify(data));
  } catch (err) {
    console.error({ err });
  }
};
export const getProfilesLocal = async () => {
  try {
    const value = await AsyncStorage.getItem("profiles");
    if (value !== null) return JSON.parse(value);
  } catch (err) {
    console.error({ err });
  }
};

export const getNameFromLocal = async (): Promise<string | any> => {
  try {
    const value = await AsyncStorage.getItem("profiles");
    if (value !== null) {
      const parsedValue = JSON.parse(value);
      console.log(parsedValue);
      return parsedValue?.firstName + " " + parsedValue?.lastName;
    }
  } catch (err) {}
};
