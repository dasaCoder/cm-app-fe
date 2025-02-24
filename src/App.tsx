import React from "react";
import Header from "./components/Header";
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
