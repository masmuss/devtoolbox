import { useToolState } from "@/lib/hooks/use-tool-state";
import { DateDifference } from "../partials/date-calculator/date-difference";
import { DateArithmetic } from "../partials/date-calculator/date-arithmetic";
import type { DateCalculatorState } from "../partials/date-calculator/type";

export default function DateCalculatorComponent() {
	const { state, updateState } = useToolState<DateCalculatorState>({
		// Date difference
		startDate: "",
		endDate: "",
		difference: null,

		// Date arithmetic
		baseDate: "",
		amount: "",
		unit: "",
		result: null,
	});

	return (
		<div className="space-y-8">
			<DateDifference state={state} updateState={updateState} />
			<DateArithmetic state={state} updateState={updateState} />
		</div>
	);
}
