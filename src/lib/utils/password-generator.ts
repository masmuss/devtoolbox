export interface PasswordOptions {
	includeUppercase: boolean;
	includeLowercase: boolean;
	includeNumbers: boolean;
	includeSymbols: boolean;
	excludeSimilar: boolean;
}

export interface PasswordGeneratorState {
	password: string;
	length: number;
	options: PasswordOptions;
}

export const generateSecurePassword = (length: number, options: PasswordOptions): string => {
	let charset = "";

	if (options.includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	if (options.includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
	if (options.includeNumbers) charset += "0123456789";
	if (options.includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

	if (options.excludeSimilar) {
		charset = charset.replace(/[il1Lo0O]/g, "");
	}

	if (!charset) {
		return "Please select at least one character type";
	}

	let result = "";
	for (let i = 0; i < length; i++) {
		result += charset.charAt(Math.floor(Math.random() * charset.length));
	}

	return result;
};

export const getPasswordStrength = (
	password: string,
): {
	score: number;
	label: string;
	color: string;
	details: string[];
	entropy: number;
} => {
	if (!password || password === "Please select at least one character type") {
		return {
			score: 0,
			label: "No password",
			color: "text-neutral-400",
			details: [],
			entropy: 0,
		};
	}

	let score = 0;
	const details: string[] = [];
	let charsetSize = 0;

	// Length scoring
	if (password.length >= 8) {
		score += 1;
		details.push("✓ At least 8 characters");
	} else {
		details.push("✗ Less than 8 characters");
	}

	if (password.length >= 12) {
		score += 1;
		details.push("✓ 12+ characters (recommended)");
	} else if (password.length >= 8) {
		details.push("⚠ Consider 12+ characters");
	}

	// Character type scoring
	if (/[a-z]/.test(password)) {
		score += 1;
		charsetSize += 26;
		details.push("✓ Contains lowercase letters");
	} else {
		details.push("✗ Missing lowercase letters");
	}

	if (/[A-Z]/.test(password)) {
		score += 1;
		charsetSize += 26;
		details.push("✓ Contains uppercase letters");
	} else {
		details.push("✗ Missing uppercase letters");
	}

	if (/[0-9]/.test(password)) {
		score += 1;
		charsetSize += 10;
		details.push("✓ Contains numbers");
	} else {
		details.push("✗ Missing numbers");
	}

	if (/[^A-Za-z0-9]/.test(password)) {
		score += 1;
		charsetSize += 32;
		details.push("✓ Contains special characters");
	} else {
		details.push("✗ Missing special characters");
	}

	// Calculate entropy (bits of randomness)
	const entropy = Math.log2(Math.pow(charsetSize, password.length));

	// Additional security checks
	if (password.length >= 16) {
		score += 1;
		details.push("✓ Excellent length (16+ chars)");
	}

	// Check for patterns
	if (!/(.)\1{2,}/.test(password)) {
		details.push("✓ No repeated character sequences");
	} else {
		details.push("⚠ Contains repeated characters");
		score -= 0.5;
	}

	// Final scoring
	if (score <= 2)
		return {
			score,
			label: "Weak",
			color: "text-red-500",
			details,
			entropy: Math.round(entropy),
		};
	if (score <= 4)
		return {
			score,
			label: "Medium",
			color: "text-yellow-500",
			details,
			entropy: Math.round(entropy),
		};
	if (score <= 6)
		return {
			score,
			label: "Strong",
			color: "text-green-500",
			details,
			entropy: Math.round(entropy),
		};
	return {
		score,
		label: "Very Strong",
		color: "text-emerald-500",
		details,
		entropy: Math.round(entropy),
	};
};
