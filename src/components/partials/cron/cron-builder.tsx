import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/copy-button";
import { Settings, Info } from "lucide-react";
import { generateCronExpression } from "@/lib/utils/cron-generator";
import ToolSection from "@/components/tool-section";

interface CronBuilderState {
	minute: string;
	hour: string;
	dayOfMonth: string;
	month: string;
	dayOfWeek: string;
	expression: string;
}

interface CronBuilderProps {
	state: CronBuilderState;
	updateState: (updates: Partial<CronBuilderState>) => void;
}

export function CronBuilder({ state, updateState }: CronBuilderProps) {
	const handleFieldChange = (field: keyof CronBuilderState, value: string) => {
		const newState = { ...state, [field]: value };
		updateState(newState);

		const expression = generateCronExpression(
			newState.minute || "*",
			newState.hour || "*",
			newState.dayOfMonth || "*",
			newState.month || "*",
			newState.dayOfWeek || "*",
		);
		updateState({ ...newState, expression: expression.expression });
	};

	const setPreset = (preset: string) => {
		const presets: Record<string, Partial<CronBuilderState>> = {
			"every-minute": { minute: "*", hour: "*", dayOfMonth: "*", month: "*", dayOfWeek: "*" },
			hourly: { minute: "0", hour: "*", dayOfMonth: "*", month: "*", dayOfWeek: "*" },
			daily: { minute: "0", hour: "0", dayOfMonth: "*", month: "*", dayOfWeek: "*" },
			weekly: { minute: "0", hour: "0", dayOfMonth: "*", month: "*", dayOfWeek: "0" },
			monthly: { minute: "0", hour: "0", dayOfMonth: "1", month: "*", dayOfWeek: "*" },
			weekdays: { minute: "0", hour: "9", dayOfMonth: "*", month: "*", dayOfWeek: "1-5" },
		};

		const presetValues = presets[preset];
		if (presetValues) {
			updateState(presetValues);
			const expression = generateCronExpression(
				presetValues.minute || "*",
				presetValues.hour || "*",
				presetValues.dayOfMonth || "*",
				presetValues.month || "*",
				presetValues.dayOfWeek || "*",
			);
			updateState({ ...presetValues, expression: expression.expression });
		}
	};

	return (
		<ToolSection
			icon={Settings}
			title="Cron Expression Builder"
			description="Build cron expressions using visual controls"
		>
			<div className="space-y-6">
				<div className="flex flex-wrap gap-2">
					<Button
						onClick={() => setPreset("every-minute")}
						variant="outline"
						size="sm"
						className="bg-transparent"
					>
						Every Minute
					</Button>
					<Button
						onClick={() => setPreset("hourly")}
						variant="outline"
						size="sm"
						className="bg-transparent"
					>
						Hourly
					</Button>
					<Button
						onClick={() => setPreset("daily")}
						variant="outline"
						size="sm"
						className="bg-transparent"
					>
						Daily
					</Button>
					<Button
						onClick={() => setPreset("weekly")}
						variant="outline"
						size="sm"
						className="bg-transparent"
					>
						Weekly
					</Button>
					<Button
						onClick={() => setPreset("monthly")}
						variant="outline"
						size="sm"
						className="bg-transparent"
					>
						Monthly
					</Button>
					<Button
						onClick={() => setPreset("weekdays")}
						variant="outline"
						size="sm"
						className="bg-transparent"
					>
						Weekdays
					</Button>
				</div>

				<div className="grid gap-4">
					<div className="grid gap-4 md:grid-cols-5">
						<div className="space-y-2">
							<Label htmlFor="minute">Minute (0-59)</Label>
							<Input
								id="minute"
								value={state.minute || "*"}
								onChange={(e) => handleFieldChange("minute", e.target.value)}
								placeholder="*"
								className="font-mono"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="hour">Hour (0-23)</Label>
							<Input
								id="hour"
								value={state.hour || "*"}
								onChange={(e) => handleFieldChange("hour", e.target.value)}
								placeholder="*"
								className="font-mono"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="dayOfMonth">Day of Month (1-31)</Label>
							<Input
								id="dayOfMonth"
								value={state.dayOfMonth || "*"}
								onChange={(e) => handleFieldChange("dayOfMonth", e.target.value)}
								placeholder="*"
								className="font-mono"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="month">Month (1-12)</Label>
							<Input
								id="month"
								value={state.month || "*"}
								onChange={(e) => handleFieldChange("month", e.target.value)}
								placeholder="*"
								className="font-mono"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="dayOfWeek">Day of Week (0-7)</Label>
							<Input
								id="dayOfWeek"
								value={state.dayOfWeek || "*"}
								onChange={(e) => handleFieldChange("dayOfWeek", e.target.value)}
								placeholder="*"
								className="font-mono"
							/>
						</div>
					</div>

					{state.expression && (
						<div className="bg-muted rounded-lg p-4">
							<div className="mb-2 flex items-center justify-between">
								<Label className="text-sm font-medium">Generated Expression</Label>
								<CopyButton text={state.expression} />
							</div>
							<div className="bg-background rounded border p-3 font-mono text-lg">
								{state.expression}
							</div>
						</div>
					)}
				</div>

				<div className="bg-muted rounded-lg p-4">
					<div className="mb-2 flex items-center gap-2">
						<Info className="h-4 w-4" />
						<span className="text-sm font-medium">Cron Format Guide</span>
					</div>
					<div className="text-muted-foreground space-y-1 text-xs">
						<div>
							<code>*</code> - Any value
						</div>
						<div>
							<code>*/n</code> - Every n units (e.g., */5 = every 5 minutes)
						</div>
						<div>
							<code>n-m</code> - Range from n to m (e.g., 1-5 = Monday to Friday)
						</div>
						<div>
							<code>n,m</code> - Specific values (e.g., 1,3,5 = Monday, Wednesday, Friday)
						</div>
						<div>
							<strong>Day of Week:</strong> 0=Sunday, 1=Monday, ..., 6=Saturday, 7=Sunday
						</div>
					</div>
				</div>
			</div>
		</ToolSection>
	);
}
