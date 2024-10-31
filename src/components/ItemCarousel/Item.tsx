import { ShoppingCart } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/currency";
import { Link } from "react-router-dom";

interface ItemProps {
  id: string;
  name: string;
  price: number;
  imageurl: string;
  discount?: number;
}

const Item: React.FC<ItemProps> = ({
  id,
  name,
  price,
  imageurl,
  discount = 5,
}) => {
  const router = useNavigate();

  const handleAddToCart = (id: string) => {
    router({ pathname: `/item/${id}` });
  };

  return (
    <Link to={`/item/${id}`}>
    <div className="bg-ivory rounded-lg shadow-md overflow-hidden m-1">
      <div className="relative group">
        <img
          src={imageurl}
          alt={name}
          className="w-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-2 group-hover:translate-y-1"
        />
        {discount && (
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold rounded-full px-2 py-3">
            -{discount}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <div className="flex items-center justify-between">
          {discount ? (
            <div className="flex items-baseline">
              <span className="text-gray-500 line-through text-sm">
                {formatCurrency(price)}
              </span>
              <span className="text-green-600 font-bold ml-2">
                {formatCurrency(price * (1 - discount / 100))}
              </span>
            </div>
          ) : (
            <span className="text-green-600 font-bold">
              €{price.toFixed(2)}
            </span>
          )}

          <span
            className="px-2 py-1 rounded-md"
          >
            <ShoppingCart className="text-teal" size={24} />
          </span>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default Item;
