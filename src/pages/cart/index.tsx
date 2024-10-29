import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { RootState } from '../../lib/store';
import { Trash2, Plus, Minus, HelpCircle } from 'lucide-react';
import { removeItem, updateQuantity } from '../../lib/features/cart/cart-slice';
import { formatCurrency } from '../../utils/currency';

const Cart: React.FC = () => {
  const [searchParams] = useSearchParams();
  const cartId = searchParams.get('cartId');

    const { items, subtotal } = useAppSelector((state: RootState) => state.cart);
    const dispatch = useAppDispatch();
    const router = useNavigate();
  
    const handleQuantityChange = (id: string, quantity: number) => {
      if(quantity === 0 ){
        dispatch(removeItem(id))
      }
      if (quantity < 1) return;
      dispatch(updateQuantity({ id, quantity }));
    };
  
    return (
        <div className="container mx-auto px-4 py-8 text-dark">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <h1 className="text-3xl font-bold mb-6">Cart</h1>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Item</th>
                    <th className="text-left py-2">Quantity</th>
                    <th className="text-left py-2">Price</th>
                    <th className="text-left py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr className="border-b" key={item.id}>
                      <td className="py-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.imageurl}
                            alt="Corporate Commando Throne"
                            width={80}
                            height={80}
                            className="rounded-md"
                          />
                          <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              Variant: Height only
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 rounded-md hover:bg-gray-100">
                            <Trash2
                              className="w-5 h-5 text-gray-400"
                              onClick={() => {}}
                            />
                          </button>
  
                          <div
                            className="inline-flex rounded-md shadow-sm"
                            role="group"
                          >
                            <button
                              type="button"
                              className="px-4 py-2 border border-gray-200 hover:bg-gray-100 hover:text-blue-700 rounded-s-lg"
                              onClick={()=> handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4 " />
                            </button>
                            <button
                              type="button"
                              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 "
                            >
                              <input
                                className="appearance-none w-3 bg-white"
                                value={item.quantity}
                                readOnly
                              />
                            </button>
                            <button
                              type="button"
                              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 "
                              onClick={()=> handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-4 h-4 " />
                            </button>
                          </div>
  
                          <div className="relative">
                            <button
                              className="w-4 h-4"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                            ></button>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        {/* <p className="line-through text-gray-400">$600.00</p> */}
                        <p className="text-dark-600">
                          {formatCurrency(item.price)}
                        </p>
                      </td>
                      <td className="py-4">
                        {/* <p className="line-through text-gray-400">$2,400.00</p> */}
                        <p>{formatCurrency(item.price * item.quantity)}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-bold mb-6">Summary</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{formatCurrency(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>{formatCurrency(0)}</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <button className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors" onClick={()=> router('/checkout')}>
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
    );
};

export default Cart;
