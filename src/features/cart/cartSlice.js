import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};
/* createAsyncThunk, takes a name and fetch */
export const getCartItems = createAsyncThunk('cart/getCarItems', () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((error) => console.log(error));
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];

      /* you can create a whole new state
      return {}
      will replace the initialStatate to empty object
      */
      /* return { cartItems: [] };
      This replaced the whole initialState to ={
        cartItems:[]
      }
      
      */
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  /* for api, use extraReducers */
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },

    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },

    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

//it is an object, reducer is property
export default cartSlice.reducer;

//export reducer function = Slice Name + .action
export const { clearCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions;
