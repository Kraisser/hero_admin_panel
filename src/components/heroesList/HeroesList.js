import './heroesList.css';

import {useHttp} from '../../hooks/http.hook';
import {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {heroesDelete, heroesFetch, selectAll} from '../../stateSlices/heroesSlice';

import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
	const heroes = useSelector((state) => selectAll(state));
	const heroesLoadingStatus = useSelector((state) => state.heroes.heroesLoadingStatus);
	const activeFilter = useSelector((state) => state.filters.activeFilter);

	const dispatch = useDispatch();
	const request = useHttp();

	useEffect(() => {
		dispatch(heroesFetch());
		// eslint-disable-next-line
	}, []);

	const deleteHero = useCallback(
		(id) => {
			request('http://localhost:3001/heroes/' + id, 'DELETE')
				.then(() => dispatch(heroesDelete(id)))
				.catch((e) => console.log(e));
		},
		[request]
	);

	if (heroesLoadingStatus === 'loading') {
		return <Spinner />;
	} else if (heroesLoadingStatus === 'error') {
		return <h5 className='text-center mt-5'>Ошибка загрузки</h5>;
	}

	const renderHeroesList = (arr) => {
		const filteredArr =
			activeFilter !== 'all' ? arr.filter((item) => item.element === activeFilter) : arr;

		if (filteredArr.length === 0) {
			return (
				<CSSTransition classNames='heroItemAnim' timeout={0}>
					<h5 className='text-center mt-5'>Героев пока нет</h5>
				</CSSTransition>
			);
		}

		const resArr = filteredArr.map(({id, ...props}) => {
			return (
				<CSSTransition classNames='heroItemAnim' key={id} timeout={500}>
					<HeroesListItem key={id} deleteHero={() => deleteHero(id)} {...props} />
				</CSSTransition>
			);
		});

		return resArr;
	};

	const elements = renderHeroesList(heroes);

	console.log(`render List`);

	return <TransitionGroup component='ul'>{elements}</TransitionGroup>;
};

export default HeroesList;
