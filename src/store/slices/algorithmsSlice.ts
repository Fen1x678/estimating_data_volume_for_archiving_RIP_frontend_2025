import {createSlice} from "@reduxjs/toolkit";

type T_AlgorithmsSlice = {
    algorithm_name: string
}

const initialState:T_AlgorithmsSlice = {
    algorithm_name: "",
}


const algorithmsSlice = createSlice({
    name: 'algorithms',
    initialState: initialState,
    reducers: {
        updateAlgorithmName: (state, action) => {
            state.algorithm_name = action.payload
        }
    }
})

export const { updateAlgorithmName} = algorithmsSlice.actions;

export default algorithmsSlice.reducer