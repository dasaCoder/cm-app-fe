import { ShoppingCart } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ItemProps {
_id: string;
  name: string;
  price: number;
  imgUrl: string;
  discount?: number;
}

const Item: React.FC<ItemProps> = ({ _id, name, price, imgUrl, discount }) => {
  const router = useNavigate();

  const handleAddToCart = (id: string) => {
    router({ pathname: `/item/${_id}` });
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img src={imgUrl} alt={name} className="w-full object-cover" />
        {/* {discount && (
      <div className="absolute top-2 right-2 bg-green-800 text-white text-xs font-bold rounded-full p-2">
        -{discount}%
      </div>
    )} */}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <div className="flex items-center justify-between">
          {discount ? (
            <div className="flex items-baseline">
              <span className="text-gray-500 line-through text-sm">
                €{price.toFixed(2)}
              </span>
              <span className="text-green-600 font-bold ml-2">
                €{(price * (1 - discount / 100)).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-green-600 font-bold">
              €{price.toFixed(2)}
            </span>
          )}

          <button className="px-2 py-1 rounded-md" onClick={() => handleAddToCart(_id)}>
            <ShoppingCart className="text-green-600" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
