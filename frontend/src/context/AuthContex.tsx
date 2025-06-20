"use client";

import { getUser } from "@/api/getUser";
import { User, WithAuthType } from "@/app/types/User";
import { createContext, useEffect, useState } from "react";

export const WithAuth = createContext<WithAuthType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export default function WithAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUser()
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, []);
  return (
    <WithAuth.Provider value={{ user, setUser, loading }}>
      {children}
    </WithAuth.Provider>
  );
}
