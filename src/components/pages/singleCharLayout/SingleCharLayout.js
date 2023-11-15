import './singleChar.scss';

const SingleCharLayout = ({ data }) => {
	const { name, thumbnail, fullDescription } = data;

	return (
		<div className="single-char">
			<img className="single-char__picture" src={thumbnail} alt={name} />
			<div>
				<h2 className="single-char__name">{name}</h2>
				<p className="single-char__desc">{fullDescription}</p>
			</div>
		</div>
	);
};

export default SingleCharLayout;
