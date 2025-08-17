export interface DateDifference {
	years: number;
	months: number;
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	totalDays: number;
	totalHours: number;
	totalMinutes: number;
	totalSeconds: number;
}

export interface DateCalculation {
	result: Date;
	formatted: string;
	iso: string;
	relative: string;
}

export function calculateDateDifference(startDate: Date, endDate: Date): DateDifference {
	const diffMs = Math.abs(endDate.getTime() - startDate.getTime());

	const totalSeconds = Math.floor(diffMs / 1000);
	const totalMinutes = Math.floor(totalSeconds / 60);
	const totalHours = Math.floor(totalMinutes / 60);
	const totalDays = Math.floor(totalHours / 24);

	const years = Math.floor(totalDays / 365.25);
	const months = Math.floor((totalDays % 365.25) / 30.44);
	const days = Math.floor((totalDays % 365.25) % 30.44);
	const hours = totalHours % 24;
	const minutes = totalMinutes % 60;
	const seconds = totalSeconds % 60;

	return {
		years,
		months,
		days,
		hours,
		minutes,
		seconds,
		totalDays,
		totalHours,
		totalMinutes,
		totalSeconds,
	};
}

export function addToDate(date: Date, amount: number, unit: string): DateCalculation {
	const result = new Date(date);

	switch (unit) {
		case "years":
			result.setFullYear(result.getFullYear() + amount);
			break;
		case "months":
			result.setMonth(result.getMonth() + amount);
			break;
		case "days":
			result.setDate(result.getDate() + amount);
			break;
		case "hours":
			result.setHours(result.getHours() + amount);
			break;
		case "minutes":
			result.setMinutes(result.getMinutes() + amount);
			break;
		case "seconds":
			result.setSeconds(result.getSeconds() + amount);
			break;
		default:
			throw new Error("Invalid unit");
	}

	return {
		result,
		formatted: result.toLocaleString(),
		iso: result.toISOString(),
		relative: getRelativeTime(result),
	};
}

export function subtractFromDate(date: Date, amount: number, unit: string): DateCalculation {
	return addToDate(date, -amount, unit);
}

export function getRelativeTime(date: Date): string {
	const now = new Date();
	const diffMs = date.getTime() - now.getTime();
	const diffSecs = Math.floor(Math.abs(diffMs) / 1000);
	const diffMins = Math.floor(diffSecs / 60);
	const diffHours = Math.floor(diffMins / 60);
	const diffDays = Math.floor(diffHours / 24);

	const isFuture = diffMs > 0;
	const prefix = isFuture ? "in " : "";
	const suffix = isFuture ? "" : " ago";

	if (diffSecs < 60) return `${prefix}${diffSecs} seconds${suffix}`;
	if (diffMins < 60) return `${prefix}${diffMins} minutes${suffix}`;
	if (diffHours < 24) return `${prefix}${diffHours} hours${suffix}`;
	if (diffDays < 30) return `${prefix}${diffDays} days${suffix}`;

	return date.toLocaleDateString();
}

export function validateDate(dateString: string): {
	isValid: boolean;
	date?: Date;
	error?: string;
} {
	if (!dateString.trim()) {
		return { isValid: false, error: "Date is required" };
	}

	const date = new Date(dateString);

	if (isNaN(date.getTime())) {
		return { isValid: false, error: "Invalid date format" };
	}

	return { isValid: true, date };
}

export function formatDuration(diff: DateDifference): string {
	const parts = [];

	if (diff.years > 0) parts.push(`${diff.years} year${diff.years !== 1 ? "s" : ""}`);
	if (diff.months > 0) parts.push(`${diff.months} month${diff.months !== 1 ? "s" : ""}`);
	if (diff.days > 0) parts.push(`${diff.days} day${diff.days !== 1 ? "s" : ""}`);
	if (diff.hours > 0) parts.push(`${diff.hours} hour${diff.hours !== 1 ? "s" : ""}`);
	if (diff.minutes > 0) parts.push(`${diff.minutes} minute${diff.minutes !== 1 ? "s" : ""}`);
	if (diff.seconds > 0) parts.push(`${diff.seconds} second${diff.seconds !== 1 ? "s" : ""}`);

	if (parts.length === 0) return "0 seconds";
	if (parts.length === 1) return parts[0];
	if (parts.length === 2) return parts.join(" and ");

	return parts.slice(0, -1).join(", ") + ", and " + parts[parts.length - 1];
}
