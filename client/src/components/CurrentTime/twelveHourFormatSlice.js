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
	},
});

export const { toggle } = twelveHourFormatSlice.actions;

export const selectFormat = (state) => state.twelveHourFormat.value;

export default twelveHourFormatSlice.reducer;
