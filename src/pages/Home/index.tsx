import { useEffect, useState } from "react";
import ItemCarousel from "../../components/ItemCarousel";
import { Item } from "../../types/item";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_HOST}/item`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setItems(data);
        }
      });
  }, []);

  return (
    <div>
      <div className="bg-ivory">
        <main className="container mx-auto px-6 py-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-6xl font-bold mb-4">SALE</h2>
            <p className="text-xl mb-6">
              Incredible deals. Top-of-the-line design for less.
            </p>
            <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
              See our big sale
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Modern furniture set"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </main>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-left mb-2">
          To Plant a Garden is To Believe in Tomorrow
        </h1>
        <p className="text-left text-gray-600 mb-8">
          Our plants are sure to brighten up your home (and your future).
        </p>

        <ItemCarousel items={items} />
      </div>
    </div>
  );
}
