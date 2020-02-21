const MARSHAL_TYPES = require('./types');

/**
 * Convert tree data to string
 *
 * @param {Object|Array} tree
 *
 * @return {string|*}
 */
const Marshal = tree => {
	let treeType = MARSHAL_TYPES.UNDEFINED;

	if (Array.isArray(tree)) {
		treeType = MARSHAL_TYPES.ARRAY;
	} else if (tree === null) {
		treeType = MARSHAL_TYPES.NULL;
	} else if (typeof tree === "object") {
		treeType = MARSHAL_TYPES.OBJECT;
	} else if (isNaN(tree) && typeof tree === "number") {
		treeType = MARSHAL_TYPES.NAN;
	} else {
		treeType = typeof tree
	}

	let quotes = value => `{${value}}`;
	let format = (key, value) => `"${key}":${value}`;

	switch (treeType) {
		case MARSHAL_TYPES.ARRAY:
			quotes = value => `[${value}]`;
			format = (key, value) => value;

		case MARSHAL_TYPES.OBJECT:
			const result = [];

			Object.entries(tree).forEach(([key, value]) => {
				const strValue = Marshal(value);

				if (strValue !== undefined) {
					result.push(format(key, strValue));
				}
			})

			return quotes(result.join(','))

		case MARSHAL_TYPES.STRING:
			return `"${tree}"`;

		case MARSHAL_TYPES.NAN:
			return null;

		case MARSHAL_TYPES.UNDEFINED:
			return undefined;

		default:
			return tree;
	}
};

module.exports = Marshal;
