"use client";

import React, { useContext } from "react";
import Button from "./Button";
import { WithAuth } from "@/context/AuthContex";
import { apiLogout } from "@/api/auth";
import { redirect } from "next/navigation";

export default function AuthButton({ className }: { className?: string }) {
  const { user, setUser } = useContext(WithAuth);
  const logout = async () => {
    const res = await apiLogout();
    if (res) {
      setUser(null);
      redirect("/login");
    }
  };
  return user ? (
    <Button
      data={{
        type: "button",
        text: "Logout",
        variant: "danger",
        className: `rounded-lg w-full text-zinc-700 ${className}`,
        onClick: () => logout(),
      }}
    />
  ) : (
    <div className="p-2">
      <Button
        data={{
          type: "link",
          href: "/login",
          text: "Login",
          variant: "primary",
          className: "rounded-lg text-zinc-700",
        }}
      />
    </div>
  );
}
