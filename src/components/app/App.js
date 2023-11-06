import { useState } from 'react';
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import AppHeader from '../appHeader/AppHeader';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import RandomChar from '../randomChar/RandomChar';

const App = () => {
	const [selectedChar, setSelectedChar] = useState(null);

	const charSelectedHandler = id => setSelectedChar(id);

	return (
		<div className="app">
			<AppHeader />
			<main>
				<ErrorBoundary>
					<RandomChar />
				</ErrorBoundary>
				<div className="char__content">
					<ErrorBoundary>
						<CharList onCharSelected={charSelectedHandler} />
					</ErrorBoundary>
					<ErrorBoundary>
						<CharInfo charId={selectedChar} />
					</ErrorBoundary>
				</div>
				<img className="bg-decoration" src={decoration} alt="vision" />
			</main>
		</div>
	);
};

export default App;
