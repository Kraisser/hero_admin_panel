import Spinner from '../spinner/Spinner';

export default function SetContent(process, data, errorMessage, Component) {
	switch (process) {
		case 'waiting':
			return <Spinner />;
		case 'loading':
			return <Spinner />;
		case 'success':
			return <Component data={data} />;
		case 'error':
			return errorMessage;
		default:
			throw new Error('Unexpected process');
	}
}
