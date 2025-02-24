import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../store/hooks';
import { addContact } from '../../store/contactsSlice';

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
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

const initialValues: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
};

export const ContactForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: ContactFormValues, { resetForm }: any) => {
    try {
      await dispatch(addContact(values)).unwrap();
      resetForm();
    } catch (error) {
      console.error('Failed to add contact:', error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <Field
              type="text"
              name="phone"
              id="phone"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="mt-1 text-sm text-red-600"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Adding...' : 'Add Contact'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}; 