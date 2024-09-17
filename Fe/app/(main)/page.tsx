import Card, { Item } from "@/components/card";
import Carousel from "@/components/carousel";

export default async function Home() {
  return (
    <>
      <Carousel />

      <div className="bg-gray-900">
        <h1 className="card-title drop-shadow-2xl text-2xl text-center pt-5 mx-3 font-semibold text-white">
          Search by item
        </h1>
        <div>
          <div className="grid grid-cols-3 gap-11 p-10 justify-between ">
            {items.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

let items: Item[] = [
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
