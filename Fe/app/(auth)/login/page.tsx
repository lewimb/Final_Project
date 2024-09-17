"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/button";

export default function Login() {
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  function validateInput() {
    if (!input.password || !input.username) {
      setError("All fields are required");
      return true;
    }

    return false;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (validateInput()) return;

    try {
      const res = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data);
        setError("Login error. Please try again");
        return;
      }

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
          <h1 className="tagline">Access to your account</h1>
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
          <Button onClick={navigateToRegisterPage}>Register account</Button>
        </div>
      </div>
    </div>
  );
}
