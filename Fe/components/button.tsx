import { HTMLAttributes } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`${className} bg-white hover:bg-black text-black hover:text-white font-bold py-2 px-4 border-b-4 border-black rounded-lg duration-200 transition-all`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
