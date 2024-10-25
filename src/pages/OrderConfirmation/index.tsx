import React, { useEffect, useMemo, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUp } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import OrderConfirmationSkeleton from "./loader";
import { Order } from "../../types/order";
import useFetch from "../../lib/hooks/http/useFetch";
import { formatCurrency } from "../../utils/currency";

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);

  const { data, loading } = useFetch<{ data: Order; success: boolean }>(
      `orders/${orderId}`
    );

  setTimeout(() => {
    setIsLoading(false);
  }, 500);
  // fetch order details

  if (isLoading && !data) {
    return <OrderConfirmationSkeleton />;
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Thank you!</h1>
      <p className="text-xl mb-4">Your order was placed successfully.</p>
      <p className="mb-2">
        We have sent the order confirmation details to {data?.data.guest_email}.
      </p>
      <p className="mb-2">Order date: {data?.data.created_at}</p>
      <p className="mb-4 text-blue-600">Order number: {orderId}</p>

      <h2 className="text-2xl font-bold mb-4">Summary</h2>
        {data?.data.items.map((item) => (
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">Variant: {item.variant} only</p>
            <div className="flex items-center space-x-2">
              {/* <span className="text-sm line-through text-gray-500">
                $600.00
              </span> */}
              <span className="font-semibold">{formatCurrency(item.price)}</span>
            </div>
            <p className="text-sm text-gray-500">{item.quantity}x</p>
          </div>
      </div>
        ))}

      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(data?.data.sub_total || 0)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{formatCurrency(0)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes</span>
          <span>{formatCurrency(data?.data.tax || 0)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatCurrency(data?.data.total_price || 0)}</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Delivery</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <h3 className="font-semibold">Shipping Address</h3>
          <p>{data?.data.delivery_address}</p>
          <p>{data?.data.delivery_city}</p>
          <p>{data?.data.phone_no}</p>
         
        </div>
        <div>
          <h3 className="font-semibold">Contact</h3>
          <p>d@gmail.com</p>
        </div>
        <div>
          <h3 className="font-semibold">Method</h3>
          <p>{data?.data.delivery_method} ({formatCurrency(data?.data.delivery_fee || 0)})</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-semibold">Payment method</h3>
          <p>{data?.data.payment_method}</p>
        </div>
        <div>
          <h3 className="font-semibold">Payment details</h3>
          <p>
            $2,208.00 paid {data?.data.order_status} at Tue Oct 08 2024 10:21:46 GMT+0000 (Coordinated
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
