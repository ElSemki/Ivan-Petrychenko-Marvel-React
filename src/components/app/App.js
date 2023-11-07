import { useState } from 'react';
import AppHeader from '../appHeader/AppHeader';
import ComicsList from '../comicsList/ComicsList';

const App = () => {
	const [selectedChar, setSelectedChar] = useState(null);

	const charSelectedHandler = id => setSelectedChar(id);

	return (
		<div className="app">
			<AppHeader />
			<main>
				{/* <ErrorBoundary>
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
				<img className="bg-decoration" src={decoration} alt="vision" /> */}
				<ComicsList />
			</main>
		</div>
	);
};

export default App;
