/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  geoJSONData: any;
}

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    geoJSONData: null,
    backupMapData: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            NAME: "Eko Hotels and Suites",
          },
          geometry: {
            type: "Point",
            coordinates: [6.4266, 3.4301],
          },
        },
        {
          type: "Feature",
          properties: {
            NAME: "Lagos Oriental Hotel",
          },
          geometry: {
            type: "Point",
            coordinates: [6.4358, 3.4447],
          },
        },
      ],
    },
  },
  reducers: {
    setGeoJSONData: (state: any, param: any) => {
      const { payload } = param;
      state.geoJSONData = payload;
    },
    setBackupMapData: (state: any, param: any) => {
      const { payload } = param;
      state?.backupMapData?.features?.push(payload);
    },
  },
});

const { actions, reducer } = mapSlice;
export const { setGeoJSONData, setBackupMapData } = actions;
export default reducer;
