import * as yup from 'yup';

const checkoutFormSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    phone: yup.string().required('Phone is required').matches(/^\d{10}$/, 'Phone number is invalid'),
    deliveryMethod: yup.string(),
    locationType: yup.string().required('Location type is required'),
    deliveryDate: yup.string(),
    deliveryInstructions: yup.string(),
    sendersName: yup.string().required('Sender\'s name is required'),
    sendersPhone: yup.string().required('Sender\'s phone is required').matches(/^\d{10}$/, 'Sender\'s phone number is invalid'),
    sendersEmail: yup.string().email('Sender\'s email is invalid').required('Sender\'s email is required'),
    specialMsg: yup.string(),
    paymentMethod: yup.string()
});

export default checkoutFormSchema;