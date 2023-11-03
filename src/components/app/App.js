import AppHeader from '../appHeader/AppHeader';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import RandomChar from '../randomChar/RandomChar';

import { Component } from 'react';
import decoration from '../../resources/img/vision.png';

class App extends Component {
	state = {
		selectedChar: null,
	};

	charSelectedHandler = id => this.setState({ selectedChar: id });

	render() {
		return (
			<div className="app">
				<AppHeader />
				<main>
					<RandomChar />
					<div className="char__content">
						<CharList onCharSelected={this.charSelectedHandler} />
						<CharInfo charId={this.state.selectedChar} />
					</div>
					<img className="bg-decoration" src={decoration} alt="vision" />
				</main>
			</div>
		);
	}
}

export default App;
