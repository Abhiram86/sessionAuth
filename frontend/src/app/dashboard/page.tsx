"use client";

import { getDashboard } from "@/api/dashboard";
import { WithAuth } from "@/context/AuthContex";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Dashboard() {
  const { user } = useContext(WithAuth);
  const router = useRouter();

  if (!user) router.replace("/login");

  const [data, setData] = useState<string | null>(null);
  useEffect(() => {
    const getData = async () => {
      const res = await getDashboard();
      if (!res) return;
      setData(res.message);
    };
    getData();
  }, []);
  return (
    <div className="flex flex-col text-3xl items-center text-center mt-20">
      {data ? (
        <p>{data}</p>
      ) : (
        <p>you need to be logged in to access this route</p>
      )}
    </div>
  );
}
