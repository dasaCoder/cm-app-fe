export interface OrderItem {
    id: number;
    name: string;
    imageurl: string;
    description: string;
    price: number;
    stock_quantity: number;
    category_id: number;
    created_at: string;
    updated_at: string;
    quantity: number;
    variant: string;
  }
  
  export interface Order {
    id: string;
    user_id: string | null;
    guest_email: string;
    delivery_city: string;
    delivery_fee: number;
    delivery_method: string;
    payment_method: string;
    handling_fee: number;
    tax: number;
    sub_total: number;
    discounted_amount: string;
    delivery_address: string;
    phone_no: string;
    order_status: string;
    total: number;
    created_at: string;
    updated_at: string;
    items: OrderItem[];
  }
  