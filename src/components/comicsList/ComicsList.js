import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import './comicsList.scss';

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

const ComicsList = () => {
	const [comicsList, setComicsList] = useState([]);
	const [offset, setOffset] = useState(0);
	const [comicsEnded, setComicsEnded] = useState(false);

	const {
		process,
		setProcess,
		newItemLoading,
		setNewItemLoading,
		getAllComics,
	} = useMarvelService();

	const onComicsListLoaded = newComics => {
		let ended = false;
		if (newComics.length < 8) {
			ended = true;
		}

		setComicsList(comicsList => [...comicsList, ...newComics]);
		setNewItemLoading(false);
		setOffset(offset => offset + 8);
		setComicsEnded(ended);
	};

	const onRequest = (offset, initial) => {
		setNewItemLoading(initial ? false : true);
		getAllComics(offset)
			.then(onComicsListLoaded)
			.then(() => setProcess('confirmed'));
	};

	// eslint-disable-next-line
	useEffect(() => onRequest(offset, true), []);

	const renderComics = () => {
		const comics = comicsList.map(({ id, title, thumbnail, price }, i) => (
			<li key={i} className="comics__item">
				<Link to={`/comics/${id}`}>
					<img src={thumbnail} alt={title} className="comics__item-img" />
					<div className="comics__item-name">{title}</div>
					<div className="comics__item-price">{price}</div>
				</Link>
			</li>
		));

		return <ul className="comics__grid">{comics}</ul>;
	};

	return (
		<div className="comics__list">
			{setContent(process, renderComics, newItemLoading)}
			<button
				className="button button__main button__long"
				disabled={newItemLoading}
				style={{ display: comicsEnded ? 'none' : 'block' }}
				onClick={() => onRequest(offset)}
			>
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

export default ComicsList;
