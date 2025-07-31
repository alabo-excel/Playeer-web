"use client";

import {
  LayoutDashboard,
  LockKeyholeOpen,
  Settings,
  SquarePlay,
  UserRound,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { userAtom } from "@/store/user";
import { useAtomValue } from "jotai";

interface SideNavProps {
  open?: boolean;
  onClose?: () => void;
}

const SideNav = ({ open = false, onClose }: SideNavProps) => {
  const router = useRouter();

  const pathname = usePathname();
  const user = useAtomValue(userAtom);

  const navItems = [
    { href: "/user/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/user/profile", icon: UserRound, label: "My Profile" },
    { href: "/user/reels", icon: SquarePlay, label: "Highlight Videos" },
    { href: "/user/settings", icon: Settings, label: "Settings" },
  ];

  // Responsive/animated sidebar classes
  const baseClass =
    "fixed left-0 top-0 h-screen border-r border-gray p-4 flex flex-col bg-[#FCFCFC] z-50 transition-transform duration-300";
  const desktopClass = "hidden md:flex w-[20%] mt-20";
  const mobileClass = `md:hidden w-64 mt-0 ${
    open ? "translate-x-0" : "-translate-x-full"
  }`;

  return (
    <>
      {/* Sidebar for mobile (slide-in) */}
      <aside
        className={`${baseClass} ${mobileClass}`}
        style={{ boxShadow: open ? "2px 0 8px rgba(0,0,0,0.05)" : undefined }}
        tabIndex={-1}
        aria-hidden={!open}
      >
        <div className="flex mb-4">
          <img
            className="w-32 my-auto block lg:hidden"
            src="/images/logo-colored.png"
            alt=""
          />

          <button
            className="block md:hidden  my-auto ml-auto p-2 rounded hover:bg-gray-100"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <div className="flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <button
                  className={`flex my-3 p-3 rounded-md w-full transition-colors duration-200 ${
                    isActive
                      ? "text-white bg-primary"
                      : "text-[#6C6C6C] hover:bg-gray-100"
                  }`}
                  onClick={onClose}
                >
                  <Icon />
                  <p className="ml-4">{item.label}</p>
                </button>
              </Link>
            );
          })}
        </div>
        <div className="bg-[#F4F4F4] p-3 rounded-xl">
          <p className="font-semibold">
            Unlock Your Full Potential with{" "}
            <span className="text-primary">Playeer Pro!</span>{" "}
          </p>
          <p className="text-xs text-[#6C6C6C] my-2">
            Get featured, upload unlimited videos, track your stats, and
            increase your visibility to top scouts and clubs.
          </p>
          <button className="mb-2 bg-primary text-white flex p-3 rounded-full w-full justify-center">
            <LockKeyholeOpen className="w-4 h-4 my-auto" />
            <p className="text-sm ml-3 my-auto">Upgrade to Pro</p>
          </button>
          <div className="bg-[#E5F4FF] p-1 rounded-md">
            <p className="text-primary text-xs">
              Start with Monthly or save more with Yearly. More features. More
              visibility. More chances to go pro.
            </p>
          </div>
        </div>
      </aside>
      {/* Sidebar for desktop */}
      <aside className={`${baseClass} ${desktopClass}`} aria-hidden={false}>
        <div className="flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <button
                  className={`flex my-3 p-3 rounded-md w-full transition-colors duration-200 ${
                    isActive
                      ? "text-white bg-primary"
                      : "text-[#6C6C6C] hover:bg-gray-100"
                  }`}
                >
                  <Icon />
                  <p className="ml-4">{item.label}</p>
                </button>
              </Link>
            );
          })}
        </div>
        {user?.plan === "free" && (
          <div className="bg-[#F4F4F4] p-3 rounded-xl mb-20">
            <p className="font-semibold">
              Unlock Your Full Potential with{" "}
              <span className="text-primary">Playeer Pro!</span>{" "}
            </p>
            <p className="text-xs text-[#6C6C6C] my-2">
              Get featured, upload unlimited videos, track your stats, and
              increase your visibility to top scouts and clubs.
            </p>
            <button
              onClick={() => router.push("/user/update-plan")}
              className="mb-2 bg-primary text-white flex p-3 rounded-full w-full justify-center"
            >
              <LockKeyholeOpen className="w-4 h-4 my-auto" />
              <p className="text-sm ml-3 my-auto">Upgrade to Pro</p>
            </button>
            <div className="bg-[#E5F4FF] p-1 rounded-md">
              <p className="text-primary text-xs">
                Start with Monthly or save more with Yearly. More features. More
                visibility. More chances to go pro.
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default SideNav;
