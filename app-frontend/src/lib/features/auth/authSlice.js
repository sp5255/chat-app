import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, email: "" },
  reducers: {
    addUser: (state, action) => {
      state = action.payload;
      return { ...state };
    },
    signUp(state, action) {
      const todo = state.find((todo) => todo.id === action.payload);
      todo.completed = !todo.completed;
    },
  },
});

export const { addUser } = authSlice.actions;
export default authSlice.reducer;

export const getUser = (state) => state.auth;
