import Button from "@/components/button";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getItemById } from "./action";
import SizePicker from "@/components/SizePicker";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function ProductDetail({ params }: PageProps) {
  const id = +params.id;
  const product = await getItemById(id);

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <div className="flex m-auto items-center text-center bg-slate-900 h-screen justify-center">
        <div className="flex m-auto p-auto rounded-lg bg-white w-3/4 h-5/6 drop-shadow-2xl">
          <Image
            src={product.imgurl}
            alt={product.name}
            width={500}
            height={500}
            className="object-cover rounded-l-lg"
          />
          <div className="flex flex-col w-full p-2 gap-2">
            <div className="font-semibold text-2xl p-2">{product.name}</div>
            <div className="">{product.desc}</div>
            <div className="flex flex-col gap-2">
              <p className="p-1">Available sizes</p>
              <SizePicker />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
