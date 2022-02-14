import {configureStore} from '@reduxjs/toolkit';

import heroes from '../stateSlices/heroesSlice';
import filters from '../stateSlices/filtersSlice';
import forms from '../reducers/forms';

const stringMiddleware = () => (next) => (action) => {
	if (typeof action === 'string') {
		return next({
			type: action,
		});
	}
	return next(action);
};

const store = configureStore({
	reducer: {heroes, filters, forms},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;
