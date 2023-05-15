import {
  Action,
  PayloadAction,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";

interface User {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  company: string | null;
  picture: string | null;
}

const initialUserState: User = {
  first_name: null,
  last_name: null,
  email: null,
  company: null,
  picture: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login: (state: any, action: PayloadAction<User>) => {
      return action.payload;
    },
    logout: (state: any) => {
      return initialUserState;
    },
  },
});

export const globalstore = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof globalstore.getState>;
export type AppDispatch = typeof globalstore.dispatch;
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
