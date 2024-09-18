"use client";

import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/button";
import { AuthContext } from "@/contexts/AuthContext";
import type { AuthPayload } from "@/contexts/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [input, setInput] = useState<AuthPayload>({
    username: "",
    password: "",
  });
  const router = useRouter();

  function validateInput() {
    if (!input.password || !input.username) {
      throw new Error("All fields are required");
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      validateInput();
      await login(input);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setInput({ ...input, [name]: value });
  }

  function navigateToRegisterPage() {
    router.push("/register");
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex w-[700px] justify-between p-8">
        <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
          <Image
            src="/assets/fashion_logo.svg"
            alt="logo"
            width={100}
            height={100}
          />
          <h1 className="tagline">Login to access to your account</h1>
          {error ? <p className="text-red-500">{error}</p> : null}
          <label className="flex flex-col" htmlFor="username">
            <span>
              Username <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              className="border-b-2 border-gray-500 w-[300px] focus:outline-none"
              name="username"
              onChange={handleChange}
              value={input.username}
            />
          </label>
          <label className="flex flex-col">
            <span>
              Password <span className="text-red-500">*</span>
            </span>
            <input
              type="password"
              className="border-b-2 border-gray-500 w-[300px] focus:outline-none"
              name="password"
              onChange={handleChange}
              value={input.password}
            />
          </label>
          <Button>Submit</Button>
        </form>
        <div className="border-l-[1px] flex-col border-l-black pl-14">
          <h1 className="tagline">Don't have an account</h1>
          <Button className="w-full" onClick={navigateToRegisterPage}>
            Register account
          </Button>
        </div>
      </div>
    </div>
  );
}
