import Image from "next/image";

export type Item = {
  id: number;
  name: string;
  img: string;
  description: string;
};

export default function Card({ item }: { item: Item }) {
  return (
    <div className="card flex">
      <div>
        <Image
          src={item.img}
          alt="baju"
          width={500}
          height={500}
          className="item rounded-xl"
        ></Image>
        <h1 className="text-center py-3 font-bold">{item.name}</h1>
        <p className="text-center">{item.description}</p>
      </div>
    </div>
  );
}
