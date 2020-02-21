const MARSHAL_TYPES = require('./types');

/**
 * Convert string to tree data
 *
 * @param {string} str
 *
 * @return {Object|Array|null}
 */
const Unmarshal = str => {
	if (!str || typeof str !== "string" || str.length < 1) {
		return null
	}

	let typeString = MARSHAL_TYPES.UNDEFINED;

	if (str.startsWith('{')) {
		typeString = MARSHAL_TYPES.OBJECT;
	} else if (str.startsWith('[')) {
		typeString = MARSHAL_TYPES.ARRAY;
	} else if (str === 'null') {
		typeString = MARSHAL_TYPES.NULL;
	} else if (!isNaN(str)) {
		return Number(str)
	} else {
		typeString = typeof str;
	}

	const removeQuotes = string => string.replace(/["{}\[\]]/g, '');
	const smartSplit   = (string, startPos = 0) => {
		const commaPos = string.indexOf(',', startPos);
		if (commaPos !== -1) {
			const focusString        = string.substr(0, commaPos);
			const countLeftBrackets  = (focusString.match(/[{\[]/g) || []).length;
			const countRightBrackets = (focusString.match(/[}\]]/g) || []).length;

			if (countLeftBrackets === countRightBrackets) {
				return [string.slice(0, commaPos), string.slice(commaPos + 1)];
			}

			return smartSplit(string, commaPos + 1);
		}

		return [string];
	}

	switch (typeString) {
		case MARSHAL_TYPES.ARRAY:
			const array = [];

			let arrayValue,
				restArray = str.replace(/(^\[|]$)/gm, '');

			do {
				[arrayValue, restArray] = smartSplit(restArray);

				array.push(Unmarshal(arrayValue));
			} while (restArray !== undefined);

			return array;

		case MARSHAL_TYPES.OBJECT:
			const result = {};

			let keyValue,
				restString = str;

			do {
				[keyValue, restString] = smartSplit(restString.replace(/(^{|}$)/gm, ''));

				// Split by first colon
				const [key, value] = keyValue
					.replace(':', '\x02')
					.split('\x02');

				result[removeQuotes(key)] = Unmarshal(value);
			} while (restString !== undefined);

			return result;

		case MARSHAL_TYPES.STRING:
			return removeQuotes(str);

		case MARSHAL_TYPES.NULL:
			return null;

		default:
			return str;
	}
};

module.exports = Unmarshal;
