import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { RootState } from "../../store/store";
import { fetchContacts, deleteContact } from "../../store/contactsSlice";
import { Contact } from "../../types/contact";
import { ContactForm } from "./ContactForm";

type SortField = 'name' | 'createdAt';
type SortOrder = 'asc' | 'desc';

export const ContactList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { contacts, loading, error } = useSelector(
    (state: RootState) => state.contacts
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    if (!loading) {
      dispatch(fetchContacts());
    }
  }, [loading, dispatch]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle order if clicking the same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedAndFilteredContacts = contacts
    .filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;
      if (sortField === 'name') {
        return a.name.localeCompare(b.name) * modifier;
      } else {
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * modifier;
      }
    });

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      await dispatch(deleteContact(id));
    }
  };

  // if ( loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Contacts</h1>
        <button
          onClick={() => {
            setSelectedContact(undefined);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add Contact
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md"
        />
        
        <button
          onClick={() => handleSort('name')}
          className={`px-4 py-2 rounded-md border ${
            sortField === 'name' 
              ? 'bg-indigo-100 border-indigo-300' 
              : 'bg-white border-gray-300'
          }`}
        >
          Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
        
        <button
          onClick={() => handleSort('createdAt')}
          className={`px-4 py-2 rounded-md border ${
            sortField === 'createdAt' 
              ? 'bg-indigo-100 border-indigo-300' 
              : 'bg-white border-gray-300'
          }`}
        >
          Date {sortField === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedAndFilteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <h3 className="text-lg font-semibold">{contact.name}</h3>
            <p className="text-gray-600">{contact.email}</p>
            {contact.phone && <p className="text-gray-600">{contact.phone}</p>}
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(contact)}
                className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(contact.id)}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">
          <button
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
          <div
            id="dropdown"
            className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Export Data
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Bonnie Green
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Visual Designer
          </span>
          <div className="flex mt-4 md:mt-6">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add friend
            </a>
            <a
              href="#"
              className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Message
            </a>
          </div>
        </div>
      </div> */}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {selectedContact ? "Edit Contact" : "Add Contact"}
            </h2>
            <ContactForm
              contact={selectedContact}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
