import axios from "axios";

interface Common {
  message: string;
}

export const getCommon = async () => {
  try {
    const res = await axios.get("http://localhost:8080/common", {
      withCredentials: true,
    });
    return res.data as Common;
  } catch (error) {
    if (error instanceof Error) {
      console.log("error is ", error.message);
    } else {
      console.log(error);
    }
    return null;
  }
};
