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
): { score: number; label: string; color: string } => {
	if (!password || password === "Please select at least one character type") {
		return { score: 0, label: "No password", color: "text-neutral-400" };
	}

	let score = 0;
	if (password.length >= 8) score += 1;
	if (password.length >= 12) score += 1;
	if (/[a-z]/.test(password)) score += 1;
	if (/[A-Z]/.test(password)) score += 1;
	if (/[0-9]/.test(password)) score += 1;
	if (/[^A-Za-z0-9]/.test(password)) score += 1;

	if (score <= 2) return { score, label: "Weak", color: "text-red-500" };
	if (score <= 4) return { score, label: "Medium", color: "text-yellow-500" };
	return { score, label: "Strong", color: "text-green-500" };
};
