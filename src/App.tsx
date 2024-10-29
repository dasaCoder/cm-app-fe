import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Item from "./pages/Item";
import OrderConfirmation from "./pages/OrderConfirmation";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { useAppSelector } from "./lib/hooks";
import InfoDialog from "./components/Dialog/InfoDialog";

const App: React.FC = () => {
  const { isShowInfoDialog, infoMessage } = useAppSelector(
    (state) => state.app
  );
  return (
    <Router>
      <div className="bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
      <InfoDialog
        isOpen={isShowInfoDialog}
        title={infoMessage.title}
        content={infoMessage.content}
        imgUrl={infoMessage.imgUrl}
        buttonText={infoMessage.buttonText}
        closeModal={infoMessage.onClose}
      />
    </Router>
  );
};

export default App;
