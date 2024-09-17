"use client";

import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import Topnav from "./Topnav";
import Button from "./button";
import { AuthContext } from "@/contexts/AuthContext";

export default function Navbar() {
  const { authUser } = useContext(AuthContext);

  return (
    <header>
      <Topnav />
      <div className="flex border-b-2 border-y-gray px-10 py-1 drop-shadow-2xl justify-between">
        <Image
          src="/assets/fashion_logo.svg"
          width={100}
          height={100}
          alt="logo"
        />
        {authUser !== null ? (
          <Link
            href="/profile"
            className="h-14 flex items-center gap-6 justify-between"
          >
            <Image
              className="rounded-full object-cover"
              width={30}
              height={30}
              src={authUser.profPic ?? "/assets/profile_icon.svg"}
              alt="user_pic"
            />
            <h4>{authUser.username}</h4>
          </Link>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
