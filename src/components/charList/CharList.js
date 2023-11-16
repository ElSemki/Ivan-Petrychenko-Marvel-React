import { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import './charList.scss';

const setContent = (process, Component, newItemLoading) => {
	switch (process) {
		case 'waiting':
			return <Spinner />;
		case 'loading':
			return newItemLoading ? <Component /> : <Spinner />;
		case 'confirmed':
			return <Component />;
		case 'error':
			return <ErrorMessage />;
		default:
			throw new Error('Unexpected process state');
	}
};

const CharList = ({ onCharSelected }) => {
	const [characters, setCharacters] = useState([]);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);

	const {
		process,
		setProcess,
		newItemLoading,
		setNewItemLoading,
		getAllCharacters,
	} = useMarvelService();

	const onCharactersLoaded = newCharacters => {
		let ended = false;
		if (newCharacters.length < 9) {
			ended = true;
		}

		setCharacters(characters => [...characters, ...newCharacters]);
		setNewItemLoading(false);
		setOffset(offset => offset + 9);
		setCharEnded(ended);
	};

	const onRequest = (offset, initial) => {
		setNewItemLoading(initial ? false : true);
		getAllCharacters(offset)
			.then(onCharactersLoaded)
			.then(() => setProcess('confirmed'));
	};

	useEffect(() => onRequest(offset, true), []);

	const itemRefs = useRef([]);

	const focusOnItem = index => {
		itemRefs.current.forEach(item =>
			item.classList.remove('char__item_selected')
		);
		itemRefs.current[index].classList.add('char__item_selected');
		itemRefs.current[index].focus();
	};

	const renderChars = () => {
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
				<CSSTransition key={id} timeout={500} classNames="char__item">
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
				</CSSTransition>
			);
		});

		return (
			<ul className="char__grid">
				<TransitionGroup component={null}>{cards}</TransitionGroup>
			</ul>
		);
	};

	return (
		<div className="char__list">
			{setContent(process, () => renderChars(), newItemLoading)}
			<button
				className="button button__main button__long"
				disabled={newItemLoading}
				style={{ display: charEnded ? 'none' : 'block' }}
				onClick={() => onRequest(offset)}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

export default CharList;
