import Topnav from "./Topnav";
import Image from "next/image";
import fashion_logo from "../public/assets/fashion_logo.svg";
import proflie_icon from "../public/assets/profile_icon.svg";

export default function Navbar() {
  return (
    <header>
      <Topnav />
      <div className="flex border-b-2 border-y-gray px-10 py-1 drop-shadow-2xl justify-between">
        <Image src={fashion_logo} width={100} height={100} alt="logo" />
        <div className="h-14 flex items-center gap-6 justify-between">
          <Image
            className="rounded-full object-cover"
            width={30}
            height={30}
            src={proflie_icon}
            alt="user_pic"
          />
          <h4>Username</h4>
        </div>
      </div>
    </header>
  );
}
