import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import InfoDialog from "./components/Dialog/InfoDialog";
import { ContactList } from "./components/contacts/ContactList";

const App: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <ContactList />
        </main>
      </div>
    </>
  );
};

export default App;
