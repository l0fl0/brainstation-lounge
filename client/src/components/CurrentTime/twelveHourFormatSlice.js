import { createSlice } from '@reduxjs/toolkit';

export const twelveHourFormatSlice = createSlice({
	name: 'twelvehourformat',
	initialState: {
		value: true,
	},
	reducers: {
		toggle: (state) => {
			state.value = !state.value;
		},
		setFormat: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { toggle, setFormat } = twelveHourFormatSlice.actions;

export const selectFormat = (state) => state.twelveHourFormat.value;

export default twelveHourFormatSlice.reducer;
