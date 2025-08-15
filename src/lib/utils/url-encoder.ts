export interface URLEncodingResult {
	encoded: string;
	error?: string;
	stats: {
		originalLength: number;
		encodedLength: number;
		charactersEncoded: number;
		encodingRatio: number;
	};
}

export interface URLDecodingResult {
	decoded: string;
	error?: string;
	stats: {
		originalLength: number;
		decodedLength: number;
		charactersDecoded: number;
	};
}

export function encodeURL(input: string): URLEncodingResult {
	try {
		if (!input.trim()) {
			return {
				encoded: "",
				stats: {
					originalLength: 0,
					encodedLength: 0,
					charactersEncoded: 0,
					encodingRatio: 0,
				},
			};
		}

		const encoded = encodeURIComponent(input);
		const charactersEncoded = (encoded.match(/%[0-9A-F]{2}/g) || []).length;

		return {
			encoded,
			stats: {
				originalLength: input.length,
				encodedLength: encoded.length,
				charactersEncoded,
				encodingRatio: encoded.length / input.length,
			},
		};
	} catch (error) {
		return {
			encoded: "",
			error: "Invalid input for encoding",
			stats: {
				originalLength: input.length,
				encodedLength: 0,
				charactersEncoded: 0,
				encodingRatio: 0,
			},
		};
	}
}

export function decodeURL(input: string): URLDecodingResult {
	try {
		if (!input.trim()) {
			return {
				decoded: "",
				stats: {
					originalLength: 0,
					decodedLength: 0,
					charactersDecoded: 0,
				},
			};
		}

		const decoded = decodeURIComponent(input);
		const charactersDecoded = (input.match(/%[0-9A-F]{2}/gi) || []).length;

		return {
			decoded,
			stats: {
				originalLength: input.length,
				decodedLength: decoded.length,
				charactersDecoded,
			},
		};
	} catch (error) {
		return {
			decoded: "",
			error: "Invalid URL encoding",
			stats: {
				originalLength: input.length,
				decodedLength: 0,
				charactersDecoded: 0,
			},
		};
	}
}

export const urlExamples: Array<{
	category: string;
	examples: string[];
}> = [
	{
		category: "Basic URLs",
		examples: [
			"https://example.com/search?q=hello world&category=tech",
			"https://api.example.com/users?name=John Doe&email=john@example.com",
		],
	},
	{
		category: "Special Characters",
		examples: [
			"Special characters: !@#$%^&*()+={}[]|\\:;\"'<>,.?/~`",
			"Spaces and symbols: This is a test & more!",
		],
	},
	{
		category: "Unicode & International",
		examples: [
			"Unicode: 你好世界 🌍 café naïve résumé",
			"Arabic: مرحبا بالعالم",
			"Japanese: こんにちは世界",
		],
	},
];
