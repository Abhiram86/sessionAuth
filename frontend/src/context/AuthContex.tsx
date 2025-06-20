"use client";

import { getUser } from "@/api/getUser";
import { User, WithAuthType } from "@/app/types/User";
import { createContext, useEffect, useState } from "react";

export const WithAuth = createContext<WithAuthType>({
  user: null,
  setUser: () => {},
});

export default function WithAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);
  return (
    <WithAuth.Provider value={{ user, setUser }}>{children}</WithAuth.Provider>
  );
}
