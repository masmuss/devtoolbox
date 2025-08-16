export interface DiffLine {
	type: "added" | "removed" | "unchanged";
	content: string;
	lineNumber?: number;
}

export interface DiffStats {
	additions: number;
	deletions: number;
	modifications: number;
	totalLines: number;
}

export function generateDiff(
	originalText: string,
	modifiedText: string,
): { lines: DiffLine[]; stats: DiffStats } {
	const originalLines = originalText.split("\n");
	const modifiedLines = modifiedText.split("\n");

	const diffLines: DiffLine[] = [];
	const stats: DiffStats = {
		additions: 0,
		deletions: 0,
		modifications: 0,
		totalLines: 0,
	};

	// Simple line-by-line diff algorithm
	const maxLines = Math.max(originalLines.length, modifiedLines.length);

	for (let i = 0; i < maxLines; i++) {
		const originalLine = originalLines[i];
		const modifiedLine = modifiedLines[i];

		if (originalLine === undefined) {
			// Line was added
			diffLines.push({
				type: "added",
				content: modifiedLine,
				lineNumber: i + 1,
			});
			stats.additions++;
		} else if (modifiedLine === undefined) {
			// Line was removed
			diffLines.push({
				type: "removed",
				content: originalLine,
				lineNumber: i + 1,
			});
			stats.deletions++;
		} else if (originalLine === modifiedLine) {
			// Line unchanged
			diffLines.push({
				type: "unchanged",
				content: originalLine,
				lineNumber: i + 1,
			});
		} else {
			// Line modified - show both removed and added
			diffLines.push({
				type: "removed",
				content: originalLine,
				lineNumber: i + 1,
			});
			diffLines.push({
				type: "added",
				content: modifiedLine,
				lineNumber: i + 1,
			});
			stats.modifications++;
		}
	}

	stats.totalLines = diffLines.length;

	return { lines: diffLines, stats };
}

export function generateWordDiff(originalText: string, modifiedText: string): string {
	const originalWords = originalText.split(/(\s+)/);
	const modifiedWords = modifiedText.split(/(\s+)/);

	const result: string[] = [];
	const maxWords = Math.max(originalWords.length, modifiedWords.length);

	for (let i = 0; i < maxWords; i++) {
		const originalWord = originalWords[i];
		const modifiedWord = modifiedWords[i];

		if (originalWord === modifiedWord) {
			result.push(originalWord || "");
		} else if (originalWord && !modifiedWord) {
			result.push(
				`<span class="bg-muted text-muted-foreground line-through px-1 rounded">${originalWord}</span>`,
			);
		} else if (!originalWord && modifiedWord) {
			result.push(
				`<span class="bg-foreground text-background px-1 rounded font-medium">${modifiedWord}</span>`,
			);
		} else {
			result.push(
				`<span class="bg-muted text-muted-foreground line-through px-1 rounded">${originalWord}</span>`,
			);
			result.push(
				`<span class="bg-foreground text-background px-1 rounded font-medium">${modifiedWord}</span>`,
			);
		}
	}

	return result.join("");
}

export function calculateSimilarity(text1: string, text2: string): number {
	if (text1 === text2) return 100;
	if (!text1 || !text2) return 0;

	const longer = text1.length > text2.length ? text1 : text2;
	const shorter = text1.length > text2.length ? text2 : text1;

	if (longer.length === 0) return 100;

	const editDistance = levenshteinDistance(longer, shorter);
	return Math.round(((longer.length - editDistance) / longer.length) * 100);
}

function levenshteinDistance(str1: string, str2: string): number {
	const matrix = Array(str2.length + 1)
		.fill(null)
		.map(() => Array(str1.length + 1).fill(null));

	for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
	for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

	for (let j = 1; j <= str2.length; j++) {
		for (let i = 1; i <= str1.length; i++) {
			const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
			matrix[j][i] = Math.min(
				matrix[j][i - 1] + 1,
				matrix[j - 1][i] + 1,
				matrix[j - 1][i - 1] + indicator,
			);
		}
	}

	return matrix[str2.length][str1.length];
}
