import { useEffect, useRef, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import './charList.scss';

const CharList = ({ onCharSelected }) => {
	const [characters, setCharacters] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);

	const marvelService = new MarvelService();

	const onCharactersLoaded = newCharacters => {
		let ended = false;
		if (newCharacters.length < 9) {
			ended = true;
		}

		setCharacters(characters =>
			setCharacters([...characters, ...newCharacters])
		);
		setLoading(false);
		setNewItemLoading(false);
		setOffset(offset => offset + 9);
		setCharEnded(ended);
	};

	const onError = () => {
		setLoading(false);
		setError(true);
	};

	const onCharListLoading = () => setNewItemLoading(true);

	const onRequest = offset => {
		onCharListLoading();
		marvelService
			.getAllCharacters(offset)
			.then(onCharactersLoaded)
			.catch(onError);
	};

	useEffect(() => onRequest(), []);

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error) ? (
		<View
			characters={characters}
			onCharSelected={onCharSelected}
			onRequest={onRequest}
			newItemLoading={newItemLoading}
			offset={offset}
			charEnded={charEnded}
		/>
	) : null;

	return (
		<div className="char__list">
			{errorMessage}
			{spinner}
			{content}
		</div>
	);
};

const View = props => {
	const {
		characters,
		onCharSelected,
		onRequest,
		newItemLoading,
		offset,
		charEnded,
	} = props;

	const itemRefs = useRef([]);

	const focusOnItem = index => {
		itemRefs.current.forEach(item =>
			item.classList.remove('char__item_selected')
		);
		itemRefs.current[index].classList.add('char__item_selected');
		itemRefs.current[index].focus();
	};

	const cards = characters.map(({ id, name, thumbnail }, i) => {
		const imgStyle = { objectFit: 'cover' };

		if (
			thumbnail ===
				'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ||
			thumbnail ===
				'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif'
		) {
			imgStyle.objectFit = 'fill';
		}

		return (
			<li
				ref={el => (itemRefs.current[i] = el)}
				className="char__item"
				key={id}
				tabIndex={0}
				onClick={() => {
					onCharSelected(id);
					focusOnItem(i);
				}}
				onKeyDown={e => {
					if (e.key === ' ' || e.key === 'Enter') {
						onCharSelected(id);
						focusOnItem(i);
					}
				}}
			>
				<img src={thumbnail} alt={name} style={imgStyle} />
				<div className="char__name">{name}</div>
			</li>
		);
	});

	return (
		<>
			<ul className="char__grid">{cards}</ul>
			<button
				className="button button__main button__long"
				disabled={newItemLoading}
				style={{ display: charEnded ? 'none' : 'block' }}
				onClick={() => onRequest(offset)}
			>
				<div className="inner">load more</div>
			</button>
		</>
	);
};

export default CharList;
