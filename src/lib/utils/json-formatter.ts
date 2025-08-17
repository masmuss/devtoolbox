export interface JsonFormatResult {
	formatted: string;
	minified: string;
	isValid: boolean;
	error?: string;
	stats: {
		originalSize: number;
		formattedSize: number;
		minifiedSize: number;
		compressionRatio: number;
		depth: number;
		keys: number;
		values: number;
	};
}

export interface JsonValidationError {
	message: string;
	line?: number;
	column?: number;
	position?: number;
}

export function formatJson(input: string, indent = 2): JsonFormatResult {
	if (!input.trim()) {
		return {
			formatted: "",
			minified: "",
			isValid: false,
			error: "Input is empty",
			stats: {
				originalSize: 0,
				formattedSize: 0,
				minifiedSize: 0,
				compressionRatio: 0,
				depth: 0,
				keys: 0,
				values: 0,
			},
		};
	}

	try {
		// Parse JSON to validate
		const parsed = JSON.parse(input);

		// Format with specified indentation
		const formatted = JSON.stringify(parsed, null, indent);

		// Minify
		const minified = JSON.stringify(parsed);

		// Calculate stats
		const stats = analyzeJsonStructure(parsed, input, formatted, minified);

		return {
			formatted,
			minified,
			isValid: true,
			stats,
		};
	} catch (error) {
		const validationError = parseJsonError(error as Error, input);

		return {
			formatted: "",
			minified: "",
			isValid: false,
			error: validationError.message,
			stats: {
				originalSize: input.length,
				formattedSize: 0,
				minifiedSize: 0,
				compressionRatio: 0,
				depth: 0,
				keys: 0,
				values: 0,
			},
		};
	}
}

export function minifyJson(input: string): JsonFormatResult {
	return formatJson(input, 0);
}

export function validateJson(input: string): { isValid: boolean; error?: JsonValidationError } {
	if (!input.trim()) {
		return { isValid: false, error: { message: "Input is empty" } };
	}

	try {
		JSON.parse(input);
		return { isValid: true };
	} catch (error) {
		return { isValid: false, error: parseJsonError(error as Error, input) };
	}
}

function parseJsonError(error: Error, input: string): JsonValidationError {
	const message = error.message;

	// Try to extract line and column information
	const lineMatch = message.match(/line (\d+)/i);
	const columnMatch = message.match(/column (\d+)/i);
	const positionMatch = message.match(/position (\d+)/i);

	let line: number | undefined;
	let column: number | undefined;
	let position: number | undefined;

	if (lineMatch) line = Number.parseInt(lineMatch[1], 10);
	if (columnMatch) column = Number.parseInt(columnMatch[1], 10);
	if (positionMatch) position = Number.parseInt(positionMatch[1], 10);

	// If we have position but not line/column, calculate them
	if (position && !line) {
		const lines = input.substring(0, position).split("\n");
		line = lines.length;
		column = lines[lines.length - 1].length + 1;
	}

	return {
		message: cleanErrorMessage(message),
		line,
		column,
		position,
	};
}

function cleanErrorMessage(message: string): string {
	// Clean up common JSON error messages
	return message
		.replace(/^JSON\.parse: /, "")
		.replace(/^Unexpected token /, "Unexpected character ")
		.replace(
			/^Expected property name or '}' in JSON at position \d+/,
			"Expected property name or closing brace",
		);
}

function analyzeJsonStructure(
	parsed: any,
	original: string,
	formatted: string,
	minified: string,
): JsonFormatResult["stats"] {
	const originalSize = original.length;
	const formattedSize = formatted.length;
	const minifiedSize = minified.length;
	const compressionRatio =
		originalSize > 0 ? ((originalSize - minifiedSize) / originalSize) * 100 : 0;

	let depth = 0;
	let keys = 0;
	let values = 0;

	function traverse(obj: any, currentDepth = 1): void {
		depth = Math.max(depth, currentDepth);

		if (Array.isArray(obj)) {
			values += obj.length;
			obj.forEach((item) => {
				if (typeof item === "object" && item !== null) {
					traverse(item, currentDepth + 1);
				}
			});
		} else if (typeof obj === "object" && obj !== null) {
			const objKeys = Object.keys(obj);
			keys += objKeys.length;
			values += objKeys.length;

			objKeys.forEach((key) => {
				const value = obj[key];
				if (typeof value === "object" && value !== null) {
					traverse(value, currentDepth + 1);
				}
			});
		}
	}

	traverse(parsed);

	return {
		originalSize,
		formattedSize,
		minifiedSize,
		compressionRatio: Math.round(compressionRatio * 100) / 100,
		depth,
		keys,
		values,
	};
}

export function getJsonExamples(): Array<{ name: string; json: string; description: string }> {
	return [
		{
			name: "Simple Object",
			json: '{"name":"John","age":30,"city":"New York"}',
			description: "Basic JSON object with string and number values",
		},
		{
			name: "Array Example",
			json: '["apple","banana","cherry","date"]',
			description: "Simple array of strings",
		},
		{
			name: "Nested Object",
			json: '{"user":{"name":"Alice","profile":{"age":25,"skills":["JavaScript","React","Node.js"]}}}',
			description: "Complex nested object with arrays",
		},
		{
			name: "API Response",
			json: '{"status":"success","data":{"users":[{"id":1,"name":"John"},{"id":2,"name":"Jane"}],"total":2}}',
			description: "Typical API response structure",
		},
	];
}
