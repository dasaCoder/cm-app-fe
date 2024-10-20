import {
  Button,
  RadioGroup,
  Radio,
  Select,
} from "@headlessui/react";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  InfoIcon,
  Loader,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { useFormik } from "formik";
import checkoutFormSchema from "../../lib/validation-schemas/checkout-form";
import { cn } from "../../utils/tailwind";
import { addDecimalPoints, formatCurrency } from "../../utils/currency";
import { useAppSelector } from "../../lib/hooks";
import { useNavigate } from "react-router-dom";
import { stringToMD5 } from "../../utils/crypto";
import TextInput from "../../components/input/Input";
import CartInfo from "./CartSummary";
import TextAreaInput from "../../components/input/text-area";
import usePost from "../../lib/hooks/http/usePost";

enum CurrentStep {
  "DELIVERY_DETAILS",
  "DELIVERY_ADDRESS",
  "DELIVERY",
  "PAYMENT",
  "REVIEW",
  "PAYMENT_CONFIRMATION",
  "ORDER_PLACED",
}

const Checkout: React.FC = () => {
  const merchantId = process.env.REACT_APP_PAYHERE_MERCHANT_ID || "";
  const returnURl = process.env.REACT_APP_PAYHERE_RETURN_URL || "";
  const cancelUrl = process.env.REACT_APP_PAYHERE_CANCEL_URL || "";
  const notifyUrl = process.env.REACT_APP_PAYHERE_NOTIFY_URL || "";
  const payhereSecret = process.env.REACT_APP_PAYHERE_SECRET_KEY || "";

  const { items, subtotal } = useAppSelector((state) => state.cart);
  const [currentStep, setCurrentStep] = useState<CurrentStep>(
    CurrentStep.DELIVERY_DETAILS
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [payhereHash, setPayhereHash] = useState("");
  const [orderId, setOrderId] = useState("");
  const { sendRequest: sendPlaceOrderRequest, loading, data: placeOrderResponse } = usePost<{data: {id: string}}>("orders", {});

  const randomUUID = () => {
    return `${new Date().getTime()}`;
  }

  const generatePayhereHash = (
    merchantId: string,
    orderId: string,
    amount: number,
    secret: string
  ) => {
    return stringToMD5(
      `${merchantId}${orderId}${addDecimalPoints(amount)}LKR${stringToMD5(
        secret
      ).toUpperCase()}`
    ).toUpperCase();
  };

  useEffect(() => {
    const hash = generatePayhereHash(
      merchantId,
      orderId,
      subtotal,
      payhereSecret
    );
    setPayhereHash(hash);
  }, [orderId]);

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  const router = useNavigate();

  const deliveryMethodList = [
    {
      id: "1",
      name: "Standard Delivery",
      description: "Within 72 Hours",
      price: 300,
    },
    {
      id: "2",
      name: "Express Delivery",
      description: "Within 30 Hours inside colombo",
      price: 600,
    },
  ];

  const paymentMethodList = [
    {
      id: "1",
      name: "Debit / Credit Card",
      description: "Visa, Mastercard, American Express",
      icon: "images/icons/credit-card.png",
    },
    {
      id: "2",
      name: "Bank Transfer",
      description: "Make your payment directly into our bank account",
      icon: "images/icons/bank-transfer.png",
    },
    {
      id: "3",
      name: "Cash on Delivery",
      description: "Pay with cash upon delivery",
      icon: "images/icons/cash-on-delivery.png",
    },
  ];

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethodList[0]
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethodList[0]
  );

  const formik = useFormik({
    validationSchema: checkoutFormSchema,
    initialValues: {
      first_name: "",
      last_name: "",
      address: "",
      city: "",
      state: "",
      phone: "",
      deliveryMethod: "1",
      locationType: "Home",
      deliveryDate: "",
      sendersName: "",
      sendersPhone: "",
      sendersEmail: "",
      specialMsg: "",
      deliveryInstructions: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleValidate = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
      setIsProcessing(true);

      setTimeout(() => {
        setCurrentStep(CurrentStep.DELIVERY);
        setIsProcessing(false);
      }, 3000);
    }
  };

  const handleGoToPayment = () => {
    setCurrentStep(CurrentStep.PAYMENT);
  };

  const handleReview = () => {
    setCurrentStep(CurrentStep.REVIEW);
  };

  const handleDeliveryEdit = () => {
    setCurrentStep(CurrentStep.DELIVERY);
  };

  const handleDiscount = () => {
    console.log("Discount applied");
  };

  const handlePayAction = () => {
    console.log("Payment action");
    setIsProcessing(true);
    console.log({
      ...formik.values,
      deliveryMethod: selectedDeliveryMethod.id,
      paymentMethodList: selectedPaymentMethod.id,
    });
    setTimeout(async () => {

      await sendPlaceOrderRequest({
        guest_email: formik.values.sendersEmail,
        delivery_city: formik.values.city,
        delivery_address: formik.values.address,
        delivery_fee: selectedDeliveryMethod.price,
        handling_fee: 0,
        tax: 0,
        discounted_amount: 0,
        total_price: subtotal + selectedDeliveryMethod.price,
        items: items.map((item) => ({
          item_id: item.id,
          quantity: item.quantity,
          variant: "sm",
          price: item.price,
        })),
      });

      if (placeOrderResponse) {
        setOrderId(placeOrderResponse.data.id);
        const form = document.getElementById("checkoutForm") as HTMLFormElement;
        if (form) {
          form.submit();
        }
      } else {
        alert("Something went wrong");
      }
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Details</CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep !== CurrentStep.DELIVERY_DETAILS && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold">Delivery Address</h3>
                      <p>{formik.values.address}</p>
                      <p>{formik.values.city}</p>
                      <p>{`${formik.values.state}`}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Contact</h3>
                      <p>{`${formik.values.sendersEmail}, ${formik.values.sendersPhone}`}</p>
                    </div>
                  </div>
                  <Button
                    className="text-blue-500 text-sm mt-3"
                    onClick={() => setCurrentStep(CurrentStep.DELIVERY_DETAILS)}
                  >
                    Edit
                  </Button>
                </>
              )}
              {currentStep === CurrentStep.DELIVERY_DETAILS && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <TextInput
                      label="Recipient's first name"
                      placeholder="Max"
                      field={formik.getFieldProps("first_name")}
                      meta={formik.getFieldMeta("first_name")}
                    />

                    <TextInput
                      label="Recipient's last name"
                      placeholder="Dasanayaka"
                      field={formik.getFieldProps("last_name")}
                      meta={formik.getFieldMeta("last_name")}
                    />
                    <TextInput
                      label="Recipient's contact number"
                      placeholder="0713252XXX"
                      field={formik.getFieldProps("phone")}
                      meta={formik.getFieldMeta("phone")}
                    />
                    <TextInput
                      label="Delivery Date"
                      placeholder="21/10/2024"
                      field={formik.getFieldProps("deliveryDate")}
                      meta={formik.getFieldMeta("deliveryDate")}
                    />
                  </div>
                  <TextAreaInput
                    label="Delivery address"
                    rows={3}
                    field={formik.getFieldProps("address")}
                    meta={formik.getFieldMeta("address")}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Delivery city
                      </label>
                      <div className="relative">
                        <Select
                          name="city"
                          value={formik.values.city}
                          onChange={formik.handleChange}
                          className="appearance-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value=""></option>
                          <option value="colombo1">Colombo 1</option>
                          <option value="dehiwala">Dehiwala</option>
                          <option value="mtlavinia">Mount Lavinia</option>
                        </Select>
                        <ChevronDownIcon
                          className="group pointer-events-none absolute top-2.5 right-2.5 size-5 fill-white/60"
                          aria-hidden="true"
                        />
                      </div>
                      {formik.touched && formik.errors.city && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="locationType"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Delivery location type
                      </label>
                      <div className="relative">
                        <Select
                          name="locationType"
                          value={formik.values.locationType}
                          onChange={formik.handleChange}
                          className="appearance-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="Home">Home</option>
                          <option value="Office">Office</option>
                        </Select>
                        <ChevronDownIcon
                          className="group pointer-events-none absolute top-2.5 right-2.5 size-5 fill-white/60"
                          aria-hidden="true"
                        />
                      </div>
                      {formik.errors.locationType && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.locationType}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={billingAddressSame}
                      onChange={setBillingAddressSame}
                      className="group size-5 rounded-md bg-white/10 p-1 ring-1 ring-gray/15 ring-inset data-[checked]:bg-white"
                    >
                      <CheckIcon className="hidden size-3 group-data-[checked]:block" />
                    </Checkbox>
                    <label htmlFor="billingAddress">
                      Billing address same as Delivery address
                    </label>
                  </div> */}
                </div>
              )}
            </CardContent>
          </Card>
          {currentStep === CurrentStep.DELIVERY_DETAILS && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Sender's Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <TextInput
                      label="Sender's name"
                      placeholder="Jessy"
                      field={formik.getFieldProps("sendersName")}
                      meta={formik.getFieldMeta("sendersName")}
                    />
                    <TextInput
                      label="Sender's email"
                      placeholder="jessy@gmail.com"
                      field={formik.getFieldProps("sendersEmail")}
                      meta={formik.getFieldMeta("sendersEmail")}
                    />
                    <TextInput
                      label="Sender's contact number"
                      placeholder="0773252XXX"
                      field={formik.getFieldProps("sendersPhone")}
                      meta={formik.getFieldMeta("sendersPhone")}
                    />
                  </div>

                  <TextAreaInput
                    label="Special Message"
                    rows={3}
                    field={formik.getFieldProps("specialMsg")}
                    meta={formik.getFieldMeta("specialMsg")}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div className="text-sm pt-5 pb-3">
                    <p>
                      By clicking the Continue to delivery button, you confirm
                      that you have read, understand and accept our Terms of
                      Use, Terms of Sale and Returns Policy and acknowledge that
                      you have read Medusa Store's Privacy Policy.{" "}
                      {JSON.stringify(formik.errors)}
                      <a href="#" className="text-blue-500 hover:underline">
                        Privacy & policy
                      </a>
                    </p>
                  </div>
                  <Button
                    className="flex items-center justify-center bg-teal text-white py-2 px-8 rounded-md hover:shadow-md transition-colors disabled:bg-gray-300"
                    onClick={handleValidate}
                    disabled={formik.dirty && formik.isValid ? false : true}
                  >
                    {isProcessing && <Loader className="animate-spin mr-3" />}
                    Continue to delivery
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Delivery
                <InfoIcon className="w-4 h-4 ml-2 text-blue-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep !== CurrentStep.DELIVERY && (
                <>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Method</h3>
                      <p>
                        {selectedDeliveryMethod.name}{" "}
                        <span className="text-gray-600 text-sm">
                          ( {formatCurrency(selectedDeliveryMethod.price)} )
                        </span>
                      </p>
                    </div>
                  </div>
                  <Button
                    className="text-blue-500 text-sm mt-3"
                    onClick={handleDeliveryEdit}
                  >
                    Edit
                  </Button>
                </>
              )}

              {currentStep === CurrentStep.DELIVERY && (
                <div className="w-full">
                  <div className="w-full">
                    <RadioGroup
                      value={selectedDeliveryMethod}
                      onChange={setSelectedDeliveryMethod}
                      aria-label="Server size"
                      className="space-y-2"
                    >
                      {deliveryMethodList.map((plan) => (
                        <Radio
                          key={plan.id}
                          value={plan}
                          className="group relative flex cursor-pointer rounded-lg bg-white py-4 px-5 mb-4 text-teal shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-teal data-[checked]:bg-ivory"
                        >
                          <div className="flex w-full items-center justify-between">
                            <div className="text-sm/6">
                              <p className="font-semibold text-teal">
                                {plan.name}
                              </p>
                              <div className="flex gap-2 text-teal/50">
                                <div>{plan.description}</div>
                                <div aria-hidden="true">&middot;</div>
                                <div>{formatCurrency(plan.price)}</div>
                              </div>
                            </div>
                            <CheckCircleIcon
                              className={cn(
                                "size-5 text-teal transition",
                                selectedDeliveryMethod.id === plan.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </div>
                        </Radio>
                      ))}
                    </RadioGroup>
                  </div>

                  <Button
                    className="bg-teal text-white my-5 py-2 px-8 rounded-md hover:shadow-md transition-colors"
                    onClick={handleGoToPayment}
                  >
                    Continue to payment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                Payment
                <InfoIcon className="w-4 h-4 ml-2 text-blue-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep !== CurrentStep.PAYMENT && (
                <>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Payment method</h3>
                      <p>{selectedPaymentMethod.name}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Payment details</h3>
                      <p>{selectedPaymentMethod.description}</p>
                    </div>
                  </div>
                  <Button
                    className="mt-4 text-sm text-blue-500"
                    onClick={handleGoToPayment}
                  >
                    Edit
                  </Button>
                </>
              )}

              {currentStep === CurrentStep.PAYMENT && (
                <div className="w-full">
                  <div className="w-full">
                    <RadioGroup
                      value={selectedDeliveryMethod}
                      onChange={setSelectedDeliveryMethod}
                      aria-label="Server size"
                      className="space-y-2"
                    >
                      {paymentMethodList.map((paymentMethod) => (
                        <Radio
                          key={paymentMethod.id}
                          value={paymentMethod}
                          className="group relative flex cursor-pointer rounded-lg bg-white py-4 px-5 mb-4 text-teal shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-teal data-[checked]:bg-ivory"
                        >
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                              <div>
                                <img
                                  className="w-[25px] mr-4"
                                  src={paymentMethod.icon}
                                />
                              </div>
                              <div className="text-sm/6">
                                <p className="font-semibold text-teal">
                                  {paymentMethod.name}
                                </p>
                                <div className="flex gap-2 text-teal/50">
                                  <div>{paymentMethod.description}</div>
                                </div>
                              </div>
                            </div>
                            <CheckCircleIcon
                              className={cn(
                                "size-5 text-teal transition",
                                selectedPaymentMethod.id === paymentMethod.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </div>
                        </Radio>
                      ))}
                    </RadioGroup>
                  </div>

                  <Button
                    className="bg-teal text-white my-5 py-2 px-8 rounded-md hover:shadow-md transition-colors"
                    onClick={handleReview}
                  >
                    Review
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <form
            id="checkoutForm"
            method="POST"
            action="https://sandbox.payhere.lk/pay/checkout"
          >
            <input type="hidden" name="merchant_id" value={merchantId} />
            <input type="hidden" name="return_url" value={returnURl} />
            <input type="hidden" name="cancel_url" value={cancelUrl} />
            <input type="hidden" name="notify_url" value={notifyUrl} />
            <input type="hidden" name="order_id" value={orderId} />
            <input type="hidden" name="items" value="Cart items" />
            <input type="hidden" name="currency" value="LKR" />
            <input type="hidden" name="amount" value={subtotal} />
            <input type="hidden" name="hash" value={payhereHash} />
            <input
              type="hidden"
              name="first_name"
              value={formik.values.first_name}
            />
            <input
              type="hidden"
              name="last_name"
              value={formik.values.last_name}
            />
            <input
              type="hidden"
              name="email"
              value={formik.values.sendersEmail}
            />
            <input
              type="hidden"
              name="phone"
              value={formik.values.sendersPhone}
            />
            <input type="hidden" name="address" value={formik.values.address} />
            <input type="hidden" name="city" value={formik.values.city} />
            <input type="hidden" name="country" value="Sri Lanka" />
          </form>

          {currentStep !== CurrentStep.REVIEW && (
            <div className="text-gray-500">Review</div>
          )}

          {currentStep === CurrentStep.REVIEW && (
            <Card>
              <CardHeader>
                <CardTitle>Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm/6">
                  <p className="text-teal">
                    By clicking the Place Order button, you confirm that you
                    have read, understand and accept our Terms of Use, Terms of
                    Sale and Returns Policy and acknowledge that you have read
                    Max Store's Privacy Policy.
                  </p>
                  <Button
                    className="flex items-center justify-center bg-teal text-white my-5 py-2 px-8 rounded-md hover:shadow-md transition-colors"
                    onClick={handlePayAction}
                  >
                    {isProcessing && <Loader className="animate-spin mr-3" />}
                    Pay
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <CartInfo
          items={items}
          subtotal={subtotal}
          selectedDeliveryMethod={selectedDeliveryMethod}
          formatCurrency={formatCurrency}
          handleDiscount={handleDiscount}
        />
      </div>
    </div>
  );
};

export default Checkout;
