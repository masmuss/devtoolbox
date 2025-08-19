import { useToolState } from "@/lib/hooks/use-tool-state";
import { parseCronExpression } from "@/lib/utils/cron-generator";
import { CronBuilder } from "../partials/cron/cron-builder";
import { CronPresets } from "../partials/cron/cron-presets";
import { CronValidator } from "../partials/cron/cron-validator";

interface CronExpressionState {
	minute: string;
	hour: string;
	dayOfMonth: string;
	month: string;
	dayOfWeek: string;
	expression: string;
	testExpression: string;
}

export default function CronExpressionGeneratorComponent() {
	const { state, updateState } = useToolState<CronExpressionState>({
		minute: "*",
		hour: "*",
		dayOfMonth: "*",
		month: "*",
		dayOfWeek: "*",
		expression: "* * * * *",
		testExpression: "",
	});

	const handlePresetSelect = (expression: string) => {
		const parsed = parseCronExpression(expression);
		if (parsed) {
			updateState({
				minute: parsed.minute,
				hour: parsed.hour,
				dayOfMonth: parsed.dayOfMonth,
				month: parsed.month,
				dayOfWeek: parsed.dayOfWeek,
				expression: parsed.expression,
			});
		}
	};

	return (
		<div className="space-y-8">
			<CronBuilder state={state} updateState={updateState} />
			<CronPresets onSelectPreset={handlePresetSelect} />
			<CronValidator state={state} updateState={updateState} />
		</div>
	);
}
