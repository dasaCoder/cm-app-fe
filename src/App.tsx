import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Home from './pages/Home';
import Item from './pages/item';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
