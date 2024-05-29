import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userName: string | undefined;
}

const initialState: UserState = {
  userName: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName(state, { payload }: PayloadAction<string | undefined>) {
      state.userName = payload;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
