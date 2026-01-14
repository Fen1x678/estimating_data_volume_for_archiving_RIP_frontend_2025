import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import algorithmsReducer from "./slices/algorithmsSlice.ts"

export const store = configureStore({
    reducer: {
        algorithms: algorithmsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;