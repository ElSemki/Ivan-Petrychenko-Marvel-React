import { Component } from 'react';
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import AppHeader from '../appHeader/AppHeader';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import RandomChar from '../randomChar/RandomChar';

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
					<ErrorBoundary>
						<RandomChar />
					</ErrorBoundary>
					<div className="char__content">
						<ErrorBoundary>
							<CharList onCharSelected={this.charSelectedHandler} />
						</ErrorBoundary>
						<ErrorBoundary>
							<CharInfo charId={this.state.selectedChar} />
						</ErrorBoundary>
					</div>
					<img className="bg-decoration" src={decoration} alt="vision" />
				</main>
			</div>
		);
	}
}

export default App;
