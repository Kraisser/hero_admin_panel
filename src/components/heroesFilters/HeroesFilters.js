import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';
import classNames from 'classnames';

import {
	setActiveFilter,
	filtersFetch,
	selectAll as selectAllFilters,
} from '../../stateSlices/filtersSlice';

import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
	const {filtersLoadingStatus, activeFilter} = useSelector((state) => state.filters);
	const filters = useSelector((state) => selectAllFilters(state));
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(filtersFetch());
		// eslint-disable-next-line
	}, []);

	const renderItems = (arr) => {
		if (filtersLoadingStatus === 'loading') {
			return <Spinner />;
		} else if (filtersLoadingStatus === 'error') {
			console.log('error');
			return <div>Ошибка загрузки фильтров</div>;
		}

		return arr.map((item) => {
			const btnClass = classNames({
				btn: true,
				[item.class]: true,
				active: activeFilter === item.value,
			});

			return (
				<button className={btnClass} onClick={() => onFilter(item.value)} key={uuid()}>
					{item.description}
				</button>
			);
		});
	};

	const onFilter = (filter) => {
		dispatch(setActiveFilter(filter));
	};

	const filterItems = renderItems(filters);

	return (
		<div className='card shadow-lg mt-4'>
			<div className='card-body'>
				<p className='card-text'>Отфильтруйте героев по элементам</p>
				<div className='btn-group w-100'>{filterItems}</div>
			</div>
		</div>
	);
};

export default HeroesFilters;
