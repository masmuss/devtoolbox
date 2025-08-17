import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";

interface DateInputSectionProps {
	label: string;
	date: string | undefined;
	onDateChange: (date: Date | undefined) => void;
	onSetToday: () => void;
	error?: string;
	placeholder?: string;
}

export function DateInputSection({
	label,
	date,
	onDateChange,
	onSetToday,
	error,
	placeholder = "Select date",
}: DateInputSectionProps) {
	return (
		<div>
			<div className="mb-2 flex items-center justify-between">
				<Label>{label}</Label>
				<Button onClick={onSetToday} variant="outline" size="sm" className="bg-transparent text-xs">
					Today
				</Button>
			</div>
			<DatePicker
				date={date ? new Date(date) : undefined}
				onDateChange={onDateChange}
				placeholder={placeholder}
				className="font-mono"
			/>
			{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
		</div>
	);
}
