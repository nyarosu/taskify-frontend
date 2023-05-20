import {
  Action,
  PayloadAction,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";
import { NullLiteral } from "typescript";

interface User {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  company: string | null;
  companyId: number | null;
  isCompanyAdmin: boolean | null;
  picture: string | null;
}

const initialUserState: User = {
  first_name: null,
  last_name: null,
  email: null,
  company: null,
  companyId: null,
  isCompanyAdmin: null,
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

export const createLoginAction: (res: any) => {
  payload: User;
  type: "user/login";
} = (http_response: any) => {
  return login({
    first_name: http_response.first_name,
    last_name: http_response.last_name,
    email: http_response.email,
    company: http_response.company_name,
    companyId: http_response.company_id,
    isCompanyAdmin: http_response.is_company_admin,
    picture: http_response.picture,
  });
};

export type RootState = ReturnType<typeof globalstore.getState>;
export type AppDispatch = typeof globalstore.dispatch;
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
