import { FieldInputProps, FieldMetaProps } from "formik";

export interface CommonInputProps<T extends string> {
    label: string;
    placeholder?: string;
    type?: string;
    rows?: number;
    field: FieldInputProps<T>; 
    meta: FieldMetaProps<T>;
}