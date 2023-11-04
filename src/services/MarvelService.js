class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=d194751b13933ab372a4ac82fd8dbf5d';
	_baseOffset = 210;

	getResource = async url => {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Could not fetch ${url}, status: ${response.status}`);
		}
		return await response.json();
	};

	getAllCharacters = async (offset = this._baseOffset) => {
		const res = await this.getResource(
			`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
		);

		return res.data.results.map(this._transformCharacter);
	};

	getCharacter = async id => {
		const res = await this.getResource(
			`${this._apiBase}/characters/${id}?${this._apiKey}`
		);
		return this._transformCharacter(res.data.results[0]);
	};

	_transformCharacter = char => {
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
}

export default MarvelService;
