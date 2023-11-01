class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=d194751b13933ab372a4ac82fd8dbf5d';

	getResource = async url => {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Could not fetch ${url}, status: ${response.status}`);
		}
		return await response.json();
	};

	getAllCharacters = () => {
		return this.getResource(
			`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
		);
	};

	getCharacter = id => {
		return this.getResource(
			`${this._apiBase}/characters/${id}?${this._apiKey}`
		);
	};
}

export default MarvelService;
