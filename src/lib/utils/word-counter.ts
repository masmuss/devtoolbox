export interface WordCountStats {
	characters: number;
	charactersNoSpaces: number;
	words: number;
	sentences: number;
	paragraphs: number;
	lines: number;
	readingTime: number;
	speakingTime: number;
}

export interface ReadabilityStats {
	averageWordsPerSentence: number;
	averageCharactersPerWord: number;
	longestWord: string;
	mostCommonWords: Array<{ word: string; count: number }>;
}

export function analyzeText(text: string): WordCountStats & { readability: ReadabilityStats } {
	if (!text.trim()) {
		return {
			characters: 0,
			charactersNoSpaces: 0,
			words: 0,
			sentences: 0,
			paragraphs: 0,
			lines: 0,
			readingTime: 0,
			speakingTime: 0,
			readability: {
				averageWordsPerSentence: 0,
				averageCharactersPerWord: 0,
				longestWord: "",
				mostCommonWords: [],
			},
		};
	}

	const characters = text.length;
	const charactersNoSpaces = text.replace(/\s/g, "").length;
	const words = text
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0);
	const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
	const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
	const lines = text.split("\n").filter((line) => line.trim().length > 0);

	// Reading time (average 200 words per minute)
	const readingTime = Math.ceil(words.length / 200);

	// Speaking time (average 150 words per minute)
	const speakingTime = Math.ceil(words.length / 150);

	// Readability analysis
	const averageWordsPerSentence = sentences.length > 0 ? words.length / sentences.length : 0;
	const averageCharactersPerWord = words.length > 0 ? charactersNoSpaces / words.length : 0;
	const longestWord = words.reduce(
		(longest, word) =>
			word.replace(/[^\w]/g, "").length > longest.length ? word.replace(/[^\w]/g, "") : longest,
		"",
	);

	// Most common words (excluding common stop words)
	const stopWords = new Set([
		"the",
		"a",
		"an",
		"and",
		"or",
		"but",
		"in",
		"on",
		"at",
		"to",
		"for",
		"of",
		"with",
		"by",
		"is",
		"are",
		"was",
		"were",
		"be",
		"been",
		"have",
		"has",
		"had",
		"do",
		"does",
		"did",
		"will",
		"would",
		"could",
		"should",
		"may",
		"might",
		"must",
		"can",
		"this",
		"that",
		"these",
		"those",
		"i",
		"you",
		"he",
		"she",
		"it",
		"we",
		"they",
		"me",
		"him",
		"her",
		"us",
		"them",
	]);

	const wordFreq = words
		.map((word) => word.toLowerCase().replace(/[^\w]/g, ""))
		.filter((word) => word.length > 2 && !stopWords.has(word))
		.reduce(
			(freq, word) => {
				freq[word] = (freq[word] || 0) + 1;
				return freq;
			},
			{} as Record<string, number>,
		);

	const mostCommonWords = Object.entries(wordFreq)
		.sort(([, a], [, b]) => b - a)
		.slice(0, 5)
		.map(([word, count]) => ({ word, count }));

	return {
		characters,
		charactersNoSpaces,
		words: words.length,
		sentences: sentences.length,
		paragraphs: paragraphs.length,
		lines: lines.length,
		readingTime,
		speakingTime,
		readability: {
			averageWordsPerSentence: Math.round(averageWordsPerSentence * 10) / 10,
			averageCharactersPerWord: Math.round(averageCharactersPerWord * 10) / 10,
			longestWord,
			mostCommonWords,
		},
	};
}
