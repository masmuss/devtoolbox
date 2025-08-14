export const getWordCount = (text: string) => {
	return text
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0).length;
};

export const getCharacterCount = (text: string) => {
	return text.length;
};
