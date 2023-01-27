import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import goalService from "./goalService";

type Goal = {
  _id: string;
  user: string;
  text: string;
  createdAt: string;
  updateAt: string;
  __v: number;
};

type InitialState = {
  goals: Goal[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
};

export type GoalData = {
  text: string;
};

const initialState: InitialState = {
  goals: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

//Create New Goal
export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData: GoalData, { getState, rejectWithValue }) => {
    try {
      const token: string = (getState() as RootState).auth!.user!.token;
      return await goalService.createGoal(goalData, token);
    } catch (error: any) {
      const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

//Get all goals
export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token: string = (getState() as RootState).auth!.user!.token;
      return await goalService.getGoals(token);
    } catch (error: any) {
      const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

//Delete Goal
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const token: string = (getState() as RootState).auth!.user!.token;
      return await goalService.deleteGoal(id, token);
    } catch (error: any) {
      const message: string =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action: PayloadAction<Goal>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action: PayloadAction<Goal[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteGoal.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.goals = state.goals.filter(
            (goal) => goal._id !== action.payload.id
          );
        }
      )
      .addCase(deleteGoal.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
