import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: "map",
  initialState: {
    isBackupMap: false,
    isMapModal: false,
    geoJSONData: null,
    isMapEvent: false,
    markerCoordinates: [],
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
    setIsBackupMap: (state: any, param: any) => {
      const { payload } = param;
      state.isBackupMap = payload;
    },
    setIsMapModal: (state: any, param: any) => {
      const { payload } = param;
      state.isMapModal = payload;
    },
    setGeoJSONData: (state: any, param: any) => {
      const { payload } = param;
      state.geoJSONData = payload;
    },
    setIsMapEvent: (state: any, param: any) => {
      const { payload } = param;
      state.isMapEvent = payload;
    },
    setMarkerCoordinates: (state: any, param: any) => {
      const { payload } = param;
      state.markerCoordinates = payload;
    },
    setBackupMapData: (state: any, param: any) => {
      const { payload } = param;
      state?.backupMapData?.features?.push(payload);
    },
  },
});

const { actions, reducer } = mapSlice;
export const {
  setIsBackupMap,
  setIsMapModal,
  setGeoJSONData,
  setIsMapEvent,
  setMarkerCoordinates,
  setBackupMapData,
} = actions;
export default reducer;
