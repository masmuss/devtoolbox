export interface TimestampConversion {
	unix: number;
	iso: string;
	utc: string;
	local: string;
	relative: string;
}

export interface TimestampFormats {
	seconds: number;
	milliseconds: number;
	iso8601: string;
	rfc2822: string;
	human: string;
}

export function convertUnixTimestamp(timestamp: number): TimestampConversion {
	const date = new Date(timestamp * 1000);

	return {
		unix: timestamp,
		iso: date.toISOString(),
		utc: date.toUTCString(),
		local: date.toLocaleString(),
		relative: getRelativeTime(date),
	};
}

export function convertToUnix(dateString: string): number {
	const date = new Date(dateString);
	return Math.floor(date.getTime() / 1000);
}

export function getCurrentTimestamp(): TimestampFormats {
	const now = new Date();
	const unix = Math.floor(now.getTime() / 1000);

	return {
		seconds: unix,
		milliseconds: now.getTime(),
		iso8601: now.toISOString(),
		rfc2822: now.toUTCString(),
		human: now.toLocaleString(),
	};
}

export function getRelativeTime(date: Date): string {
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffSecs = Math.floor(diffMs / 1000);
	const diffMins = Math.floor(diffSecs / 60);
	const diffHours = Math.floor(diffMins / 60);
	const diffDays = Math.floor(diffHours / 24);

	if (diffSecs < 60) return `${diffSecs} seconds ago`;
	if (diffMins < 60) return `${diffMins} minutes ago`;
	if (diffHours < 24) return `${diffHours} hours ago`;
	if (diffDays < 30) return `${diffDays} days ago`;

	return date.toLocaleDateString();
}

export function validateTimestamp(value: string): { isValid: boolean; error?: string } {
	const num = Number.parseInt(value);

	if (isNaN(num)) {
		return { isValid: false, error: "Invalid number format" };
	}

	// Check if timestamp is in reasonable range (1970-2100)
	if (num < 0 || num > 4102444800) {
		return { isValid: false, error: "Timestamp out of valid range" };
	}

	return { isValid: true };
}
