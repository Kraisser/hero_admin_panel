const initialState = {
	name: '',
	nameValid: false,
	description: '',
	descriptionValid: false,
	element: '',
	elementValid: false,
};

const forms = (state = initialState, action) => {
	switch (action.type) {
		case 'FORM_SET_STATE':
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};
		default:
			return state;
	}
};

export default forms;
