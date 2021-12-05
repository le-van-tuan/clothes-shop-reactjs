import {createSlice} from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: "error",
    initialState: {
        unAuthentication: false,
        error: null
    },
    reducers: {
        addError: (state, action) => {
            state.error = action.payload;
        },
        unAuthentication: (state, action) => {
            state.unAuthentication = true;
            state.error = action.payload;
        },
        clearError: (state) => {
            state.unAuthentication = false;
            state.error = null;
        },
    }
});

export const {clearError, unAuthentication, addError} = errorSlice.actions;
export default errorSlice.reducer;
