import { createSlice } from '@reduxjs/toolkit';

export const cartCountSlice = createSlice({
  name: 'cartCount',
  initialState: {
    count: 0,
  },
  reducers: {
    setCartCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setCartCount } = cartCountSlice.actions;

export default cartCountSlice.reducer;