import Link from "next/link";

type Props = {
  value: string;
  addOns?: string;
};

const Button = ({ value, addOns }: Props) => {
  return (
    <>
      <button
        className={`${addOns} bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 border-b-4 border-black rounded-lg`}
      >
        {value}
      </button>
    </>
  );
};

export default Button;
