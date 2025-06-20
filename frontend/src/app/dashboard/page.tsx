"use client";

import { getDashboard } from "@/api/dashboard";
import { WithAuth } from "@/context/AuthContex";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Dashboard() {
  const { user, loading: userLoading } = useContext(WithAuth);
  const router = useRouter();

  if (!user) router.replace("/login");

  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userLoading && !user) router.replace("/login");
  }, [userLoading, user, router]);

  useEffect(() => {
    if (!userLoading && user) {
      const getData = async () => {
        const res = await getDashboard();
        if (!res) return;
        setData(res.message);
        setLoading(false);
      };
      getData();
    }
  }, [userLoading, user]);

  if (userLoading)
    return (
      <div className="flex flex-col text-3xl items-center text-center mt-20 min-h-[200px]">
        <p className="animate-pulse">Loading...</p>
      </div>
    );

  return (
    <div className="flex flex-col text-3xl items-center text-center mt-20 min-h-[200px]">
      {loading ? (
        <p className="animate-pulse">Loading ...</p>
      ) : data ? (
        <p>{data}</p>
      ) : (
        <p>You need to be logged in to access this route</p>
      )}
    </div>
  );
}
