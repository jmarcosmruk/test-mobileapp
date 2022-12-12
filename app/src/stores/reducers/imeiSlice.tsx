import { createAction, createSlice } from "@reduxjs/toolkit";
import React from "react";



const initialState: NvImeiState = {
	value: "",
};

const reset = createAction(null);

export const imeiSlice = createSlice({
    name: 'imei',
    initialState,
    reducers: {
        setImei: (state, action: NvAction<string>) => {
            console.log("ACTION IMEI " + JSON.stringify(action, undefined, 2));
            return { ...state, value: action.payload };
        },
        
        removeImei: (state) => {
            return initialState
        }
    },
    extraReducers: (builder) =>  {
        builder.addCase(
            reset, (state) => initialState
        )
    }
});

export const {setImei, removeImei} = imeiSlice.actions;

export default imeiSlice