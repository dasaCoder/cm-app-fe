import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Item } from "../../types/item";
import { ChevronRight, Loader, Minus, Plus } from "lucide-react";
import { formatCurrency } from "../../utils/currency";
import { useAppDispatch } from "../../lib/hooks";
import { addItem } from "../../lib/features/cart/cart-slice";
import ItemCarousel from "../../components/ItemCarousel";
import useFetch from "../../lib/hooks/http/useFetch";
import ItemPageSkeleton from "./ItemPageSkeleton";

type ItemParams = {
  id: string;
};

const ItemComponent: React.FC = () => {
  const { id } = useParams<ItemParams>();
  const [quantity, setQuantity] = useState(1);
  const [isCartUpdating, setCartUpdating] = useState(false);

  const { data: item, loading, error } = useFetch<Item>(`items/${id}`);
  const {
    data: suggestedItems,
    loading: isSuggestedItemsLoading,
    error: suggestedItemsError,
  } = useFetch<Item[]>(`items`);

  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    setCartUpdating(true);
    setTimeout(() => {
      item && dispatch(addItem({ ...item, id: item?.id, quantity }));
      setCartUpdating(false);
    }, 1000);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setQuantity(quantity);
  };

  const paintItem = (item: Item) => {
    return (
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={item.imageurl}
            alt={item.name}
            className="w-full bg-ivory h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
          <p className="text-xl font-semibold mb-4">
            {formatCurrency(item.price)}
          </p>
          <p className="text-gray-600 mb-6">{item.description}</p>

          <div className="inline-flex rounded-md shadow-sm mb-4" role="group">
            <button
              type="button"
              className="px-4 py-2 border border-gray-200 hover:bg-gray-100 hover:text-blue-700 rounded-s-lg"
              onClick={() => handleQuantityChange(item.id, quantity + 1)}
            >
              <Plus className="w-4 h-4 " />
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 "
            >
              <input
                className="appearance-none w-3 bg-white"
                value={quantity}
                readOnly
              />
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 "
              onClick={() => handleQuantityChange(item.id, quantity - 1)}
            >
              <Minus className="w-4 h-4 " />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isCartUpdating}
            className="flex items-center justify-center bg-teal text-white py-2 px-8 rounded-md hover:shadow-md transition-colors disabled:bg-gray-300"
          >
            {isCartUpdating && <Loader className="animate-spin mr-3"/>}
            Add to cart
          </button>
        </div>
      </div>
    );
  };

  const paintItemLoading = () => {
    return <ItemPageSkeleton />;
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

      {suggestedItems && item && (
        <h2 className="text-2xl font-bold mt-8 mb-4">Suggested items</h2>
      )}
      {suggestedItems && item && <ItemCarousel items={suggestedItems} />}
    </div>
  );
};

export default ItemComponent;
