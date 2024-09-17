import Button from "@/components/button";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <>
      <div className="flex flex-col p-10 px-20 items-center h-screen gap-4">
        <h1 className="text-xl title">Edit Profile</h1>
        <div className="flex gap-10 bg-gray-800 rounded-xl p-10 w-3/4 h-screen justify-evenly">
          <div className="flex flex-col w-3/4 items-start gap-5">
            <div className="flex gap-5 justify-center w-full">
              <Image
                src={"/assets/profile_icon.svg"}
                alt="profile_pic"
                width={60}
                height={60}
                style={{
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              />
              <div>
                <h1 className="text-white text-l font-semibold">Lewimb</h1>
                <h1 className="text-white">Lewi Meyvianus Borosi</h1>
              </div>
            </div>
            <form className="w-full py-5 flex flex-col h-full justify-evenly">
              <label className="text-white flex flex-col font-semibold">
                Change fullname
                <input
                  type="text"
                  className="w-full my-3 bg-slate-600 focus:outline-none"
                  name="Fullname"
                />
              </label>
              <label className="text-white flex flex-col font-semibold">
                Change profile picture
                <input
                  type="text"
                  className="w-full my-3 bg-slate-600 focus:outline-none"
                  name="img-url"
                />
              </label>
              <Button value="submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
