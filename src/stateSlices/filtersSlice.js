import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import {useHttp} from '../hooks/http.hook';

const filterAdapter = createEntityAdapter();

// const initialState = {
// 	filters: [],
// 	filtersLoadingStatus: 'idle',
// 	activeFilter: 'all',
// };

const initialState = filterAdapter.getInitialState({
	filtersLoadingStatus: 'idle',
	activeFilter: 'all',
});

export const filtersFetch = createAsyncThunk('filters/filtersFetch', async () => {
	const request = useHttp();
	return await request('http://localhost:3001/filters');
});

const filters = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setActiveFilter: (state, action) => {
			state.activeFilter = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(filtersFetch.pending, (state) => {
				state.filtersLoadingStatus = 'loading';
			})
			.addCase(filtersFetch.fulfilled, (state, action) => {
				// state.filters = action.payload;
				filterAdapter.setAll(state, action.payload);
				state.filtersLoadingStatus = 'idle';
			})
			.addCase(filtersFetch.rejected, (state) => {
				state.filtersLoadingStatus = 'error';
			})
			.addDefaultCase(() => {});
	},
});

const {actions, reducer} = filters;

export const {selectAll} = filterAdapter.getSelectors((state) => state.filters);
export default reducer;
export const {setActiveFilter} = actions;
