/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  geoJSONData: any;
}

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    geoJSONData: null,
  },
  reducers: {
    setGeoJSONData: (state: any, param: any) => {
      const { payload } = param;
      state.geoJSONData = payload;
    },
  },
});

const { actions, reducer } = mapSlice;
export const { setGeoJSONData } = actions;
export default reducer;
