import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  name: string;
  id: number | null;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  data: Record<string, any>;
  status: "idle" | "loading" | "succeeded" | "failed";
  userInfo: User;
}

const initialState: AuthState = {
  isAuthenticated: true,
  user: null,
  loading: false,
  error: null,
  data: {},
  status: "idle",
  userInfo: {
    email: "",
    name: "",
    id: null,
    role: "",
  },
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
      state.status = "loading";
      state.data = {};
    },
    loginSuccess(state, { payload }: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = payload;
      state.loading = false;
      state.error = null;
      state.status = "succeeded";
      state.userInfo = { ...state.userInfo, ...payload };
    },
    loginFailure(state, { payload }: PayloadAction<string>) {
      state.loading = false;
      state.error = payload;
      state.status = "failed";
      state.data = {};
      state.user = null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
      state.data = {};
      state.status = "idle";
      state.userInfo = {
        email: "",
        name: "",
        id: null,
        role: "",
      };
    },
    updateUserInfo(state, { payload }: PayloadAction<Partial<User>>) {
      if (!payload) return;
      state.userInfo = { ...state.userInfo, ...payload };
      if (state.user) state.user = { ...state.user, ...payload };
      state.data = { ...state.data, ...payload };
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUserInfo,
} = authSlice.actions;
export default authSlice.reducer;
