import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "count",
  initialState: 0,
  reducers: {
    add: (state) => {
      return (state += 1);
    },
    minus: (state) => {
      return (state -= 1);
    },
  },
});

export const { add: countAdd, minus: countMinus } = countSlice.actions;

export default countSlice.reducer;
