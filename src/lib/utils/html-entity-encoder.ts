export interface HtmlEntityResult {
	encoded: string;
	decoded: string;
	stats: {
		originalLength: number;
		encodedLength: number;
		decodedLength: number;
		entitiesFound: number;
		entitiesEncoded: number;
	};
}

// Common HTML entities mapping
const HTML_ENTITIES: Record<string, string> = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
	" ": "&nbsp;",
	"©": "&copy;",
	"®": "&reg;",
	"™": "&trade;",
	"€": "&euro;",
	"£": "&pound;",
	"¥": "&yen;",
	"¢": "&cent;",
	"§": "&sect;",
	"¶": "&para;",
	"•": "&bull;",
	"…": "&hellip;",
	"–": "&ndash;",
	"—": "&mdash;",
	"‘": "&lsquo;",
	"’": "&rsquo;",
	"“": "&ldquo;",
	"”": "&rdquo;",
	"«": "&laquo;",
	"»": "&raquo;",
	"°": "&deg;",
	"±": "&plusmn;",
	"×": "&times;",
	"÷": "&divide;",
	α: "&alpha;",
	β: "&beta;",
	γ: "&gamma;",
	δ: "&delta;",
	π: "&pi;",
	Σ: "&Sigma;",
	Ω: "&Omega;",
};

// Reverse mapping for decoding
const ENTITY_TO_CHAR = Object.fromEntries(
	Object.entries(HTML_ENTITIES).map(([char, entity]) => [entity, char]),
);

export function encodeHtmlEntities(text: string, encodeAll = false): string {
	if (!text) return "";

	let encoded = text;

	if (encodeAll) {
		// Encode all special characters
		for (const [char, entity] of Object.entries(HTML_ENTITIES)) {
			encoded = encoded.replace(new RegExp(escapeRegExp(char), "g"), entity);
		}
	} else {
		// Encode only essential HTML characters
		const essentialEntities = ["&", "<", ">", '"', "'"];
		for (const char of essentialEntities) {
			if (HTML_ENTITIES[char]) {
				encoded = encoded.replace(new RegExp(escapeRegExp(char), "g"), HTML_ENTITIES[char]);
			}
		}
	}

	return encoded;
}

export function decodeHtmlEntities(text: string): string {
	if (!text) return "";

	let decoded = text;

	// Decode named entities
	for (const [entity, char] of Object.entries(ENTITY_TO_CHAR)) {
		decoded = decoded.replace(new RegExp(escapeRegExp(entity), "g"), char);
	}

	// Decode numeric entities (&#123; and &#x1A;)
	decoded = decoded.replace(/&#(\d+);/g, (match, num) => {
		return String.fromCharCode(Number.parseInt(num, 10));
	});

	decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
		return String.fromCharCode(Number.parseInt(hex, 16));
	});

	return decoded;
}

export function analyzeHtmlEntities(text: string): HtmlEntityResult {
	const encoded = encodeHtmlEntities(text, true);
	const decoded = decodeHtmlEntities(text);

	// Count entities in original text
	const entityMatches = text.match(/&[a-zA-Z][a-zA-Z0-9]*;|&#\d+;|&#x[0-9a-fA-F]+;/g) || [];
	const entitiesFound = entityMatches.length;

	// Count how many characters would be encoded
	let entitiesEncoded = 0;
	for (const char of Object.keys(HTML_ENTITIES)) {
		const matches = text.match(new RegExp(escapeRegExp(char), "g"));
		if (matches) {
			entitiesEncoded += matches.length;
		}
	}

	return {
		encoded,
		decoded,
		stats: {
			originalLength: text.length,
			encodedLength: encoded.length,
			decodedLength: decoded.length,
			entitiesFound,
			entitiesEncoded,
		},
	};
}

function escapeRegExp(string: string): string {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function getCommonEntities(): Array<{ char: string; entity: string; description: string }> {
	return [
		{ char: "&", entity: "&amp;", description: "Ampersand" },
		{ char: "<", entity: "&lt;", description: "Less than" },
		{ char: ">", entity: "&gt;", description: "Greater than" },
		{ char: '"', entity: "&quot;", description: "Double quote" },
		{ char: "'", entity: "&#39;", description: "Single quote" },
		{ char: " ", entity: "&nbsp;", description: "Non-breaking space" },
		{ char: "©", entity: "&copy;", description: "Copyright" },
		{ char: "®", entity: "&reg;", description: "Registered trademark" },
		{ char: "™", entity: "&trade;", description: "Trademark" },
		{ char: "€", entity: "&euro;", description: "Euro sign" },
		{ char: "£", entity: "&pound;", description: "Pound sign" },
		{ char: "¥", entity: "&yen;", description: "Yen sign" },
	];
}
