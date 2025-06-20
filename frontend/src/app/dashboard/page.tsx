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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const res = await getDashboard();
      if (!res) return;
      setData(res.message);
      setLoading(false);
    };
    getData();
  }, [user]);
  return (
    <div className="flex flex-col text-3xl items-center text-center mt-20 min-h-[200px]">
      {loading ? (
        <div className="w-64 h-8 bg-gray-300 animate-pulse rounded"></div>
      ) : data ? (
        <p>{data}</p>
      ) : (
        <p>You need to be logged in to access this route</p>
      )}
    </div>
  );
}
