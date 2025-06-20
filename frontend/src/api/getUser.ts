import { User } from "@/app/types/User";
import axios, { AxiosError } from "axios";

export const getUser = async () => {
  try {
    const res = await axios.get(
      "https://session-auth-theta.vercel.app/getUser",
      {
        withCredentials: true,
      }
    );
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
