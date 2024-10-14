import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Cart: React.FC = () => {
  const [searchParams] = useSearchParams();
  const cartId = searchParams.get('cartId');

  return (
    <div className="p-4">
      <h1 className="text-2xl">Cart Page</h1>
      <p>Cart ID: {cartId}</p>
    </div>
  );
};

export default Cart;
