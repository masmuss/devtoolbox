interface XmlStats {
	originalSize: number;
	formattedSize: number;
	minifiedSize: number;
	compressionRatio: number;
	elements: number;
	attributes: number;
	depth: number;
	textNodes: number;
}

export interface XmlFormatResult {
	formatted: string;
	minified: string;
	isValid: boolean;
	error?: string;
	stats: XmlStats;
}

export interface XmlValidationError {
	message: string;
	line?: number;
	column?: number;
}

export function formatXml(input: string, indent = 2): XmlFormatResult {
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
				elements: 0,
				attributes: 0,
				depth: 0,
				textNodes: 0,
			},
		};
	}

	try {
		// Basic XML validation and formatting
		const validation = validateXml(input);
		if (!validation.isValid) {
			return {
				formatted: "",
				minified: "",
				isValid: false,
				error: validation.error?.message || "Invalid XML",
				stats: {
					originalSize: input.length,
					formattedSize: 0,
					minifiedSize: 0,
					compressionRatio: 0,
					elements: 0,
					attributes: 0,
					depth: 0,
					textNodes: 0,
				},
			};
		}

		const formatted = formatXmlString(input, indent);
		const minified = minifyXmlString(input);
		const stats = analyzeXmlStructure(input, formatted, minified);

		return {
			formatted,
			minified,
			isValid: true,
			stats,
		};
	} catch (error) {
		return {
			formatted: "",
			minified: "",
			isValid: false,
			error: (error as Error).message,
			stats: {
				originalSize: input.length,
				formattedSize: 0,
				minifiedSize: 0,
				compressionRatio: 0,
				elements: 0,
				attributes: 0,
				depth: 0,
				textNodes: 0,
			},
		};
	}
}

export function minifyXml(input: string): XmlFormatResult {
	return formatXml(input, 0);
}

export function validateXml(input: string): { isValid: boolean; error?: XmlValidationError } {
	if (!input.trim()) {
		return { isValid: false, error: { message: "Input is empty" } };
	}

	try {
		// Basic XML validation using DOMParser
		const parser = new DOMParser();
		const doc = parser.parseFromString(input, "text/xml");

		const parserError = doc.querySelector("parsererror");
		if (parserError) {
			const errorText = parserError.textContent || "XML parsing error";
			return { isValid: false, error: { message: errorText } };
		}

		return { isValid: true };
	} catch (error) {
		return { isValid: false, error: { message: (error as Error).message } };
	}
}

function formatXmlString(xml: string, indent: number): string {
	const indentStr = " ".repeat(indent);
	let formatted = "";
	let currentIndent = 0;
	let inTag = false;
	let inClosingTag = false;
	let tagContent = "";

	for (let i = 0; i < xml.length; i++) {
		const char = xml[i];
		const nextChar = xml[i + 1];

		if (char === "<") {
			if (tagContent.trim()) {
				formatted += tagContent.trim();
				tagContent = "";
			}

			inTag = true;
			inClosingTag = nextChar === "/";

			if (inClosingTag) {
				currentIndent--;
			}

			if (formatted && !formatted.endsWith("\n")) {
				formatted += "\n";
			}
			formatted += indentStr.repeat(Math.max(0, currentIndent)) + char;
		} else if (char === ">") {
			formatted += char;
			inTag = false;

			if (!inClosingTag && !xml.substring(i - 1, i + 1).includes("/")) {
				currentIndent++;
			}

			inClosingTag = false;

			if (nextChar && nextChar !== "<") {
				tagContent = "";
			} else if (nextChar === "<") {
				formatted += "\n";
			}
		} else if (inTag) {
			formatted += char;
		} else {
			tagContent += char;
		}
	}

	return formatted.trim();
}

function minifyXmlString(xml: string): string {
	return xml.replace(/>\s+</g, "><").replace(/\s+/g, " ").trim();
}

function analyzeXmlStructure(
	original: string,
	formatted: string,
	minified: string,
): XmlFormatResult["stats"] {
	const originalSize = original.length;
	const formattedSize = formatted.length;
	const minifiedSize = minified.length;
	const compressionRatio =
		originalSize > 0 ? ((originalSize - minifiedSize) / originalSize) * 100 : 0;

	// Count elements
	const elementMatches = original.match(/<[^!?][^>]*>/g) || [];
	const elements = elementMatches.filter((tag) => !tag.startsWith("</")).length;

	// Count attributes
	const attributeMatches = original.match(/\s+\w+\s*=\s*["'][^"']*["']/g) || [];
	const attributes = attributeMatches.length;

	// Calculate depth
	let depth = 0;
	let maxDepth = 0;
	for (const match of elementMatches) {
		if (match.startsWith("</")) {
			depth--;
		} else if (!match.endsWith("/>")) {
			depth++;
			maxDepth = Math.max(maxDepth, depth);
		}
	}

	// Count text nodes (approximate)
	const textContent = original.replace(/<[^>]*>/g, "").trim();
	const textNodes = textContent ? textContent.split(/\s+/).filter(Boolean).length : 0;

	return {
		originalSize,
		formattedSize,
		minifiedSize,
		compressionRatio: Math.round(compressionRatio * 100) / 100,
		elements,
		attributes,
		depth: maxDepth,
		textNodes,
	};
}

export function getXmlExamples(): Array<{ name: string; xml: string; description: string }> {
	return [
		{
			name: "Simple Document",
			xml: `<?xml version="1.0" encoding="UTF-8"?><root><item>Hello World</item></root>`,
			description: "Basic XML document with declaration",
		},
		{
			name: "Book Catalog",
			xml: `<catalog><book id="1"><title>XML Guide</title><author>John Doe</author><price>29.99</price></book></catalog>`,
			description: "XML with attributes and nested elements",
		},
		{
			name: "Configuration File",
			xml: `<config><database host="localhost" port="5432"><name>myapp</name><user>admin</user></database><logging level="info" file="/var/log/app.log"/></config>`,
			description: "Configuration-style XML with mixed content",
		},
		{
			name: "RSS Feed",
			xml: `<rss version="2.0"><channel><title>My Blog</title><description>Latest posts</description><item><title>First Post</title><link>https://example.com/post1</link></item></channel></rss>`,
			description: "RSS feed structure example",
		},
	];
}
