import React from "react";

const Header = () => {
  

  return (
    <header
      className="bg-white py-4 px-6 flex items-center justify-between"
      style={{ boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-center space-x-6">
        <a href="/" className="">
          <span className="">Contact Book</span>
          
        </a>
      </div>
    </header>
  );
};

export default Header;
