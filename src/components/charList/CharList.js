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
	};

	marvelService = new MarvelService();

	onCharactersLoaded = characters =>
		this.setState({ characters, loading: false });
	onError = () => this.setState({ loading: false, error: true });

	componentDidMount() {
		this.marvelService
			.getAllCharacters()
			.then(this.onCharactersLoaded)
			.catch(this.onError);
	}

	render() {
		const { characters, loading, error } = this.state;
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? (
			<View
				characters={characters}
				onCharSelected={this.props.onCharSelected}
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

const View = ({ characters, onCharSelected }) => {
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
			<button className="button button__main button__long">
				<div className="inner">load more</div>
			</button>
		</>
	);
};

export default CharList;
