import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addContact, updateContact } from '../../store/contactsSlice';
import { Contact } from '../../types/contact';

interface ContactFormProps {
  contact?: Contact;
  onClose: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+?[\d\s-]+$/, 'Invalid phone number')
    .min(10, 'Phone number must be at least 10 digits')
    .nullable(),
});

export const ContactForm: React.FC<ContactFormProps> = ({ contact, onClose }) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: contact?.name ?? '',
      email: contact?.email ?? '',
      phone: contact?.phone ?? '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (contact) {
          await dispatch(updateContact({ id: contact.id, contact: values }));
        } else {
          await dispatch(addContact(values));
        }
        onClose();
      } catch (error) {
        console.error('Failed to save contact:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...formik.getFieldProps('name')}
          className={`mt-1 block w-full rounded-md shadow-sm border focus:border-indigo-500 focus:ring-indigo-500 p-2 ${
            formik.touched.name && formik.errors.name
              ? 'border-red-300'
              : 'border-gray-300'
          }`}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="mt-1 text-sm text-red-600">{formik.errors.name}</div>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...formik.getFieldProps('email')}
          className={`mt-1 block w-full rounded-md shadow-sm border focus:border-indigo-500 focus:ring-indigo-500 p-2 ${
            formik.touched.email && formik.errors.email
              ? 'border-red-300'
              : 'border-gray-300'
          }`}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="mt-1 text-sm text-red-600">{formik.errors.email}</div>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          {...formik.getFieldProps('phone')}
          className={`mt-1 block w-full rounded-md shadow-sm border focus:border-indigo-500 focus:ring-indigo-500 p-2 ${
            formik.touched.phone && formik.errors.phone
              ? 'border-red-300'
              : 'border-gray-300'
          }`}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="mt-1 text-sm text-red-600">{formik.errors.phone}</div>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {contact ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}; 