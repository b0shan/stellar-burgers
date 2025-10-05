import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getUserApi, updateUserApi } from '@api';

export const fetchUser = createAsyncThunk('user/fetch', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);

type TUserState = {
  user: TUser | null;
  loading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
