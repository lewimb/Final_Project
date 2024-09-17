"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const images: string[] = [
  "/assets/carousel-placeholder.avif",
  "/assets/carousel-placeholder-2.avif",
  "/assets/carousel-placeholder-3.avif",
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const numOfImage = images.length;

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((state) => (state === numOfImage - 1 ? 0 : state + 1));
    }, 5000);

    return () => {
      clearInterval(t);
    };
  }, []);

  return (
    <div className=" flex h-screen shadow-xl overflow-x-scroll">
      <div className="shadow-2xl flex w-full relative">
        <Image
          src={images[index]}
          fill
          className="object-cover object-top"
          alt="carousel"
        />
      </div>
    </div>
  );
}
