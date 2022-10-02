import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import mapReducer from "../features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    map: mapReducer,
  },

  //deliberately put this there to allow non-serializable values coming from the Leaflet Map Events
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["map/setBackupMapData"],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          "map.backupMapData.features.2.geometry.coordinates",
        ],
        // Ignore these paths in the state
        ignoredPaths: [
          "payload.geometry.coordinates",
          "map.backupMapData.features.2.geometry.coordinates",
        ],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
