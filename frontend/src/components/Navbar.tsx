import Link from "next/link";
import React from "react";
// import Button from "./Button";
import AuthButton from "./AuthButton";

export default function Navbar() {
  return (
    <header className="w-full hidden md:block">
      <nav className="w-full flex justify-between py-2 px-4 items-center bg-zinc-800">
        <div className="content-center p-4 rounded-full bg-yellow-400" />
        <ul className="flex space-x-2">
          <li className="p-2 text-sm">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="p-2 text-sm">
            <Link href={"/common"}>Common</Link>
          </li>
          <li className="p-2 text-sm">
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="text-sm">
            <AuthButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
