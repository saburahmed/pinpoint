/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  modal: string;
}

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isShowModal: false,
  },
  reducers: {
    setIsShowModal: (state: any, param: any) => {
      const { payload } = param;
      state.isShowPassModal = payload;
    },
  },
});

const { actions, reducer } = modalSlice;
export const { setIsShowModal } = actions;
export default reducer;
