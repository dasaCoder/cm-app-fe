import { Button, RadioGroup, Radio } from "@headlessui/react";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { cn } from "../../utils/tailwind";
import { CheckCircleIcon, InfoIcon } from "lucide-react";
import { CurrentStep } from "../../types/checkout-page";

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: string;
}

interface PaymentCardProps {
  currentStep: CurrentStep;
  selectedPaymentMethod: PaymentMethod;
  paymentMethodList: PaymentMethod[];
  setSelectedPaymentMethod: (method: PaymentMethod) => void;
  handleGoToPayment: () => void;
  handleReview: () => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  currentStep,
  selectedPaymentMethod,
  paymentMethodList,
  setSelectedPaymentMethod,
  handleGoToPayment,
  handleReview,
}) => {
  return (
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
                value={selectedPaymentMethod}
                onChange={setSelectedPaymentMethod}
                aria-label="Payment method"
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
                        <img
                          className="w-[25px] mr-4"
                          src={paymentMethod.icon}
                          alt={paymentMethod.name}
                        />
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
  );
};

export default PaymentCard;
