import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Item } from "../../types/item";
import { ChevronRight } from "lucide-react";
import { formatCurrency } from "../../utils/currency";
import { useAppDispatch } from "../../lib/hooks";
import { addItem } from "../../lib/features/cart/cart-slice";
import ItemCarousel from "../../components/ItemCarousel";

type ItemParams = {
  id: string;
};

const ItemComponent: React.FC = () => {
  const { id } = useParams<ItemParams>();
  const [item, setItem] = useState<Item>();
  const [suggestedItems, setSuggestedItems] = useState<Item[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_HOST}/item/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
      });

    fetch(`${process.env.REACT_APP_BACKEND_HOST}/item`)
      .then((response) => response.json())
      .then((data) => {
        setSuggestedItems(data);
      });
  }, [id]);

  const handleAddToCart = () => {
    item && dispatch(addItem({ ...item, id: item?._id, quantity: 1 }));
  };

  const paintItem = (item: Item) => {
    return (
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={item.imgUrl}
            alt="Horizon Gaze Sunglasses"
            className="w-full bg-ivory h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
          <p className="text-xl font-semibold mb-4">
            {formatCurrency(item.price)}
          </p>
          <p className="text-gray-600 mb-6">{item.description}</p>
          <button
            onClick={handleAddToCart}
            className="w-full bg-teal text-white py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Add to cart
          </button>
        </div>
      </div>
    );
  };

  const paintItemLoading = () => {
    return <div>loading...</div>;
  };

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

      <h2 className="text-2xl font-bold mt-8 mb-4">Suggested items</h2>
      <ItemCarousel items={suggestedItems} />
    </div>
  );
};

export default ItemComponent;
