import Image from "next/image";

export type Item = {
  ID: number;
  name: string;
  price: number;
  imgurl: string;
  desc: string;
};

export default function Card({ item }: { item: Item }) {
  return (
    <div className="card flex">
      <div>
        <Image
          src={item.imgurl}
          alt="baju"
          width={500}
          height={500}
          className="item rounded-xl"
        ></Image>
        <h1 className="text-center py-3 font-bold">{item.name}</h1>
        <p className="text-center">{item.desc}</p>
      </div>
    </div>
  );
}
