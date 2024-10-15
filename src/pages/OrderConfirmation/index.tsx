import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUp } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import OrderConfirmationSkeleton from "./loader";

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 5000);
  // fetch order details

  if (isLoading) {
    return <OrderConfirmationSkeleton />;
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Thank you!</h1>
      <p className="text-xl mb-4">Your order was placed successfully.</p>
      <p className="mb-2">
        We have sent the order confirmation details to d@gmail.com.
      </p>
      <p className="mb-2">Order date: Tue Oct 08 2024</p>
      <p className="mb-4 text-blue-600">Order number: 7135</p>

      <h2 className="text-2xl font-bold mb-4">Summary</h2>
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
        <div>
          <h3 className="font-semibold">Corporate Commando Throne</h3>
          <p className="text-sm text-gray-500">Variant: Height only</p>
          <div className="flex items-center space-x-2">
            <span className="text-sm line-through text-gray-500">$600.00</span>
            <span className="font-semibold">$550.00</span>
          </div>
          <p className="text-sm text-gray-500">4x</p>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$2,200.00</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>$8.00</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>$2,208.00</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Delivery</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <h3 className="font-semibold">Shipping Address</h3>
          <p>fghfghg ghfghg</p>
          <p>fghfghg</p>
          <p>45612, njjk</p>
          <p>US</p>
        </div>
        <div>
          <h3 className="font-semibold">Contact</h3>
          <p>d@gmail.com</p>
        </div>
        <div>
          <h3 className="font-semibold">Method</h3>
          <p>FakeEx Standard ($8.00)</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-semibold">Payment method</h3>
          <p>Test payment</p>
        </div>
        <div>
          <h3 className="font-semibold">Payment details</h3>
          <p>
            $2,208.00 paid at Tue Oct 08 2024 10:21:46 GMT+0000 (Coordinated
            Universal Time)
          </p>
        </div>
      </div>

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
              <span>Need help?</span>
              <ChevronUp
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              <p className="mb-2">Contact</p>
              <p>Returns & Exchanges</p>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
