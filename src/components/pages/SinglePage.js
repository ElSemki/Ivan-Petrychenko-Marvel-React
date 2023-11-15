import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';

const SingleChar = ({ Component, dataType }) => {
	const { id } = useParams();
	const [data, setData] = useState(null);

	const { loading, error, getCharByName, getComic, clearError } =
		useMarvelService();

	const onDataLoaded = data => setData(data);

	useEffect(() => {
		clearError();

		// eslint-disable-next-line
		switch (dataType) {
			case 'comic':
				getComic(id).then(onDataLoaded);
				break;
			case 'character':
				getCharByName(id).then(onDataLoaded);
				break;
		}
	}, [id]);

	const errorMessage =
		error || (Array.isArray(data) && !data.length) ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !data) ? (
		<Component data={data} />
	) : null;

	return (
		<>
			<AppBanner />
			{errorMessage}
			{spinner}
			{content}
		</>
	);
};

export default SingleChar;
