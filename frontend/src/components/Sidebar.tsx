"use client";

import Image from "next/image";
import React, { useState } from "react";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <aside>
      <nav
        className={`absolute z-20 space-y-2 block md:hidden top-0 p-2 w-56 left-0 h-full bg-zinc-800 transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Image
          src={"/menu.svg"}
          alt="menu"
          width={20}
          height={20}
          className="ml-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
        {children}
      </nav>
      <Image
        src={"/menu.svg"}
        alt="menu"
        width={20}
        height={20}
        className="absolute md:hidden top-2 left-4 cursor-pointer"
        onClick={() => setOpen(!open)}
      />
    </aside>
  );
}
