import * as yup from 'yup';

const checkoutFormSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    phone: yup.string().required('Phone is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    companyName: yup.string(),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    postalCode: yup.number(),
    deliveryMethod: yup.string()
});

export default checkoutFormSchema;