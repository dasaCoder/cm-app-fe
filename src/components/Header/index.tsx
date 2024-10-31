import { User, ShoppingCart, Search, Menu } from "lucide-react";
import React from "react";
import { toggleCart } from "../../lib/features/cart/cart-slice";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { Cart } from "../Cart";
import { Link } from "react-router-dom";
import { toggleMobileNav } from "../../lib/features/app/app-slice";
import { MobileSideNav } from "./MobileSideNav";

export const navItems = [
  {
    title: "Shop",
    link: "/shop",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

const Header = () => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  const handleToggleMobileNav = () => {
    dispatch(toggleMobileNav());
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

      <div className="flex flex-grow justify-center hidden md:flex">
        <div className="relative w-full max-w-xs">
          <ul className="flex items-center justify-center space-x-4">
            {navItems.map((item) => (
              <li className="px-4" key={item.title}>
                <Link
                  to={item.link}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <User className="text-gray-600" size={24} />
        <div className="relative flex items-center">
          <button onClick={handleToggleCart}>
            <ShoppingCart className="text-gray-600" size={24} />
          </button>
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {items.length}
          </span>
        </div>
        <button className="md:hidden" onClick={handleToggleMobileNav}>
          <Menu className="text-gray-600" size={24} />
        </button>
      </div>

      <Cart />
      <MobileSideNav />
    </header>
  );
};

export default Header;
