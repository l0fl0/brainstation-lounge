import { configureStore } from '@reduxjs/toolkit';
import twelveHourFormatReducer from '../components/CurrentTime/twelveHourFormatSlice';

export default configureStore({
	reducer: {
		twelveHourFormat: twelveHourFormatReducer,
	},
});
