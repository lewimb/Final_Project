import Navbar from "./Navbar";
import Image from "next/image";
import fashion_logo from "../public/assets/fashion_logo.svg";

export default function Register() {
  return (
    <>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="flex w-[700px] justify-between p-8">
          <form className="flex flex-col gap-5 ">
            <Image src={fashion_logo} alt="logo" width={100} height={100} />
            <h2 className="tagline">Access to your account</h2>
            <label className="flex flex-col" htmlFor="fullname">
              Fullname
              <input
                type="text"
                className="border-b-2 border-gray-500 w-[300px] focus:outline-none"
              />
            </label>
            <label className="flex flex-col">
              Username
              <input
                type="text"
                className="border-b-2 border-gray-500 w-[300px] focus:outline-none"
              />
            </label>
            <label className="flex flex-col">
              Password
              <input
                type="text"
                className="border-b-2 border-gray-500 w-[300px] focus:outline-none"
              />
            </label>
            <button className="bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 border-b-4 border-black rounded">
              Submit
            </button>
          </form>
          <div className="border-l-[1px] flex-col border-l-black pl-14">
            <h1 className="tagline">Already have an account</h1>
            <button className="bg-white my-5 hover:bg-black text-black hover:text-white font-bold py-2 px-4 border-b-4 border-black rounded w-full">
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
