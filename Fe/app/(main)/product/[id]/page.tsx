"use client";
import Button from "@/components/button";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState } from "react";
type Items = {
  id: number;
  name: string;
  img: string;
  description: string;
};

let products: Items[] = [
  {
    id: 1,
    name: "Item 1",
    img: "/assets/carousel-placeholder.avif",
    description: "This is the description for Item 1.",
  },
  {
    id: 2,
    name: "Item 2",
    img: "/assets/carousel-placeholder.avif",
    description: "This is the description for Item 2.",
  },
  {
    id: 3,
    name: "Item 3",
    img: "/assets/carousel-placeholder.avif",
    description: "This is the description for Item 3.",
  },
];

type PageProps = {
  params: {
    id: string;
  };
};

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"] as const;

export default function SearchBar({ params }: PageProps) {
  const id = +params.id;
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState<(typeof sizes)[number]>(
    sizes[0]
  );

  if (!product) {
    return notFound();
  }

  function handleClick(index: number) {
    setSelectedSize(sizes[index]);
  }

  return (
    <div>
      <div className="flex m-auto items-center text-center bg-slate-900 h-screen justify-center">
        <div className="flex m-auto p-auto rounded-lg bg-white w-3/4 h-5/6 drop-shadow-2xl">
          <Image
            src={product.img}
            alt={product.name}
            width={500}
            height={500}
            className="object-cover rounded-l-lg"
          />
          <div className="flex flex-col w-full p-2 gap-2">
            <div className="font-semibold text-2xl p-2">{product.name}</div>
            <div className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              nihil voluptatibus, eveniet delectus quis sunt illo minima
              aperiam. Sed, sit possimus eaque nulla fugit laboriosam ut eveniet
              iusto adipisci hic. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Reprehenderit quis facilis sapiente repellat?
              Labore id perferendis sint cumque! Ipsum vero quaerat voluptates
              corporis veniam itaque similique mollitia temporibus, quod
              pariatur.
            </div>
            <div className="flex flex-col gap-2">
              <p className="p-1">Available sizes</p>
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
              <Button />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
