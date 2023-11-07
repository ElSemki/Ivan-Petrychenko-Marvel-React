import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
	const {
		loading,
		error,
		newItemLoading,
		setNewItemLoading,
		request,
		clearError,
	} = useHttp();
	const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const _apiKey = 'apikey=d194751b13933ab372a4ac82fd8dbf5d';
	const _baseOffset = 210;
	const _baseComicsOffset = 0;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		);

		return res.data.results.map(_transformCharacter);
	};

	const getCharacter = async id => {
		const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};

	const getAllComics = async (offset = _baseComicsOffset) => {
		const res = await request(
			`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComic);
	};

	const getComics = async id => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComic(res.data.results[0]);
	};

	const _transformCharacter = char => {
		return {
			id: char.id,
			name: char.name,
			description: char.description
				? `${char.description.slice(0, 210)}…`
				: 'There is no description for this character',
			thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items.slice(0, 10),
		};
	};

	const _transformComic = comic => {
		return {
			id: comic.id,
			title: comic.title,
			thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
			description: comic.description || 'There is no description',
			pageCount: comic.pageCount
				? `${comic.pageCount} p.`
				: 'No information about the number of pages',
			language: comic.textObjects[0]?.language || 'en-us',
			price: comic.prices[0].price
				? `${comic.prices[0].price}$`
				: 'not available',
		};
	};

	return {
		loading,
		error,
		newItemLoading,
		setNewItemLoading,
		getAllCharacters,
		getCharacter,
		getAllComics,
		getComics,
		clearError,
	};
};

export default useMarvelService;
