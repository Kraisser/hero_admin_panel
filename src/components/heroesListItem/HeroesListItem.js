import classNames from 'classnames';

const HeroesListItem = ({name, description, element, deleteHero}) => {
	const compareElem = (value) => {
		return element === value;
	};

	const elemClass = classNames({
		'bg-danger': compareElem('fire'),
		'bg-primary': compareElem('water'),
		'bg-success': compareElem('wind'),
		'bg-secondary': compareElem('earth'),
	});

	return (
		<li className={`card flex-row mb-4 shadow-lg text-white ${elemClass} bg-gradient`}>
			<img
				src='http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg'
				className='img-fluid w-25 d-inline'
				alt='unknown hero'
				style={{objectFit: 'cover'}}
			/>
			<div className='card-body'>
				<h3 className='card-title'>{name}</h3>
				<p className='card-text'>{description}</p>
			</div>
			<span className='position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light'>
				<button
					type='button'
					className='btn-close btn-close'
					aria-label='Close'
					onClick={deleteHero}></button>
			</span>
		</li>
	);
};

export default HeroesListItem;
