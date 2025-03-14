"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { BiSolidChat } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { TbLogout2, TbSettingsFilled } from "react-icons/tb";

const TABS = {
  chats: "/all_chats",
  setting: "/settings",
  logout: "Logout",
};
const Sidenav = () => {
  const pathname = usePathname();

  return (
    <nav className=" h-full fixed flex flex-col justify-between border-r-[1px] border-[#cccccc9e] px-4 py-6">
      <header className="space-y-5">
        <FaUser size={"20px"} color="#73787b" className="mb-12" />
        <Link href={TABS.chats}>
          <BiSolidChat
            size={"20px"}
            color={pathname === TABS.chats ? "#006dff" : "#73787b"}
          />
        </Link>
        {/* saved messages */}
      </header>
      <footer className="space-y-5">
        <Link href={TABS.setting}>
          <TbSettingsFilled
            size={"20px"}
            color={pathname === TABS.setting ? "#006dff" : "#73787b"}
          />
        </Link>
        <TbLogout2
          size={"20px"}
          color={pathname === TABS.logout ? "#006dff" : "#73787b"}
        />
      </footer>
    </nav>
  );
};

export default Sidenav;
