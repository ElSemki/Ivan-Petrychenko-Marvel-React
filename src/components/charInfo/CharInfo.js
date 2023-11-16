import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import './charInfo.scss';

const CharInfo = ({ charId }) => {
	const [char, setChar] = useState(null);
	const { process, getCharacter, clearError, setProcess } = useMarvelService();

	const onCharLoaded = char => {
		setChar(char);
	};

	useEffect(() => {
		if (!charId) return;
		clearError();
		getCharacter(charId)
			.then(onCharLoaded)
			.then(() => setProcess('confirmed'));
	}, [charId]);

	return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = data;

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
				{comics.map((item, i) => {
					const comicId = item.resourceURI.split('/').at(-1);
					return (
						<li key={i} className="char__comics-item">
							<Link to={`/comics/${comicId}`}>{item.name}</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default CharInfo;
