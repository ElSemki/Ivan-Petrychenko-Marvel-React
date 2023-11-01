import errorGif from './error.gif';

const styles = {
	display: 'block',
	width: '250px',
	height: '250px',
	objectFit: 'contain',
	margin: '0 auto',
};

const ErrorMessage = () => {
	return <img src={errorGif} alt="Error" style={styles} />;
};

export default ErrorMessage;
