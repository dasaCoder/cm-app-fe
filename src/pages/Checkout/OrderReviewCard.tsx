import { Button } from "@headlessui/react";
import { Loader } from "lucide-react";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";

interface OrderReviewCardProps {
  handlePayAction: () => void;
  loading: boolean;
  isProcessing: boolean;
  placeOrderResponse: {
    data: {
      id: string;
    };
  } | null;
}

const OrderReviewCard: React.FC<OrderReviewCardProps> = ({
  handlePayAction,
  loading,
  isProcessing,
  placeOrderResponse,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm/6">
          <p className="text-teal">
            By clicking the Place Order button, you confirm that you have read,
            understand, and accept our Terms of Use, Terms of Sale and Returns
            Policy, and acknowledge that you have read Max Store's Privacy
            Policy.
          </p>
          <Button
            className="flex items-center justify-center bg-teal text-white my-5 py-2 px-8 rounded-md hover:shadow-md transition-colors"
            onClick={handlePayAction}
          >
            {(loading || isProcessing) && (
              <Loader className="animate-spin mr-3" />
            )}
            Pay
          </Button>
        </div>

        {placeOrderResponse && (
          <div className="text-sm">
            <p className="text-teal">
              Your order is placed. Your order id is {placeOrderResponse.data.id}.
              Please proceed with the payment.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderReviewCard;
