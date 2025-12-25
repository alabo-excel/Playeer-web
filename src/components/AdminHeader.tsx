import api from "@/utils/api";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/user";
import DropdownAction from "./DropDown";

const AdminHeader = ({ onSidebarToggle }: { onSidebarToggle?: () => void }) => {
  const router = useRouter();
  const user = useAtomValue(userAtom);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.clear();
      router.push("/auth/login");
    }
  };

  return (
    <header className="fixed top-0 w-full bg-[#FCFCFC] border-b border-gray lg:py-6 lg:px-8 p-4 flex justify-between z-50">
      <div className="flex items-center">
        {/* Hamburger menu for mobile/tablet */}
        {/* <button
          className="block md:hidden mr-4 p-2 rounded hover:bg-gray-100 focus:outline-none"
          onClick={onSidebarToggle}
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button> */}
        <Link href={"/"}>
          <img
            className="w-32 my-auto"
            src="/images/logo-colored.svg"
            alt=""
          />
        </Link>
      </div>
      <div className="">
        <DropdownAction actions={[{
          label: "Settings", onClick: () => router.push('/user/settings'), color: 'black', 
        },
          {
            label: "Subscription", onClick: () => router.push('/user/update-plan'), color: 'black',
          },
          {
            label: "Logout", onClick: () => handleLogout(), color: 'red',
          }
        ]}>
          <div className="w-12 h-12 text-center text-xl rounded-full border border-[#BFBFBF] bg-[#F4F4F4] flex justify-center align-center items-center">
            <span className="text-[#BFBFBF] font-bold">PA</span>
          </div>
        </DropdownAction>

      </div>
      {/* <div className="w-44 flex justify-between my-auto">
        <img
          src={user?.profilePicture || "/images/player-2.jpg"}
          className="w-8 my-auto h-8 rounded-full"
          alt="User profile"
        />
        <button
          className="flex text-primary bg-[#E5F4FF] p-2 px-6 rounded-full justify-center"
          onClick={handleLogout}
        >
          <p className="text-sm my-auto mr-2">Logout</p>
          <LogOut size={15} className="my-auto" />
        </button>
      </div> */}
    </header>
  );
};

export default AdminHeader;
