import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, email: "" },
  reducers: {
    addUser: (state, action) => {
      state = { ...state, email: action.payload.email };
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
