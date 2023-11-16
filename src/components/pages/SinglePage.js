import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import AppBanner from '../appBanner/AppBanner';

const SingleChar = ({ Component, dataType }) => {
	const { id } = useParams();
	const [data, setData] = useState(null);

	const { process, setProcess, getCharacter, getComic, clearError } =
		useMarvelService();

	const onDataLoaded = data => setData(data);

	useEffect(() => {
		clearError();

		// eslint-disable-next-line
		switch (dataType) {
			case 'comic':
				getComic(id)
					.then(onDataLoaded)
					.then(() => setProcess('confirmed'));
				break;
			case 'character':
				getCharacter(id)
					.then(onDataLoaded)
					.then(() => setProcess('confirmed'));
				break;
		}
		// eslint-disable-next-line
	}, [id]);

	return (
		<>
			<AppBanner />
			{setContent(process, Component, data)}
		</>
	);
};

export default SingleChar;
