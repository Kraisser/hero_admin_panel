const Spinner = () => {
	return (
		<div
			style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
			<div className='spinner-border mx-auto' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</div>
		</div>
	);
};

export default Spinner;
