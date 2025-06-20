import { getDashboard } from "@/api/dashboard";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Dashboard() {
  const cookie = (await cookies()).get("cookie")?.value;

  const res = await axios.get("https://session-auth-theta.vercel.app/getUser", {
    headers: {
      Cookie: `connect.sid=${cookie}`,
    },
    withCredentials: true,
  });

  if (!res.data) redirect("/login");

  console.log(cookie);

  const data = await getDashboard(cookie || "");
  return (
    <div className="flex flex-col text-3xl items-center text-center mt-20">
      {data ? (
        <p>{data.message}</p>
      ) : (
        <p>you need to be logged in to access this route</p>
      )}
    </div>
  );
}
