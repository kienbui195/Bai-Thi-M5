import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    flag: 0
};

export const flagSlice = createSlice({
	name: 'flag',
	initialState,
	reducers: {
		changeStatus: (state, action) => {
			state.flag = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { changeStatus } = flagSlice.actions;

export default flagSlice.reducer;
