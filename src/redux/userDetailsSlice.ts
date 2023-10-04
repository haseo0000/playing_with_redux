import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserDetailsStateT } from "../types";

type InitialStateT = {
  // data: Partial<UserDetailsStateT>[];
  data: UserDetailsStateT[];
};

const initialState: InitialStateT = {
  data: [],
};

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    insertUserDetails: (
      state,
      action: PayloadAction<{ details: UserDetailsStateT }>
    ) => {
      state.data = [...state.data, action.payload.details];
    },
    // insertUserDetailsV2: {
    //   reducer: (state, action: PayloadAction<{ details: UserDetailsStateT }>) => {
    //     state.data = [...state.data, action.payload.details];
    //   },
    //   prepare: (details) => {
    //     return {
    //       payload: {
    //         details,
    //       },
    //     };
    //   },
    // },
    deleteAllUserDetails: (state) => {
      state.data = [];
    },
    deleteSingleItem: (state, action: PayloadAction<{ key: string }>) => {
      const newData = [...state.data].filter(
        (item) => item.key !== action.payload.key
      );
      state.data = newData;
    },
    updateUserDetails: (
      state,
      action: PayloadAction<{ details: UserDetailsStateT; key: string }>
    ) => {
      state.data.forEach((item) => {
        if (item.key === action.payload.key) {
          const { prefix, firstname, lastname, id_citizen } = action.payload.details;
          item.firstname = firstname;
          item.lastname = lastname;
          item.id_citizen = id_citizen;
          item.prefix = prefix;
        }
      });
    },
  },
});

export const {
  insertUserDetails,
  deleteAllUserDetails,
  deleteSingleItem,
  updateUserDetails,
} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
