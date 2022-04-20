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

export default twelveHourFormatSlice.reducer;
