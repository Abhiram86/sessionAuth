import { User } from "@/app/types/User";
import axios, { AxiosError } from "axios";

const router = axios.create({
  baseURL: "https://session-auth-theta.vercel.app/auth",
  withCredentials: true,
});

export const apiRegister = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await router.post("/register", data);
    const user = res.data as User;
    return { user, error: null };
  } catch (error) {
    let errorMessgae = "Something went wrong";
    if (error instanceof AxiosError && error.response) {
      console.log("error is ", error.message);
      errorMessgae = error.response.data?.error || error.message;
    } else {
      console.log(error);
    }
    return { user: null, error: errorMessgae };
  }
};

export const apiLogin = async (data: { email: string; password: string }) => {
  try {
    const res = await router.post("/login", data);
    const user = res.data as User;
    return { user, error: null };
  } catch (error) {
    let errorMessgae = "Something went wrong";
    if (error instanceof AxiosError && error.response) {
      console.log("error is ", error.message);
      errorMessgae = error.response.data?.error || error.message;
    } else {
      console.log(error);
    }
    return { user: null, error: errorMessgae };
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
