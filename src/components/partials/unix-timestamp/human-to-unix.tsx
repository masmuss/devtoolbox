import { Calendar } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import ToolSection from "@/components/tool-section";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { convertToUnix } from "@/lib/utils/unix-timestamp";

interface HumanToUnixProps {
	state: any;
	updateState: (updates: any) => void;
}

export function HumanToUnix({ state, updateState }: HumanToUnixProps) {
	const handleDateChange = (date: Date | undefined) => {
		if (!date) {
			updateState({ dateInput: "", unixResult: null });
			return;
		}

		const dateString = date.toISOString();
		updateState({ dateInput: dateString });

		try {
			const unix = convertToUnix(dateString);
			updateState({ unixResult: unix });
		} catch (err) {
			updateState({ unixResult: null });
		}
	};

	return (
		<ToolSection
			icon={Calendar}
			title="Human Readable to Unix"
			description="Convert date/time to Unix timestamp"
		>
			<div className="space-y-4">
				<div className="flex flex-col space-y-2">
					<Label htmlFor="dateInput">Date/Time Input</Label>
					<DatePicker
						date={state.dateInput ? new Date(state.dateInput) : undefined}
						onDateChange={handleDateChange}
						placeholder="Select a date"
						className="font-mono"
					/>
					<p className="text-muted-foreground mt-1 text-xs">
						Select a date using the calendar picker
					</p>
				</div>

				{state.unixResult && (
					<div className="bg-muted rounded-lg p-4">
						<div className="mb-2 flex items-center justify-between">
							<Label className="text-sm font-medium">Unix Timestamp</Label>
							<CopyButton text={state.unixResult.toString()} />
						</div>
						<Input value={state.unixResult} className="bg-background font-mono" />
					</div>
				)}
			</div>
		</ToolSection>
	);
}
