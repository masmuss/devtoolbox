import cronstrue from "cronstrue";
import { CronExpressionParser } from "cron-parser";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

export interface CronExpression {
	minute: string;
	hour: string;
	dayOfMonth: string;
	month: string;
	dayOfWeek: string;
	expression: string;
}

export interface CronPreset {
	name: string;
	description: string;
	expression: string;
	category?: "basic" | "advanced" | "common";
}

export const CRON_PRESETS: CronPreset[] = [
	{
		name: "Every minute",
		description: "Runs every minute",
		expression: "* * * * *",
		category: "basic",
	},
	{
		name: "Every 5 minutes",
		description: "Runs every 5 minutes",
		expression: "*/5 * * * *",
		category: "basic",
	},
	{
		name: "Every 15 minutes",
		description: "Runs every 15 minutes",
		expression: "*/15 * * * *",
		category: "basic",
	},
	{
		name: "Every 30 minutes",
		description: "Runs every 30 minutes",
		expression: "*/30 * * * *",
		category: "basic",
	},
	{
		name: "Every hour",
		description: "Runs at the start of every hour",
		expression: "0 * * * *",
		category: "basic",
	},

	// Common schedules
	{
		name: "Daily at midnight",
		description: "Runs once a day at midnight",
		expression: "0 0 * * *",
		category: "common",
	},
	{
		name: "Daily at 9 AM",
		description: "Runs once a day at 9 AM",
		expression: "0 9 * * *",
		category: "common",
	},
	{
		name: "Weekdays at 9 AM",
		description: "Runs Monday to Friday at 9 AM",
		expression: "0 9 * * 1-5",
		category: "common",
	},
	{
		name: "Weekly on Sunday",
		description: "Runs every Sunday at midnight",
		expression: "0 0 * * 0",
		category: "common",
	},
	{
		name: "Monthly on 1st",
		description: "Runs on the 1st of every month",
		expression: "0 0 1 * *",
		category: "common",
	},

	// Advanced schedules
	{
		name: "Business hours",
		description: "Every hour from 9 AM to 5 PM, weekdays",
		expression: "0 9-17 * * 1-5",
		category: "advanced",
	},
	{
		name: "Weekends at 10 AM",
		description: "Runs Saturday and Sunday at 10 AM",
		expression: "0 10 * * 6,0",
		category: "advanced",
	},
	{
		name: "Every 2 hours",
		description: "Runs every 2 hours",
		expression: "0 */2 * * *",
		category: "advanced",
	},
	{
		name: "Quarterly",
		description: "Every 3 months on the 1st at midnight",
		expression: "0 0 1 */3 *",
		category: "advanced",
	},
];

export function generateCronExpression(
	minute: string,
	hour: string,
	dayOfMonth: string,
	month: string,
	dayOfWeek: string,
): CronExpression {
	const expression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

	return {
		minute,
		hour,
		dayOfMonth,
		month,
		dayOfWeek,
		expression,
	};
}

export function parseCronExpression(expression: string): CronExpression | null {
	try {
		const parts = expression.trim().split(/\s+/);

		if (parts.length !== 5) {
			return null;
		}

		const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

		return {
			minute,
			hour,
			dayOfMonth,
			month,
			dayOfWeek,
			expression,
		};
	} catch (error) {
		return null;
	}
}

export function describeCronExpression(expression: string): string {
	try {
		return cronstrue.toString(expression, {
			throwExceptionOnParseError: false,
			verbose: false,
			dayOfWeekStartIndexZero: true,
			use24HourTimeFormat: false,
		});
	} catch (error) {
		return "Invalid cron expression";
	}
}

export function validateCronExpression(expression: string): {
	isValid: boolean;
	error?: string;
} {
	try {
		CronExpressionParser.parse(expression);
		return { isValid: true };
	} catch (error) {
		return {
			isValid: false,
			error: error instanceof Error ? error.message : "Invalid cron expression",
		};
	}
}

export function getNextExecutionTimes(expression: string, count = 5, timezone = "UTC"): Date[] {
	try {
		const options = {
			currentDate: new Date(),
			tz: timezone,
		};

		const interval = CronExpressionParser.parse(expression, options);
		const times: Date[] = [];

		for (let i = 0; i < count; i++) {
			const next = interval.next();
			times.push(next.toDate());
		}

		return times;
	} catch (error) {
		console.error("Error calculating next execution times:", error);
		return [];
	}
}

export function getPreviousExecutionTimes(expression: string, count = 5, timezone = "UTC"): Date[] {
	try {
		const options = {
			currentDate: new Date(),
			tz: timezone,
		};

		const interval = CronExpressionParser.parse(expression, options);
		const times: Date[] = [];

		for (let i = 0; i < count; i++) {
			const prev = interval.prev();
			times.push(prev.toDate());
		}

		return times.reverse(); // Return in chronological order
	} catch (error) {
		console.error("Error calculating previous execution times:", error);
		return [];
	}
}

