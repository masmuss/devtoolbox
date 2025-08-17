export interface TimezoneInfo {
	name: string;
	abbreviation: string;
	offset: string;
	utcOffset: number;
}

export interface ConvertedTime {
	timezone: string;
	time: string;
	date: string;
	iso: string;
	utcOffset: string;
}

export const COMMON_TIMEZONES: TimezoneInfo[] = [
	{ name: "UTC", abbreviation: "UTC", offset: "+00:00", utcOffset: 0 },
	{ name: "America/New_York", abbreviation: "EST/EDT", offset: "-05:00/-04:00", utcOffset: -5 },
	{ name: "America/Chicago", abbreviation: "CST/CDT", offset: "-06:00/-05:00", utcOffset: -6 },
	{ name: "America/Denver", abbreviation: "MST/MDT", offset: "-07:00/-06:00", utcOffset: -7 },
	{ name: "America/Los_Angeles", abbreviation: "PST/PDT", offset: "-08:00/-07:00", utcOffset: -8 },
	{ name: "Europe/London", abbreviation: "GMT/BST", offset: "+00:00/+01:00", utcOffset: 0 },
	{ name: "Europe/Paris", abbreviation: "CET/CEST", offset: "+01:00/+02:00", utcOffset: 1 },
	{ name: "Europe/Berlin", abbreviation: "CET/CEST", offset: "+01:00/+02:00", utcOffset: 1 },
	{ name: "Europe/Moscow", abbreviation: "MSK", offset: "+03:00", utcOffset: 3 },
	{ name: "Asia/Tokyo", abbreviation: "JST", offset: "+09:00", utcOffset: 9 },
	{ name: "Asia/Shanghai", abbreviation: "CST", offset: "+08:00", utcOffset: 8 },
	{ name: "Asia/Kolkata", abbreviation: "IST", offset: "+05:30", utcOffset: 5.5 },
	{ name: "Asia/Dubai", abbreviation: "GST", offset: "+04:00", utcOffset: 4 },
	{ name: "Australia/Sydney", abbreviation: "AEST/AEDT", offset: "+10:00/+11:00", utcOffset: 10 },
	{ name: "Pacific/Auckland", abbreviation: "NZST/NZDT", offset: "+12:00/+13:00", utcOffset: 12 },
];

export function convertTimezone(
	dateTime: string,
	fromTimezone: string,
	toTimezone: string,
): ConvertedTime | null {
	try {
		const date = new Date(dateTime);

		if (isNaN(date.getTime())) {
			return null;
		}

		// Create date in source timezone
		const sourceDate = new Date(date.toLocaleString("en-US", { timeZone: fromTimezone }));
		const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

		// Convert to target timezone
		const targetDate = new Date(utcDate.toLocaleString("en-US", { timeZone: toTimezone }));

		const formatter = new Intl.DateTimeFormat("en-US", {
			timeZone: toTimezone,
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false,
		});

		const parts = formatter.formatToParts(date);
		const formattedTime = `${parts.find((p) => p.type === "hour")?.value}:${parts.find((p) => p.type === "minute")?.value}:${parts.find((p) => p.type === "second")?.value}`;
		const formattedDate = `${parts.find((p) => p.type === "year")?.value}-${parts.find((p) => p.type === "month")?.value}-${parts.find((p) => p.type === "day")?.value}`;

		// Get UTC offset
		const offsetFormatter = new Intl.DateTimeFormat("en", {
			timeZone: toTimezone,
			timeZoneName: "longOffset",
		});
		const offsetParts = offsetFormatter.formatToParts(date);
		const utcOffset = offsetParts.find((p) => p.type === "timeZoneName")?.value || "+00:00";

		return {
			timezone: toTimezone,
			time: formattedTime,
			date: formattedDate,
			iso: new Date(date.toLocaleString("en-US", { timeZone: toTimezone })).toISOString(),
			utcOffset,
		};
	} catch (error) {
		return null;
	}
}

export function getCurrentTimeInTimezone(timezone: string): ConvertedTime | null {
	const now = new Date();
	return convertTimezone(now.toISOString(), "UTC", timezone);
}

export function getAllTimezoneConversions(
	dateTime: string,
	sourceTimezone: string,
): ConvertedTime[] {
	const conversions: ConvertedTime[] = [];

	for (const tz of COMMON_TIMEZONES) {
		const converted = convertTimezone(dateTime, sourceTimezone, tz.name);
		if (converted) {
			conversions.push(converted);
		}
	}

	return conversions;
}

export function validateDateTime(dateTime: string): { isValid: boolean; error?: string } {
	if (!dateTime.trim()) {
		return { isValid: false, error: "Date/time is required" };
	}

	const date = new Date(dateTime);
	if (isNaN(date.getTime())) {
		return { isValid: false, error: "Invalid date/time format" };
	}

	return { isValid: true };
}

export function getTimezoneInfo(timezone: string): TimezoneInfo | null {
	return COMMON_TIMEZONES.find((tz) => tz.name === timezone) || null;
}
