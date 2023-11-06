import { useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import './charInfo.scss';

const CharInfo = ({ charId }) => {
	const [char, setChar] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const marvelService = new MarvelService();

	const onCharLoading = () => {
		setLoading(true);
		setError(false);
	};

	const onCharLoaded = char => {
		setChar(char);
		setLoading(false);
	};

	const onError = () => {
		setLoading(false);
		setError(true);
	};

	useEffect(() => {
		if (!charId) return;
		onCharLoading();
		marvelService.getCharacter(charId).then(onCharLoaded).catch(onError);
	}, [charId]);

	const skeleton = char || loading || error ? null : <Skeleton />;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;

	const imgStyle = { objectFit: 'cover' };

	if (
		thumbnail ===
		'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
	) {
		imgStyle.objectFit = 'contain';
	}

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgStyle} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{description}</div>
			<div className="char__comics">Comics:</div>
			{comics.length ? null : <p>There is no comics with this character</p>}
			<ul className="char__comics-list">
				{comics.map((item, i) => (
					<li key={i} className="char__comics-item">
						{item.name}
					</li>
				))}
			</ul>
		</>
	);
};

export default CharInfo;
