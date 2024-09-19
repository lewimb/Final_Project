"use client";

import { useState, useContext, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import Image from "next/image";
import { AuthContext, type UpdatePayload } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { userSession, logout, deleteAccount, updateAccount } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const [input, setInput] = useState<UpdatePayload>({
    fullname: userSession?.fullname || "",
    profilepic: userSession?.profilepic || "",
  });

  const router = useRouter();

  function validateFullname() {
    if (!input.fullname) {
      setInput({ ...input, fullname: userSession!.fullname });
      throw new Error("Name can not be empty");
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      validateFullname();
      await updateAccount(input);
      setError("");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  }

  async function handleLogout() {
    logout();
    router.push("/");
  }

  async function handleDeleteAccount() {
    try {
      await deleteAccount();
      router.push("/");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  }

  return (
    <div className="flex flex-col py-10 px-20 items-center h-screen gap-4">
      <h1 className="text-xl title">Edit Profile</h1>
      <div className="flex gap-10 bg-gray-800 rounded-xl pb-20 p-10 w-3/4 h-screen justify-evenly">
        {userSession ? (
          <div className="flex flex-col w-3/4 items-start gap-5">
            <div className="flex gap-5 justify-center w-full">
              <Image
                src={userSession.profilepic || "/assets/profile_icon.svg"}
                alt="profile_pic"
                width={60}
                height={60}
                style={{
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              />
              <div>
                <h1 className="text-white text-l font-semibold">
                  {userSession.username}
                </h1>
                <h1 className="text-white">
                  {userSession.fullname || "New User"}
                </h1>
              </div>
            </div>

            <form
              className="w-full py-5 flex flex-col h-full justify-evenly"
              onSubmit={handleSubmit}
            >
              {error ? <span className="text-red-500">{error}</span> : null}
              <label className="text-white flex flex-col font-semibold">
                Fullname
                <input
                  type="text"
                  className="w-full my-3 py-1 px-2 bg-slate-600 focus:outline-none"
                  name="fullname"
                  value={input.fullname}
                  onChange={handleChange}
                  placeholder="Ex : John Doe"
                />
              </label>
              <label className="text-white flex flex-col font-semibold">
                Profile picture
                <input
                  type="text"
                  className="w-full py-1 px-2 my-3 bg-slate-600 focus:outline-none"
                  name="profilepic"
                  value={input.profilepic}
                  onChange={handleChange}
                  placeholder="Insert the link to your profile picture"
                />
              </label>
              <Button>Update Profile</Button>
            </form>
            <Button className="w-full" onClick={handleLogout}>
              Logout
            </Button>
            <Button
              className="w-full hover:bg-red-500 text-red-500 border border-red-500"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
