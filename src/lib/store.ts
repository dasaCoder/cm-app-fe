import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cart-slice';
import appReducer from './features/app/app-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      app: appReducer
    }
  })
}

export const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']