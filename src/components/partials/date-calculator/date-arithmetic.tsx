import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalculationResult } from "./calculation-result";
import { Plus, Minus } from "lucide-react";
import { addToDate, subtractFromDate, validateDate } from "@/lib/utils/date-calculator";
import ToolSection from "@/components/tool-section";
import { DateInputSection } from "./date-input-section";
import { UnitSelector } from "./unit-selector";

interface DateArithmeticProps {
	state: any;
	updateState: (updates: any) => void;
}

export function DateArithmetic({ state, updateState }: DateArithmeticProps) {
	const [error, setError] = useState<string>("");

	const handleCalculate = (operation: "add" | "subtract") => {
		const dateValidation = validateDate(state.baseDate || "");
		const amount = Number.parseInt(state.amount || "0");

		if (!dateValidation.isValid) {
			setError(dateValidation.error || "Invalid date");
			updateState({ result: null });
			return;
		}

		if (isNaN(amount)) {
			setError("Invalid amount");
			updateState({ result: null });
			return;
		}

		if (!state.unit) {
			setError("Please select a unit");
			updateState({ result: null });
			return;
		}

		setError("");

		try {
			const result =
				operation === "add"
					? addToDate(dateValidation.date!, amount, state.unit)
					: subtractFromDate(dateValidation.date!, amount, state.unit);

			updateState({ result });
		} catch (err) {
			setError("Calculation error");
			updateState({ result: null });
		}
	};

	const setToday = () => {
		const today = new Date().toISOString().slice(0, 16);
		updateState({ baseDate: today });
	};

	const handleDateChange = (date: Date | undefined) => {
		updateState({ baseDate: date?.toISOString().slice(0, 16) || "" });
	};

	return (
		<ToolSection icon={Plus} title="Date Arithmetic" description="Add or subtract time from a date">
			<div className="space-y-4">
				<DateInputSection
					label="Base Date"
					date={state.baseDate}
					onDateChange={handleDateChange}
					onSetToday={setToday}
					placeholder="Select base date"
				/>

				<UnitSelector
					amount={state.amount || ""}
					unit={state.unit || ""}
					onAmountChange={(amount) => updateState({ amount })}
					onUnitChange={(unit) => updateState({ unit })}
				/>

				<div className="flex gap-2">
					<Button onClick={() => handleCalculate("add")} className="flex-1" variant="default">
						<Plus className="mr-1 h-4 w-4" />
						Add
					</Button>
					<Button onClick={() => handleCalculate("subtract")} className="flex-1" variant="outline">
						<Minus className="mr-1 h-4 w-4" />
						Subtract
					</Button>
				</div>

				{error && <p className="text-sm text-red-600">{error}</p>}

				{state.result && (
					<div className="bg-muted space-y-4 rounded-lg p-4">
						<CalculationResult
							title="Result"
							value={state.result.formatted}
							copyValue={state.result.formatted}
						/>

						<CalculationResult
							title="ISO 8601"
							value={state.result.iso}
							copyValue={state.result.iso}
							className="font-mono"
						/>

						<CalculationResult
							title="Relative"
							value={state.result.relative}
							copyValue={state.result.relative}
						/>
					</div>
				)}
			</div>
		</ToolSection>
	);
}
