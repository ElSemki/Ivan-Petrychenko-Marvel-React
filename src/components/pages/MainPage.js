import { useState } from 'react';
import { Helmet } from 'react-helmet';
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import CharInfo from '../charInfo/CharInfo';
import CharList from '../charList/CharList';
import RandomChar from '../randomChar/RandomChar';
import SearchCharForm from '../searchCharForm/SearchCharForm';

const MainPage = () => {
	const [selectedChar, setSelectedChar] = useState(null);

	const charSelectedHandler = id => setSelectedChar(id);

	return (
		<>
			<Helmet>
				<meta name="description" content="Marvel information portal" />
				<title>Marvel information portal</title>
			</Helmet>
			<ErrorBoundary>
				<RandomChar />
			</ErrorBoundary>
			<div className="char__content">
				<ErrorBoundary>
					<CharList onCharSelected={charSelectedHandler} />
				</ErrorBoundary>
				<div>
					<ErrorBoundary>
						<CharInfo charId={selectedChar} />
					</ErrorBoundary>
					<ErrorBoundary>
						<SearchCharForm />
					</ErrorBoundary>
				</div>
			</div>
			<img className="bg-decoration" src={decoration} alt="vision" />
		</>
	);
};

export default MainPage;
