import Card, { type Item } from "@/components/card";
import Carousel from "@/components/carousel";
import { getItems } from "./action";

export default async function Home() {
  let items: Item[] = [];

  try {
    items = await getItems();
  } catch (error) {
    console.log(error);
  }

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
