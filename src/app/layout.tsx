import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Playeer",
  description: "Playeer bridges the gap between undiscovered football talent and the professionals who scout them. We provide a platform where players can showcase their skills, build professional profiles, and get visibility from scouts, agents, and clubs around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
