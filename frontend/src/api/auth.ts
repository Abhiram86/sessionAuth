import { User } from "@/app/types/User";
import axios, { AxiosError } from "axios";

const router = axios.create({
  baseURL: "http://localhost:8080/auth",
  withCredentials: true,
});

export const apiRegister = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await router.post("/register", data);
    return res.data as User;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("error is ", error.message);
    } else {
      console.log(error);
    }
    return null;
  }
};

export const apiLogin = async (data: { email: string; password: string }) => {
  try {
    const res = await router.post("/login", data);
    return res.data as User;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("error is ", error.message);
    } else {
      console.log(error);
    }
    return null;
  }
};

export const apiLogout = async () => {
  try {
    const res = await router.post("/logout");
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("error is ", error.message);
    } else {
      console.log(error);
    }
    return null;
  }
};
