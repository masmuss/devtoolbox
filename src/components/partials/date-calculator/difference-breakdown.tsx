interface DifferenceBreakdownProps {
	difference: {
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
	};
}

export function DifferenceBreakdown({ difference }: DifferenceBreakdownProps) {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<div className="space-y-3">
				<h4 className="text-sm font-medium">Breakdown</h4>
				<div className="space-y-2 text-sm">
					<div className="flex justify-between">
						<span>Years:</span>
						<span className="font-mono">{difference.years}</span>
					</div>
					<div className="flex justify-between">
						<span>Months:</span>
						<span className="font-mono">{difference.months}</span>
					</div>
					<div className="flex justify-between">
						<span>Days:</span>
						<span className="font-mono">{difference.days}</span>
					</div>
					<div className="flex justify-between">
						<span>Hours:</span>
						<span className="font-mono">{difference.hours}</span>
					</div>
					<div className="flex justify-between">
						<span>Minutes:</span>
						<span className="font-mono">{difference.minutes}</span>
					</div>
					<div className="flex justify-between">
						<span>Seconds:</span>
						<span className="font-mono">{difference.seconds}</span>
					</div>
				</div>
			</div>

			<div className="space-y-3">
				<h4 className="text-sm font-medium">Totals</h4>
				<div className="space-y-2 text-sm">
					<div className="flex justify-between">
						<span>Total Days:</span>
						<span className="font-mono">{difference.totalDays.toLocaleString()}</span>
					</div>
					<div className="flex justify-between">
						<span>Total Hours:</span>
						<span className="font-mono">{difference.totalHours.toLocaleString()}</span>
					</div>
					<div className="flex justify-between">
						<span>Total Minutes:</span>
						<span className="font-mono">{difference.totalMinutes.toLocaleString()}</span>
					</div>
					<div className="flex justify-between">
						<span>Total Seconds:</span>
						<span className="font-mono">{difference.totalSeconds.toLocaleString()}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
