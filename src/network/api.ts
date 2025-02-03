import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { header } from "./header";

export const url = "http://137.184.37.214/api";

export const apiUrls = {
  login: "/auth/sign-in",
  register: "/auth/sign-up",
  guest: "/auth/guest",
  refresh: "/auth/refresh",
  getAllPosts: "/posts",
  createPost: "/posts",
  payment: "/payment/subscribe",
  getProfile: "/profile",
  updateProfile: "/profile",
  verificationRequest: "/verification/request",
  verificationSubmit: "/verification/submit",
  myListing: "/posts/user",
  logout: "/auth/logout",
  updatePosts: "/posts/",
  cancelSubscription: "/payment/unsubscribe",
  guestPost: "/posts/guest",
  paymentKey: "/payment/key",
  location: "/location?place=",
};
export const LocationApi = async (place: string) => {
  const baseUrl = `${url}${apiUrls.location}${place}`;
  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
export const paymentKeyApi = async () => {
  try {
    const res = await axios.get(url + apiUrls.paymentKey);
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
export const guestPostsApi = async (token: string) => {
  try {
    const res = await axios.get(url + apiUrls.guestPost, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
export const guestApi = async (bodyData: any) => {
  const baseUrl = url + apiUrls.guest;
  try {
    const res = await axios.post(baseUrl, bodyData);
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
export const cancelSubscriptionApi = async (bodyData: any, token: string) => {
  const baseUrl = url + apiUrls.cancelSubscription;
  try {
    const res = await axios.post(baseUrl, bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
export const updatePostsApi = async (
  id: string,
  bodyData: any,
  token: string
) => {
  const baseUrl = url + apiUrls.updatePosts + id;
  console.log(baseUrl);
  try {
    const res = await axios.put(baseUrl, bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
export const logoutApi = async (token: string) => {
  try {
    const res = await axios.post(
      url + apiUrls.logout,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
export const verificationSubmitApi = async (
  bodyData: verificationSubmitBodyType,
  token: string
) => {
  try {
    const res = await axios.post(url + apiUrls.verificationSubmit, bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
export const verificationRequestApi = async (
  bodyData: verificationBodyType,
  token: string
) => {
  try {
    const res = await axios.post(url + apiUrls.verificationRequest, bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
export const updateProfileApi = async (
  token: string,
  bodyData: updateBodyType
) => {
  try {
    const res = await axios.put(url + apiUrls.getProfile, bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
export const getProfileApi = async (token: string) => {
  try {
    const res = await axios.get(url + apiUrls.getProfile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    alert(err.response.data.message);
  }
};
export const paymentAPi = async (token: string, bodyData: PaymentBodyType) => {
  try {
    const res = await axios.post(url + apiUrls.payment, bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
export const refreshTokenApi = async (token: string) => {
  try {
    const res = await axios.post(
      url + apiUrls.refresh,
      { refreshToken: token },
      {
        headers: header,
      }
    );
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
export const createPostsApi = async (bodyData: any, token: string) => {
  try {
    const res = await axios.post(url + apiUrls.createPost, bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
export const getAllPostsApi = async (token: string) => {
  try {
    const res = await axios.get(url + apiUrls.getAllPosts, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
export const myListingApi = async (token: string) => {
  try {
    const res = await axios.get(url + apiUrls.myListing, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
export const LoginApi = async (bodyData: LoginBodyType) => {
  try {
    const res = await axios.post(url + apiUrls.login, bodyData);
    return res.data;
  } catch (err: any) {
    console.log(err);
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
export const RegisterApi = async (bodyData: RegisterBodyType) => {
  try {
    const res = await axios.post(url + apiUrls.register, bodyData);
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      message: err.response.data.message,
    };
  }
};
