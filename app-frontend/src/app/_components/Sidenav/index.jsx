"use client";
import { BiSolidChat } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";
import { TbSettingsFilled } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { useState } from "react";

const TABS = {
  chats: "All chats",
  settings: "Settings",
  logout: "Logout",
};
const Sidenav = () => {
  const [activeTab, setActiveTab] = useState(TABS.chats);
  return (
    <nav className=" h-full fixed flex flex-col justify-between border-r-[1px] border-[#cccccc9e] px-4 py-6">
      <header className="space-y-5">
        <FaUser size={"20px"} color="#73787b" className="mb-12" />
        <BiSolidChat
          size={"20px"}
          color={activeTab === TABS.chats ? "#006dff" : "#73787b"}
        />
        {/* saved messages */}
      </header>
      <footer className="space-y-5">
        <TbSettingsFilled
          size={"20px"}
          color={activeTab === TABS.settings ? "#006dff" : "#73787b"}
        />
        <TbLogout2
          size={"20px"}
          color={activeTab === TABS.logout ? "#006dff" : "#73787b"}
        />
      </footer>
    </nav>
  );
};

export default Sidenav;

/* 
colors : 
primary grey => #73787b
secondary grey / light grey => #040415
primary blue => #006dff
primary black => #131c28
 */
