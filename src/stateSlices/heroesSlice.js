import {createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import {useHttp} from '../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
	heroesLoadingStatus: 'idle',
});

export const heroesFetch = createAsyncThunk('heroes/heroesFetch', async () => {
	const request = useHttp();
	return await request('http://localhost:3001/heroes');
});

const heroesSlice = createSlice({
	name: 'heroes',
	initialState,
	reducers: {
		heroesDelete: (state, action) => {
			heroesAdapter.removeOne(state, action.payload);
		},
		heroesAdding: (state, action) => {
			heroesAdapter.addOne(state, action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(heroesFetch.pending, (state) => {
				state.heroesLoadingStatus = 'loading';
			})
			.addCase(heroesFetch.fulfilled, (state, action) => {
				state.heroesLoadingStatus = 'idle';
				heroesAdapter.setAll(state, action.payload);
			})
			.addCase(heroesFetch.rejected, (state) => {
				state.heroesLoadingStatus = 'error';
			})
			.addDefaultCase(() => {});
	},
});

const {actions, reducer} = heroesSlice;

export const {selectAll} = heroesAdapter.getSelectors((state) => state.heroes);

export default reducer;

export const {heroesDelete, heroesAdding} = actions;
