"use client";

import { apiLogin } from "@/api/auth";
import Button from "@/components/Button";
import { WithAuth } from "@/context/AuthContex";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export default function Register() {
  const { user, setUser } = useContext(WithAuth);
  const router = useRouter();

  if (user) router.replace("/dashboard");

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const res = await apiLogin(data);
    if (res.user) {
      setUser(res.user);
      router.replace("/dashboard");
    } else {
      toast.error(res.error);
    }
  };

  return (
    <div className="mt-20">
      <form
        className="space-y-4 w-96 mx-auto border p-4 rounded-lg border-zinc-700"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-medium">Login</h1>
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            className="bg-zinc-800 text-sm rounded-lg p-2 outline-none focus:ring-1 ring-yellow-500"
            id="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input
            className="bg-zinc-800 text-sm rounded-lg p-2 outline-none focus:ring-1 ring-yellow-500"
            id="password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-400 text-sm">{errors.password.message}</p>
          )}
        </div>
        <Button
          data={{
            text: "Login",
            variant: "primary",
            type: "button",
            className: "w-full rounded-lg mt-2 text-zinc-800 font-medium",
          }}
        />
      </form>
      <p className="mt-4 text-center text-zinc-400 text-sm">
        Don&apos;t have an account?{" "}
        <span className="text-yellow-500">
          <Link href="/register">Register</Link>
        </span>
      </p>
    </div>
  );
}
