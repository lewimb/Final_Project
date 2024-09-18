"use client";

import { useState, useContext, type ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AuthContext, type AuthPayload } from "@/contexts/AuthContext";
import Button from "@/components/button";

export default function Register() {
  const { register } = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState("");
  const [input, setInput] = useState<AuthPayload>({
    username: "",
    password: "",
  });

  function validateInput() {
    if (!input.password || !input.username) {
      throw new Error("All fields are required");
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      validateInput();
      await register(input);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  function navigateToLogin() {
    router.push("/login");
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
          <h1 className="tagline">Create a new account</h1>
          {error ? <p className="text-red-500">{error}</p> : null}
          <label className="flex flex-col">
            <span>
              Username <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              className="border-b-2 border-gray-500 w-[300px] focus:outline-none"
              name="username"
              value={input.username}
              onChange={handleChange}
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
              value={input.password}
              onChange={handleChange}
            />
          </label>
          <Button>Register</Button>
        </form>
        <div className="border-l-[1px] flex-col border-l-black pl-14">
          <h1 className="tagline">Already have an account</h1>
          <Button className="w-full" onClick={navigateToLogin}>
            Log into your account
          </Button>
        </div>
      </div>
    </div>
  );
}
