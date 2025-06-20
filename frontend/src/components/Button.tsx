import Link from "next/link";
import React from "react";

export default function Button({ data }: { data: ButtonProps }) {
  if (data.type === "button") {
    return (
      <button
        className={`p-2 block text-sm hover:cursor-pointer ${
          data.variant === "primary"
            ? "bg-yellow-500"
            : data.variant === "danger"
            ? "bg-red-400"
            : "bg-zinc-300"
        } ${data.className}`}
        onClick={data.onClick}
      >
        {data.text}
      </button>
    );
  } else {
    return (
      <Link
        className={`p-2 block md:inline text-center hover:cursor-pointer text-sm ${
          data.variant === "primary"
            ? "bg-yellow-500"
            : data.variant === "danger"
            ? "bg-red-400"
            : "bg-zinc-300"
        } ${data.className}`}
        href={data.href}
      >
        {data.text}
      </Link>
    );
  }
}
