import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authService, { registerUserData } from "./authService";

type User = { _id: string; name: string; email: string; token: string };

type InitialState = {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

// @ts-ignore
const savedUser: User = JSON.parse(localStorage.getItem("user"));

const initialState: InitialState = {
  user: savedUser ? savedUser : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Register user

export const register = createAsyncThunk(
  "auth/register",
  async (user: registerUserData, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error: any) {
      const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
