import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, email: "" },
  reducers: {
    addUser: (state, action) => {
      state.push({
        id: action.payload.id,
        email: action.payload.email,
        isAuthenticated: action.payload.isAuthenticated,
      });
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
