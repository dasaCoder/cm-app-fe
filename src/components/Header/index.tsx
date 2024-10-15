import { ChevronDown, User, ShoppingCart, Search } from "lucide-react";
import React from "react";
import { toggleCart } from "../../lib/features/cart/cart-slice";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { Cart } from "../Cart";

const Header = () => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  return (
    <header
      className="bg-white py-4 px-6 flex items-center justify-between"
      style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-center space-x-6">
        <a href="/" className="">
          <span className="sr-only">Max Store</span>
          <img
            alt="Max Store"
            src={"/images/mini-max-logo.png"}
            className={"h-[40px]"}
          />
        </a>
      </div>

      <div className="flex flex-grow justify-center">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-[50px] focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <User className="text-gray-600" size={24} />
        <div className="relative">
          <button onClick={handleToggleCart}>
            <ShoppingCart className="text-gray-600" size={24} />
          </button>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {items.length}
          </span>
        </div>
      </div>

      <Cart />
    </header>
  );
};

export default Header;
