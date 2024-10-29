import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
    id: string
    quantity: number
    name: string
    price: number
    imageurl: string
}
export interface CartState {
    items: CartItem[],
    isCartOpen: boolean,
    subtotal: number
}

const initialState: CartState = {
    items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
    subtotal: calculateSubtotal(JSON.parse(localStorage.getItem('cartItems') || '[]')),
    isCartOpen: false
}

const updateLocalStorage = (items: CartItem[]) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const item = state.items.find(item => item.id === action.payload.id)
            if (item) {
                item.quantity += action.payload.quantity
            } else {
                state.items.push(action.payload)
            }
            state.subtotal = calculateSubtotal(state.items)
            updateLocalStorage(state.items);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload)
            state.subtotal = calculateSubtotal(state.items)
            updateLocalStorage(state.items);
        },
        updateQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id)
            if (item) {
                item.quantity = action.payload.quantity
            }
            state.subtotal = calculateSubtotal(state.items)
            updateLocalStorage(state.items);
        },
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        }
    }
});

function calculateSubtotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

export const { addItem, removeItem, updateQuantity, toggleCart } = cartSlice.actions
export default cartSlice.reducer