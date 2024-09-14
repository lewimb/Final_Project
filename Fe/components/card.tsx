"use client";
import { useState } from "react";
import Image from "next/image";

export default function Card() {
  return (
    <>
      <h1 className="">Clothes List</h1>
      <div className="flex flex-wrap">
        <div className="container flex-wrap justify-between  ">
          <div className="card">
            <Image
              src={"/assets/carousel_placeholder.avif"}
              alt="baju"
              width={500}
              height={500}
              className="item"
            ></Image>
            <h1 className="tag">Polo</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos quae
              quasi voluptatem voluptate officia a sunt excepturi. Perspiciatis
              facilis quo modi nulla facere nostrum velit laboriosam? Officiis
              eaque iste aspernatur!
            </p>
          </div>
        </div>
        <div className="container flex-wrap justify-between  ">
          <div className="card">
            <Image
              src={"/assets/carousel_placeholder.avif"}
              alt="baju"
              width={500}
              height={500}
              className="item"
            ></Image>
            <h1 className="tag">T-shirt</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos quae
              quasi voluptatem voluptate officia a sunt excepturi. Perspiciatis
              facilis quo modi nulla facere nostrum velit laboriosam? Officiis
              eaque iste aspernatur!
            </p>
          </div>
        </div>
        <div className="container flex-wrap justify-between  ">
          <div className="card">
            <Image
              src={"/assets/carousel_placeholder.avif"}
              alt="baju"
              width={500}
              height={500}
              className="item"
            ></Image>
            <h1 className="tag">Hoodie</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos quae
              quasi voluptatem voluptate officia a sunt excepturi. Perspiciatis
              facilis quo modi nulla facere nostrum velit laboriosam? Officiis
              eaque iste aspernatur!
            </p>
          </div>
        </div>
        <div className="container flex-wrap justify-between  ">
          <div className="card">
            <Image
              src={"/assets/carousel_placeholder.avif"}
              alt="baju"
              width={500}
              height={500}
              className="item"
            ></Image>
            <h1 className="tag">Sweater</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos quae
              quasi voluptatem voluptate officia a sunt excepturi. Perspiciatis
              facilis quo modi nulla facere nostrum velit laboriosam? Officiis
              eaque iste aspernatur!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
