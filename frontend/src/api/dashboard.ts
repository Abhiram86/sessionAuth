import axios, { AxiosError } from "axios";

interface Dashboard {
  message: string;
}

export const getDashboard = async (cookie: string) => {
  try {
    const res = await axios.get(
      "https://session-auth-theta.vercel.app/dashboard",
      {
        headers: {
          cookie,
        },
      }
    );
    return res.data as Dashboard;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("error is ", error.message);
    } else {
      console.log(error);
    }
    return null;
  }
};
