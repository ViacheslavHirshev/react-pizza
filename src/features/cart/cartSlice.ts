import { createSlice } from "@reduxjs/toolkit";
import { ICartItem } from "../../types";
import { RootState } from "../../store";

interface IInitialState {
  cart: ICartItem[];
}

const initialState: IInitialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => action.payload === item.pizzaId);
      if (item) {
        ++item.quantity;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => action.payload === item.pizzaId);
      if (item) {
        --item.quantity;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getCart = (state: RootState) => state.cartReducer.cart;

export const getTotalCartQuantity = (state: RootState) =>
  state.cartReducer.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state: RootState) =>
  state.cartReducer.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id: number) => (state: RootState) =>
  state.cartReducer.cart.find((item) => item.pizzaId === id)?.quantity;
