import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DateInputSection } from "./date-input-section";
import { CalculationResult } from "./calculation-result";
import { DifferenceBreakdown } from "./difference-breakdown";
import { Calendar, ArrowRight } from "lucide-react";
import { calculateDateDifference, validateDate, formatDuration } from "@/lib/utils/date-calculator";
import ToolSection from "@/components/tool-section";

interface DateDifferenceProps {
	state: any;
	updateState: (updates: any) => void;
}

export function DateDifference({ state, updateState }: DateDifferenceProps) {
	const [errors, setErrors] = useState<{ startDate?: string; endDate?: string }>({});

	const handleCalculate = () => {
		const startValidation = validateDate(state.startDate || "");
		const endValidation = validateDate(state.endDate || "");

		const newErrors: { startDate?: string; endDate?: string } = {};

		if (!startValidation.isValid) {
			newErrors.startDate = startValidation.error;
		}
		if (!endValidation.isValid) {
			newErrors.endDate = endValidation.error;
		}

		setErrors(newErrors);

		if (
			startValidation.isValid &&
			endValidation.isValid &&
			startValidation.date &&
			endValidation.date
		) {
			const difference = calculateDateDifference(startValidation.date, endValidation.date);
			updateState({ difference });
		} else {
			updateState({ difference: null });
		}
	};

	const setToday = (field: "startDate" | "endDate") => {
		const today = new Date();
		updateState({ [field]: today.toISOString() });
	};

	const handleStartDateChange = (date: Date | undefined) => {
		updateState({ startDate: date?.toISOString() || "" });
	};

	const handleEndDateChange = (date: Date | undefined) => {
		updateState({ endDate: date?.toISOString() || "" });
	};

	return (
		<ToolSection
			icon={Calendar}
			title="Date Difference Calculator"
			description="Calculate the difference between two dates"
		>
			<div className="space-y-4">
				<div className="grid gap-4 md:grid-cols-2">
					<DateInputSection
						label="Start Date"
						date={state.startDate}
						onDateChange={handleStartDateChange}
						onSetToday={() => setToday("startDate")}
						error={errors.startDate}
						placeholder="Select start date"
					/>

					<DateInputSection
						label="End Date"
						date={state.endDate}
						onDateChange={handleEndDateChange}
						onSetToday={() => setToday("endDate")}
						error={errors.endDate}
						placeholder="Select end date"
					/>
				</div>

				<Button onClick={handleCalculate} className="w-full">
					<ArrowRight className="mr-2 h-4 w-4" />
					Calculate Difference
				</Button>

				{state.difference && (
					<div className="bg-muted space-y-4 rounded-lg p-4">
						<CalculationResult
							title="Duration"
							value={formatDuration(state.difference)}
							copyValue={formatDuration(state.difference)}
						/>

						<DifferenceBreakdown difference={state.difference} />
					</div>
				)}
			</div>
		</ToolSection>
	);
}
