import Link from "next/link";
import React from "react";
import AuthButton from "./AuthButton";

export default function SidebarLinks() {
  return (
    <>
      <div className="flex flex-col d justify-between">
        <ul className="flex flex-col space-x-2">
          <Link href={"/"} className="w-full">
            <li className="p-2 text-sm rounded-sm hover:bg-yellow-500">Home</li>
          </Link>
          <Link href={"/common"} className="w-full">
            <li className="p-2 text-sm rounded-sm hover:bg-yellow-500">
              Common
            </li>
          </Link>
          <Link href={"/dashboard"} className="w-full">
            <li className="p-2 text-sm rounded-sm hover:bg-yellow-500">
              Dashboard
            </li>
          </Link>
        </ul>
        <AuthButton />
      </div>
    </>
  );
}
