import api from "@/utils/api";
import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/store/user";

const AdminHeader = ({ onSidebarToggle }: { onSidebarToggle?: () => void }) => {
  const router = useRouter();
  const user = useAtomValue(userAtom);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      router.push("/auth/login");
    }
  };

  return (
    <header className="fixed top-0 w-full bg-[#FCFCFC] border-b border-gray p-6 flex justify-between lg:z-50">
      <div className="flex items-center">
        {/* Hamburger menu for mobile/tablet */}
        <button
          className="block md:hidden mr-4 p-2 rounded hover:bg-gray-100 focus:outline-none"
          onClick={onSidebarToggle}
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link href={"/user/dashboard"}>
          <img
            className="w-32 my-auto lg:block hidden"
            src="/images/logo-colored.png"
            alt=""
          />
        </Link>
      </div>
      <div className="w-44 flex justify-between my-auto">
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
      </div>
    </header>
  );
};

export default AdminHeader;
