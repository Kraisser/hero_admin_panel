import {useEffect} from 'react';
import {v4 as uuid} from 'uuid';
import {useHttp} from '../../hooks/http.hook';
import {useDispatch, useSelector} from 'react-redux';
import {formSetState} from '../../actions';
import {filtersFetch, selectAll as selectAllFilters} from '../../stateSlices/filtersSlice';
import {heroesAdding} from '../../stateSlices/heroesSlice';
import * as yup from 'yup';

import Spinner from '../spinner/Spinner';

const HeroesAddForm = () => {
	const {
		filtersLoadingStatus,
		name,
		nameValid,
		description,
		descriptionValid,
		element,
		elementValid,
	} = useSelector((state) => ({...state.forms, ...state.filters}));
	const filters = useSelector((state) => selectAllFilters(state));

	const dispatch = useDispatch();
	const request = useHttp();

	const validationSchema = yup.object({
		name: yup.string('Только строка').required('Обязательное поле').min(2, 'Слишком короткое имя'),
		description: yup
			.string('Только строка')
			.required('Обязательное поле')
			.min(5, 'Слишком короткое описание'),
		element: yup.string().required('Выберите элемент'),
	});

	useEffect(() => {
		dispatch(filtersFetch());
		// eslint-disable-next-line
	}, []);

	const setNewCharacter = (newHero) => {
		const hero = JSON.stringify(newHero);

		request('http://localhost:3001/heroes', 'POST', hero)
			.then(() => {
				dispatch(heroesAdding({...newHero}));
			})
			.catch((e) => console.log(e));
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (nameValid === true && descriptionValid === true && elementValid === true) {
			const newHero = {name, description, element, id: uuid()};
			setNewCharacter(newHero);
		}
	};

	const validateField = (value, name) => {
		const currentSchema = validationSchema.pick([name]);

		currentSchema
			.validate({[name]: value})
			.then(() => dispatch(formSetState({name: `${name}Valid`, value: true})))
			.catch((e) => {
				dispatch(formSetState({name: `${name}Valid`, value: e.message}));
			});
	};

	const onChange = (e) => {
		const name = e.target.name,
			value = e.target.value;

		dispatch(formSetState({value, name}));

		validateField(value, name);
	};

	const renderItems = (arr) => {
		if (filtersLoadingStatus === 'loading') {
			return <Spinner />;
		} else if (filtersLoadingStatus === 'error') {
			return <div>Ошибка загрузки элементов</div>;
		}

		return (
			<>
				<label htmlFor='element' className='form-label'>
					Выбрать элемент героя
				</label>
				<select
					className='form-select'
					id='element'
					name='element'
					value={element}
					onChange={onChange}
					onBlur={onChange}>
					{arr.map((item) => {
						if (item.value === 'all') {
							return (
								<option key={uuid()} value=''>
									Я владею элементом...
								</option>
							);
						}
						return (
							<option key={uuid()} value={item.value}>
								{item.description}
							</option>
						);
					})}
				</select>
				<div className='mt-3 text-danger'>{elementValid === false ? null : elementValid}</div>
			</>
		);
	};

	const filterItems = renderItems(filters);

	const disabledBut = nameValid === true && descriptionValid === true && elementValid === true;

	return (
		<form className='border p-4 shadow-lg rounded' onSubmit={onSubmit}>
			<div className='mb-3'>
				<label htmlFor='name' className='form-label fs-4'>
					Имя нового героя
				</label>
				<input
					type='text'
					name='name'
					value={name}
					onChange={onChange}
					className='form-control'
					id='name'
					placeholder='Как меня зовут?'
				/>
				<div className='mt-3 text-danger'>{nameValid === false ? null : nameValid}</div>
			</div>

			<div className='mb-3'>
				<label htmlFor='text' className='form-label fs-4'>
					Описание
				</label>
				<textarea
					name='description'
					value={description}
					onChange={onChange}
					className='form-control'
					id='text'
					placeholder='Что я умею?'
					style={{height: '130px'}}
				/>
				<div className='mt-3 text-danger'>
					{descriptionValid === false ? null : descriptionValid}
				</div>
			</div>

			<div className='mb-3'>{filterItems}</div>

			<button type='submit' className='btn btn-primary' disabled={disabledBut ? false : true}>
				Создать
			</button>
		</form>
	);
};

export default HeroesAddForm;
