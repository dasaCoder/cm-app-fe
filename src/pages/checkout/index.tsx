import {
  Checkbox,
  Button,
  RadioGroup,
  Radio,
  Select,
  Textarea,
} from "@headlessui/react";
import {
  Car,
  CheckCircleIcon,
  CheckIcon,
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
import { send } from "process";

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
    setOrderId(Math.floor(Math.random() * 1000000).toString());
  }, [subtotal]);

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
    setIsProcessing(true);
    console.log("Payment action");
    console.log({
      ...formik.values,
      deliveryMethod: selectedDeliveryMethod.id,
      paymentMethodList: selectedPaymentMethod.id,
    });
    setTimeout(() => {
      setIsProcessing(false);
      const form = document.getElementById("checkoutForm") as HTMLFormElement;
      if (form) {
        // form.submit();
      }
    }, 2000);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // handlePayAction();
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
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Recipient's first name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="first_name"
                        value={formik.values.first_name}
                        onChange={formik.handleChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                        placeholder="Max"
                      />
                      {formik.errors.first_name && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.first_name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Recipient's last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="last_name"
                        value={formik.values.last_name}
                        onChange={formik.handleChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                        placeholder="Dasanayaka"
                      />
                      {formik.errors.last_name && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.last_name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Recipient's contact number
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                        placeholder="0713252XXX"
                      />
                      {formik.errors.phone && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="deliveryDate"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Delivery Date
                      </label>
                      <input
                        type="text"
                        id="deliveryDate"
                        name="deliveryDate"
                        value={formik.values.deliveryDate}
                        onChange={formik.handleChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                        placeholder="0713252XXX"
                      />
                      {formik.errors.deliveryDate && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.deliveryDate}
                        </p>
                      )}
                    </div>
                    
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-2 block text-sm font-medium text-gray-900"
                    >
                      Delivery address
                    </label>
                    <Textarea
                      id="address"
                      name="address"
                      rows={2}
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                      placeholder="1st cross lane, Templers Road"
                    />
                    {formik.errors.address && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.address}
                      </p>
                    )}
                  </div>

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
                      {formik.errors.city && (
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

                  <div className="grid grid-cols-2 gap-4"></div>

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
                  <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Sender's name
                      </label>
                      <input
                        type="text"
                        id="sendersName"
                        name="sendersName"
                        value={formik.values.sendersName}
                        onChange={formik.handleChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                        placeholder="Jessy"
                      />
                      {formik.errors.sendersName && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.sendersName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Sender's email
                      </label>
                      <input
                        type="text"
                        id="sendersEmail"
                        name="sendersEmail"
                        value={formik.values.sendersEmail}
                        onChange={formik.handleChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                        placeholder="jessy123@gmail.com"
                      />
                      {formik.errors.sendersEmail && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.sendersEmail}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Sender's contact number
                      </label>
                      <input
                        type="text"
                        id="sendersPhone"
                        name="sendersPhone"
                        value={formik.values.sendersPhone}
                        onChange={formik.handleChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                        placeholder="0773252XXX"
                      />
                      {formik.errors.sendersPhone && (
                        <p className="text-red-500 text-sm">
                          {formik.errors.sendersPhone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="specialMsg"
                      className="mb-2 block text-sm font-medium text-gray-900 mt-2"
                    >
                      Special Message
                    </label>
                    <Textarea
                      id="specialMsg"
                      name="specialMsg"
                      value={formik.values.specialMsg}
                      onChange={formik.handleChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                      placeholder="Happy birthday my love"
                      rows={3}
                    />
                    {formik.errors.specialMsg && (
                      <p className="text-red-500 text-sm">
                        {formik.errors.specialMsg}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div className="text-sm pt-5 pb-3">
                    <p>
                      By clicking the Continue to delivery button, you confirm
                      that you have read, understand and accept our Terms of
                      Use, Terms of Sale and Returns Policy and acknowledge that
                      you have read Medusa Store's Privacy Policy.{" "} {JSON.stringify(formik.errors)}
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
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                {items.map((item) => (
                  <div className="border-t pt-4">
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
                        {/* <p className="text-sm text-gray-500">
                            Variant: Height only
                          </p> */}
                        <div className="flex items-center space-x-2">
                          {/* <span className="text-sm line-through text-gray-500">
                             {formatCurrency(item.price)}
                            </span> */}
                          <span className="font-semibold">
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {item.quantity}x
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <input
                  placeholder="Add gift card or discount code"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
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
      </div>
    </div>
  );
};

export default Checkout;
