import Image from "next/image";

export default function Login() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="flex w-[700px] justify-between p-8">
        <form className="flex flex-col gap-5 ">
          <Image
            src="/assets/fashion_logo.svg"
            alt="logo"
            width={100}
            height={100}
          />
          <h1 className="tagline">Access to your account</h1>
          <label className="flex flex-col" htmlFor="username">
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
          <h1 className="tagline">Don't have an account</h1>
          <button className="bg-white my-5 hover:bg-black text-black hover:text-white font-bold py-2 px-4 border-b-4 border-black rounded">
            Register account
          </button>
        </div>
      </div>
    </div>
  );
}
