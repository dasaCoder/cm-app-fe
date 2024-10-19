import React from 'react';
import { FieldInputProps, FieldMetaProps } from 'formik';

interface CommonInputProps<T extends string> {
    label: string;
    placeholder?: string;
    type?: string;
    field: FieldInputProps<T>; // Formik's field input props with type argument
    meta: FieldMetaProps<T>; // Formik's field meta props with type argument
}

const TextInput = <T extends string>({
  label,
  placeholder,
  type = 'text',
  field,
  meta,
}: CommonInputProps<T>) => {
  return (
    <div>
      <label htmlFor={field.name} className="mb-2 block text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type}
        {...field}
        placeholder={placeholder}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-sm">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default TextInput;
