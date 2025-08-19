import {
	Calculator,
	Calendar,
	Clock,
	Code,
	Cpu,
	Database,
	FileText,
	Globe,
	Hash,
	ImageIcon,
	Key,
	Link,
	type LucideIcon,
	Mail,
	Palette,
	Shield,
	Smartphone,
	Terminal,
	Zap,
} from "lucide-react";

export interface Tool {
	title: string;
	description: string;
	icon: LucideIcon;
	category: string;
	popular?: boolean;
	href?: string;
}

export const allTools: Tool[] = [
	// Security Tools
	{
		title: "JWT Token Generator",
		description: "Generate and decode JSON Web Tokens with custom payloads and algorithms",
		icon: Shield,
		category: "Security",
		popular: true,
		href: "/tools/jwt-generator",
	},
	{
		title: "Password Generator",
		description: "Create secure passwords with customizable length, complexity, and character sets",
		icon: Key,
		category: "Security",
		popular: true,
		href: "/tools/password-generator",
	},
	{
		title: "Hash Generator",
		description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes from any input text or file",
		icon: Hash,
		category: "Security",
		href: "/tools/hash-generator",
	},
	{
		title: "HMAC Generator",
		description: "Generate Hash-based Message Authentication Codes for data integrity",
		icon: Shield,
		category: "Security",
		href: "/tools/hmac",
	},
	{
		title: "RSA Key Generator",
		description: "Generate RSA public/private key pairs for encryption and signing",
		icon: Key,
		category: "Security",
		href: "/tools/rsa-keys",
	},

	// Text Tools
	{
		title: "Slug Generator",
		description: "Convert text to URL-friendly slugs with customizable separators and case options",
		icon: Link,
		category: "Text",
		popular: true,
		href: "/tools/slug-generator",
	},
	{
		title: "Lorem Ipsum Generator",
		description: "Generate placeholder text in paragraphs, words, or sentences for mockups",
		icon: FileText,
		category: "Text",
		href: "/tools/lorem-ipsum",
	},
	{
		title: "Text Case Converter",
		description: "Convert text between uppercase, lowercase, title case, and camelCase",
		icon: FileText,
		category: "Text",
		href: "/tools/text-case",
	},
	{
		title: "Word Counter",
		description: "Count words, characters, paragraphs, and reading time for any text",
		icon: FileText,
		category: "Text",
		href: "/tools/word-counter",
	},
	{
		title: "Text Diff Checker",
		description: "Compare two texts and highlight differences line by line",
		icon: FileText,
		category: "Text",
		href: "/tools/text-diff",
	},

	// Encoding Tools
	{
		title: "Base64 Encoder/Decoder",
		description: "Encode and decode Base64 strings with support for files and images",
		icon: Code,
		category: "Encoding",
		href: "/tools/base64",
	},
	{
		title: "URL Encoder/Decoder",
		description: "Encode and decode URLs and query parameters for web development",
		icon: Globe,
		category: "Encoding",
		href: "/tools/url-encoder",
	},
	{
		title: "HTML Entity Encoder",
		description: "Convert special characters to HTML entities and vice versa",
		icon: Code,
		category: "Encoding",
		href: "/tools/html-entities",
	},
	{
		title: "JSON Formatter",
		description: "Format, validate, and minify JSON data with syntax highlighting",
		icon: Code,
		category: "Encoding",
		href: "/tools/json-formatter",
	},
	{
		title: "XML Formatter",
		description: "Format and validate XML documents with proper indentation",
		icon: Code,
		category: "Encoding",
		href: "/tools/xml-formatter",
	},

	// Time Tools
	{
		title: "Unix Timestamp Converter",
		description: "Convert between Unix timestamps and human-readable date formats",
		icon: Clock,
		category: "Time",
		href: "/tools/unix-timestamp-converter",
	},
	{
		title: "Date Calculator",
		description: "Calculate differences between dates and add/subtract time periods",
		icon: Calendar,
		category: "Time",
		href: "/tools/date-calculator",
	},
	{
		title: "Timezone Converter",
		description: "Convert times between different timezones around the world",
		icon: Clock,
		category: "Time",
	},
	{
		title: "Cron Expression Generator",
		description: "Generate and validate cron expressions for scheduled tasks",
		icon: Clock,
		category: "Time",
		href: "/tools/cron-expression-generator",
	},

	// Utilities
	{
		title: "UUID Generator",
		description: "Generate unique identifiers (UUID v1, v4) for your applications",
		icon: Zap,
		category: "Utilities",
		popular: true,
		href: "/tools/uuid",
	},
	{
		title: "QR Code Generator",
		description: "Generate QR codes for URLs, text, WiFi credentials, and more",
		icon: Smartphone,
		category: "Utilities",
	},
	{
		title: "Regex Tester",
		description: "Test and debug regular expressions with real-time matching",
		icon: Terminal,
		category: "Utilities",
	},
	{
		title: "Email Validator",
		description: "Validate email addresses and check for common formatting issues",
		icon: Mail,
		category: "Utilities",
	},
	{
		title: "IP Address Lookup",
		description: "Get detailed information about IP addresses including location",
		icon: Globe,
		category: "Utilities",
	},

	// Database Tools
	{
		title: "SQL Formatter",
		description: "Format and beautify SQL queries with proper indentation",
		icon: Database,
		category: "Database",
	},
	{
		title: "MongoDB Query Builder",
		description: "Build MongoDB queries with a visual interface",
		icon: Database,
		category: "Database",
	},
	{
		title: "Database Schema Generator",
		description: "Generate database schemas from JSON or CSV data",
		icon: Database,
		category: "Database",
	},

	// Performance Tools
	{
		title: "Image Compressor",
		description: "Compress images while maintaining quality for web optimization",
		icon: ImageIcon,
		category: "Performance",
	},
	{
		title: "CSS Minifier",
		description: "Minify CSS code to reduce file size and improve loading speed",
		icon: Cpu,
		category: "Performance",
	},
	{
		title: "JavaScript Minifier",
		description: "Minify JavaScript code while preserving functionality",
		icon: Cpu,
		category: "Performance",
	},

	// Math Tools
	{
		title: "Number Base Converter",
		description: "Convert numbers between binary, decimal, hexadecimal, and octal",
		icon: Calculator,
		category: "Math",
	},
	{
		title: "Percentage Calculator",
		description: "Calculate percentages, percentage changes, and ratios",
		icon: Calculator,
		category: "Math",
	},
];

// Popular tools for homepage (subset of allTools)
export const popularTools: Tool[] = allTools
	.filter((tool) => tool.popular || tool.href)
	.slice(0, 9);
export const toolCategories: string[] = Array.from(new Set(allTools.map((tool) => tool.category)));
