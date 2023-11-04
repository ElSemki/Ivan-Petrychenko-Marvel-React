import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import './charList.scss';

class CharList extends Component {
	state = {
		characters: [],
		loading: true,
		error: false,
		newItemLoading: false,
		offset: 210,
		charEnded: false,
	};

	marvelService = new MarvelService();

	onCharactersLoaded = newCharacters => {
		let ended = false;
		if (newCharacters.length < 9) {
			ended = true;
		}

		this.setState(({ characters, offset }) => ({
			characters: [...characters, ...newCharacters],
			loading: false,
			newItemLoading: false,
			offset: (offset += 9),
			charEnded: ended,
		}));
	};

	onError = () => this.setState({ loading: false, error: true });

	onCharListLoading = () => this.setState({ newItemLoading: true });

	onRequest = offset => {
		this.onCharListLoading();
		this.marvelService
			.getAllCharacters(offset)
			.then(this.onCharactersLoaded)
			.catch(this.onError);
	};

	componentDidMount() {
		this.onRequest();
	}

	render() {
		const { characters, loading, error, newItemLoading, offset, charEnded } =
			this.state;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? (
			<View
				characters={characters}
				onCharSelected={this.props.onCharSelected}
				onRequest={this.onRequest}
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
	}
}

const View = ({
	characters,
	onCharSelected,
	onRequest,
	newItemLoading,
	offset,
	charEnded,
}) => {
	const cards = characters.map(({ id, name, thumbnail }) => {
		const imgStyle = { objectFit: 'cover' };

		if (
			thumbnail ===
			'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
		) {
			imgStyle.objectFit = 'fill';
		}

		return (
			<li className="char__item" key={id} onClick={() => onCharSelected(id)}>
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
