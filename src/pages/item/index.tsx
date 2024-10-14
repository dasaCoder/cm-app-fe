import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Item } from "../../types/item";
import { ChevronRight } from "lucide-react";

type ItemParams = {
  id: string;
};

const ItemComponent: React.FC = () => {
  const { id } = useParams<ItemParams>();
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    fetch(`http://localhost:3000/item/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
      });
  }, []);

  const paintItem = (item: Item) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={item.imgUrl}
            alt="Horizon Gaze Sunglasses"
            className="w-full bg-ivory h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
          <p className="text-2xl font-semibold mb-4">{item.price}</p>
          <p className="text-gray-600 mb-6">{item.description}</p>
          <button className="w-full bg-teal text-white py-3 rounded-md hover:bg-blue-700 transition-colors">
            Add to cart
          </button>
        </div>
      </div>
    );
  }

  const paintItemLoading = () => {
    return (<div>loading...</div>);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="text-sm mb-6">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              All products
            </a>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          </li>
          <li className="flex items-center">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Flowers
            </a>
          </li>
        </ol>
      </nav>

      {item ? paintItem(item) : paintItemLoading()}

      
    </div>
  );
};

export default ItemComponent;
