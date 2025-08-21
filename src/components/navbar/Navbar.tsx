"use client"

import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "../ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default  function Navbar() {
  const { getUser } = useKindeBrowserClient();
  const user =  getUser();
  return (
    <nav className="py-5 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href={"/"}>
          <h1 className="text-3xl">
            Blog<span className="text-sky-500">Lio</span>
          </h1>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link
            className=" font-medium hover:text-sky-600 underline-2 decoration-blue-600 hover:underline transition-colors"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className=" font-medium hover:text-sky-600 underline-2 decoration-blue-600 hover:underline transition-colors"
            href={"/dashboard"}
          >
            Dashboard
          </Link>
        </div>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <p>{user.given_name}</p>
          <LogoutLink className={buttonVariants({variant: "secondary"})}>Log Out</LogoutLink>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <LoginLink className={buttonVariants()}>Login</LoginLink>
          <RegisterLink className={buttonVariants({ variant: "secondary" })}>
            Sign Up
          </RegisterLink>
        </div>
      )}
    </nav>
  );
}
