"use client";
import { useState } from "react";

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"] as const;

export default function SizePicker() {
  const [selectedSize, setSelectedSize] = useState<(typeof sizes)[number]>(
    sizes[0]
  );

  function handleClick(index: number) {
    setSelectedSize(sizes[index]);
  }

  return (
    <div className="flex justify-center gap-4 items-center flex-wrap">
      {sizes.map((size, index) => (
        <button
          key={size}
          className={`sizes size-14 ${
            selectedSize === size
              ? "font-bold pointer-events-none bg-black text-white"
              : "hover:bg-black hover:font-bold"
          }`}
          onClick={() => handleClick(index)}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