export function willRunAt(expression: string, date: Date): boolean {
	try {
		const nextTimes = getNextExecutionTimes(expression, 100);
		return nextTimes.some(
			(time) => Math.abs(time.getTime() - date.getTime()) < 60000, // Within 1 minute
		);
	} catch (error) {
		return false;
	}
}

export function getFrequencyAnalysis(expression: string): {
	type: "minute" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "complex";
	frequency: string;
	estimatedRuns: {
		perDay: number;
		perWeek: number;
		perMonth: number;
		perYear: number;
	};
} {
	const invalidResult = {
		type: "complex" as const,
		frequency: "Invalid or complex schedule",
		estimatedRuns: { perDay: 0, perWeek: 0, perMonth: 0, perYear: 0 },
	};

	try {
		const startDate = new Date();
		const endDate = new Date(startDate.getTime());
		endDate.setFullYear(startDate.getFullYear() + 1); // Simulate for one year

		const interval = CronExpressionParser.parse(expression, {
			currentDate: startDate,
			endDate: endDate,
			tz: "UTC",
		});

		let count = 0;
		while (true) {
			try {
				if (interval.next()) {
					break;
				}
				count++;
			} catch (e) {
				break;
			}
		}

		if (count === 0 && validateCronExpression(expression).isValid) {
			// It might be a valid cron that doesn't run in the next year.
			// Let's try to get just one next run to see if it's valid at all.
			const nextRun = getNextExecutionTimes(expression, 1);
			if (nextRun.length > 0) count = 1; // It runs, but very infrequently.
		}

		const runsPerYear = count;
		const runsPerMonth = parseFloat((runsPerYear / 12).toFixed(2));
		const runsPerWeek = parseFloat((runsPerYear / 52.1775).toFixed(2)); // More precise number of weeks in a year
		const runsPerDay = parseFloat((runsPerYear / 365.25).toFixed(2)); // Account for leap years

		let type: "minute" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "complex" =
			"complex";
		let frequency = "Complex schedule";

		if (runsPerDay > 24) {
			type = "minute";
			frequency = `Runs approximately ${Math.round(runsPerDay)} times a day`;
		} else if (runsPerDay > 1) {
			type = "hourly";
			frequency = `Runs approximately ${Math.round(runsPerDay)} times a day`;
		} else if (runsPerWeek > 1) {
			type = "daily";
			frequency = `Runs approximately ${Math.round(runsPerWeek)} times a week`;
		} else if (runsPerMonth > 1) {
			type = "weekly";
			frequency = `Runs approximately ${Math.round(runsPerMonth)} times a month`;
		} else if (runsPerYear > 1) {
			type = "monthly";
			frequency = `Runs approximately ${runsPerYear} times a year`;
		} else if (runsPerYear === 1) {
			type = "yearly";
			frequency = "Runs once a year";
		}

		return {
			type,
			frequency,
			estimatedRuns: {
				perDay: runsPerDay,
				perWeek: runsPerWeek,
				perMonth: runsPerMonth,
				perYear: runsPerYear,
			},
		};
	} catch (error) {
		return invalidResult;
	}
}

export function convertTimezone(expression: string, fromTz: string, toTz: string): string {
	const parsed = parseCronExpression(expression);
	if (!parsed) {
		return expression;
	}

	const { minute, hour, dayOfMonth, month, dayOfWeek } = parsed;

	if (isNaN(parseInt(hour)) || isNaN(parseInt(minute))) {
		try {
			const nextRunInFromTz = getNextExecutionTimes(expression, 1, fromTz)[0];
			if (!nextRunInFromTz) return expression;

			const nextRunInToTz = fromZonedTime(nextRunInFromTz, toTz);

			const newMinute = nextRunInToTz.getMinutes();
			const newHour = nextRunInToTz.getHours();

			return `${newMinute} ${newHour} ${dayOfMonth} ${month} ${dayOfWeek}`;
		} catch (error) {
			return expression;
		}
	}

	try {
		const now = new Date();
		const dateInFromTz = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate(),
			parseInt(hour),
			parseInt(minute),
		);

		const utcTime = fromZonedTime(dateInFromTz, fromTz);

		const dateInToTz = toZonedTime(utcTime, toTz);

		const newMinutePart = dateInToTz.getMinutes();
		const newHourPart = dateInToTz.getHours();

		if (dateInToTz.getDate() !== dateInFromTz.getDate()) {
			console.warn(
				`Timezone conversion for "${expression}" from ${fromTz} to ${toTz} crossed midnight. Day/month/weekday fields were not adjusted.`,
			);
		}

		return `${newMinutePart} ${newHourPart} ${dayOfMonth} ${month} ${dayOfWeek}`;
	} catch (error) {
		console.error("Error converting timezone:", error);
		return expression; // Return original expression on failure
	}
}

export default {
	generateCronExpression,
	parseCronExpression,
	describeCronExpression,
	validateCronExpression,
	getNextExecutionTimes,
	getPreviousExecutionTimes,
	willRunAt,
	getFrequencyAnalysis,
	convertTimezone,
	CRON_PRESETS,
};
