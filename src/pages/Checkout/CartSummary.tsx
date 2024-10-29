import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '@headlessui/react';
import { CartItem } from '../../lib/features/cart/cart-slice';

interface DeliveryMethod {
  price: number;
}

interface CartComponentProps {
  items: CartItem[];
  subtotal: number;
  total: number;
  selectedDeliveryMethod: DeliveryMethod;
  formatCurrency: (value: number) => string;
  handleDiscount: () => void;
}

const CartInfo: React.FC<CartComponentProps> = ({
  items,
  subtotal,
  total,
  selectedDeliveryMethod,
  formatCurrency,
  handleDiscount,
}) => {
  
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>In your Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{formatCurrency(selectedDeliveryMethod.price)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>{formatCurrency(0)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            {items.map((item) => (
              <div className="border-t pt-4" key={item.id}>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-md">
                    <img
                      src={item.imageurl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{item.quantity}x</p>
                  </div>
                </div>
              </div>
            ))}
            <input
              placeholder="Add gift card or discount code"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            <Button
              className="w-full border border-gray-600 p-1.5 rounded hover:bg-teal hover:text-white hover:border-teal"
              onClick={handleDiscount}
            >
              Apply
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartInfo;
