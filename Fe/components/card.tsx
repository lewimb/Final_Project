"use client";
import { useState } from "react";
import Image from "next/image";

type Items = {
  id: number;
  name: string;
  img: string;
  description: string;
};

let items: Items[] = [
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

export default function Card() {
  return (
    <>
      <div className="bg-gray-900">
        <h1 className="card-title drop-shadow-2xl text-2xl text-center pt-5 mx-3 font-semibold text-white">
          Search by item
        </h1>
        <div>
          <div className="grid grid-cols-3 gap-11 p-10 justify-between ">
            {items.map((value, index) => (
              <div key={value.id} className="card flex">
                <div>
                  <Image
                    src={value.img}
                    alt="baju"
                    width={500}
                    height={500}
                    className="item rounded-xl"
                  ></Image>
                  <h1 className="text-center py-3 font-bold">{value.name}</h1>
                  <p className="text-center">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
