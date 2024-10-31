import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUp } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import OrderConfirmationSkeleton from "./loader";
import { Order } from "../../types/order";
import useFetch from "../../lib/hooks/http/useFetch";
import { formatCurrency } from "../../utils/currency";
import { formatDateTime } from "../../utils/data-time";

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

  const paintPaymentDetails = (data: Order) => {
    if (data.payment_method === "BANK_TRANSFER") {
      return (
        <div className="">
          <div>
            <h3 className="font-semibold pb-2 text-gray-900">
              You've selected to transfer money to our account
            </h3>
            <p><span className="font-medium text-gray-800">Account Number:</span> {process.env.REACT_APP_MAX_STORE_ACCOUNT_NUMBER}</p>
            <p><span className="font-medium text-gray-800">Account Name:</span> {process.env.REACT_APP_MAX_STORE_ACCOUNT_NUMBER}</p>
            <p><span className="font-medium text-gray-800">Bank:</span> {process.env.REACT_APP_MAX_STORE_BANK_NAME}</p>
            <p><span className="font-medium text-gray-800">Branch:</span> {process.env.REACT_APP_MAX_STORE_BRANCH}</p>
          </div>
          <div className="py-2">
            <p className="">
              Please transfer the total amount of{" "}
              {formatCurrency(data.total || 0)} to the above account and share
              the payment slip through whatsapp to {process.env.REACT_APP_MAX_STORE_CONTACT_NUMBER} or email to {process.env.REACT_APP_MAX_STORE_EMAIL}
            </p>
          </div>
        </div>
      );
    } else if (data.payment_method === "CREDIT_CARD") {
      return (
        <div className="">
          <div>
            <h3 className="font-semibold pb-2 text-gray-700">
              You've selected to pay with your credit card
            </h3>
            <p><span className="font-medium">Card Type:</span> Visa</p>
            <p><span className="font-medium">Payment Status:</span> Successful</p>
            <p><span className="font-medium">Payment Amount:</span> {formatCurrency(0)}</p>
            <p><span className="font-medium">Paid At:</span> Successful</p>
           
          </div>
          <div className="py-2"></div>
        </div>
      );
    } else if (data.payment_method === "CASH_ON_DELIVERY") {
      return (
        <div className="">
          <div>
            <h3 className="font-semibold pb-2 text-gray-700">
              You've selected to pay with cash on delivery
            </h3>
            <p className="">
              Please prepare the total amount of{" "}
              {formatCurrency(data.total || 0)} to pay the delivery person when
              your order arrives.
            </p>
          </div>
          <div className="py-2"></div>
        </div>
      );
    }
  }

  if (isLoading && !data) {
    return <OrderConfirmationSkeleton />;
  }

  if (data && data.data.order_status !== "CONFIRMED") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Something went wrong!</h1>
        <p className="text-xl mb-4">
          Your order was not placed successfully. Please try again.
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Thank you!</h1>
      <p className="text-xl mb-4">Your order was placed successfully.</p>
      <p className="mb-2">
        We have sent the order confirmation details to {data?.data.guest_email}.
      </p>
      {data?.data && <p className="mb-2">Order date: {formatDateTime(data?.data.created_at)}</p>}
      <p className="mb-4 text-blue-600">Order number: {orderId}</p>

      <h2 className="text-2xl font-bold mb-4">Summary</h2>
      {data?.data.items.map((item) => (
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-md">
            <img
              src={item.imageurl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">
              Variant: {item.variant} only
            </p>
            <div className="flex items-center space-x-2">
              {/* <span className="text-sm line-through text-gray-500">
                $600.00
              </span> */}
              <span className="font-semibold">
                {formatCurrency(item.price)}
              </span>
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
          <span>{formatCurrency(data?.data.delivery_fee || 0)}</span>
        </div>
        <div className="flex justify-between">
          <span>Handling Fee</span>
          <span>{formatCurrency(data?.data.handling_fee || 0)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatCurrency(data?.data.total || 0)}</span>
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
          <p>
            {data?.data.delivery_method} (
            {formatCurrency(data?.data.delivery_fee || 0)})
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>

      <div className="container mx-auto py-2 animate-">
          <div className="gap-8">
            <div className="md:col-span-2 space-y-6">
                  {data?.data && paintPaymentDetails(data?.data)}
            </div>
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
                } h-5 w-5 text-gray-800`}
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
