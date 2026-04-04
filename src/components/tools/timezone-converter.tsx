import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Globe2 } from "lucide-react";
import { getAllTimezoneConversions, type ConvertedTime } from "@/lib/utils/timezone-converter";

export default function TimezoneConverter() {
	const [isMounted, setIsMounted] = useState(false);
	const [localTime, setLocalTime] = useState("");
	const [currentTime, setCurrentTime] = useState<Date | null>(null);
	const [systemTimezone, setSystemTimezone] = useState("");

	useEffect(() => {
		setIsMounted(true);

		const now = new Date();
		const offset = now.getTimezoneOffset();
		const adjustedTime = new Date(now.getTime() - offset * 60 * 1000);
		setLocalTime(adjustedTime.toISOString().slice(0, 16));

		setCurrentTime(new Date());
		setSystemTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);

		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const conversions: ConvertedTime[] = useMemo(() => {
		if (!localTime) return [];
		return getAllTimezoneConversions(localTime);
	}, [localTime]);

	if (!isMounted || !currentTime) {
		return null; // Don't render until client side hydration is complete
	}

	return (
		<div className="grid gap-6 md:grid-cols-12">
			{/* Controls */}
			<Card className="h-fit md:col-span-4 lg:col-span-4">
				<CardHeader>
					<CardTitle>Time Selection</CardTitle>
					<CardDescription>Pick a local date and time to convert</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-3">
						<Label htmlFor="datetime">Your Local Time ({systemTimezone})</Label>
						<Input
							id="datetime"
							type="datetime-local"
							value={localTime}
							onChange={(e) => setLocalTime(e.target.value)}
							className="w-full"
						/>
					</div>

					<div className="bg-muted/50 border-border rounded-lg border p-4">
						<div className="text-muted-foreground mb-2 flex items-center text-sm">
							<Clock className="mr-2 h-4 w-4" />
							Realtime System Clock
						</div>
						<div className="font-mono text-xl font-semibold">
							{currentTime.toLocaleTimeString()}
						</div>
						<div className="mt-1 text-sm">{currentTime.toLocaleDateString()}</div>
					</div>
				</CardContent>
			</Card>

			{/* Conversions Output */}
			<Card className="h-fit md:col-span-8 lg:col-span-8">
				<CardHeader>
					<div className="flex items-center gap-2 max-sm:justify-between">
						<Globe2 className="text-primary h-5 w-5" />
						<div>
							<CardTitle>Global Conversions</CardTitle>
							<CardDescription>Time in major cities and timezones</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
						{conversions.map((conv) => (
							<div
								key={conv.timezone}
								className="hover:bg-muted/50 flex flex-col justify-between rounded-lg border p-3 transition-colors"
							>
								<div className="mb-2 flex items-start justify-between">
									<span className="truncate pr-2 text-sm font-semibold" title={conv.timezone}>
										{conv.timezone.split("/").pop()?.replace("_", " ") || conv.timezone}
									</span>
									<span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs whitespace-nowrap">
										{conv.utcOffset}
									</span>
								</div>

								<div className="flex items-end justify-between">
									<span className="font-mono text-xl font-bold tracking-tight">{conv.time}</span>
									<span className="text-muted-foreground pl-2 text-sm whitespace-nowrap">
										{conv.date}
									</span>
								</div>
							</div>
						))}
					</div>
					{conversions.length === 0 && (
						<div className="text-muted-foreground rounded-lg border border-dashed py-12 text-center">
							Please enter a valid date and time to see conversions.
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
