import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Calendar } from "lucide-react";
import {
	validateCronExpression,
	describeCronExpression,
	getNextExecutionTimes,
} from "@/lib/utils/cron-generator";
import ToolSection from "@/components/tool-section";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CronExpressionState {
	minute: string;
	hour: string;
	dayOfMonth: string;
	month: string;
	dayOfWeek: string;
	expression: string;
	testExpression: string;
}

interface CronValidatorProps {
	state: CronExpressionState;
	updateState: (updates: Partial<CronExpressionState>) => void;
}

export function CronValidator({ state, updateState }: CronValidatorProps) {
	const [validation, setValidation] = useState<{ isValid: boolean; error?: string } | null>(null);
	const [description, setDescription] = useState<string>("");
	const [nextRuns, setNextRuns] = useState<Date[]>([]);

	const handleValidate = () => {
		if (!state.testExpression?.trim()) {
			setValidation({ isValid: false, error: "Please enter a cron expression" });
			setDescription("");
			setNextRuns([]);
			return;
		}

		const result = validateCronExpression(state.testExpression);
		setValidation(result);

		if (result.isValid) {
			setDescription(describeCronExpression(state.testExpression));
			setNextRuns(getNextExecutionTimes(state.testExpression));
		} else {
			setDescription("");
			setNextRuns([]);
		}
	};

	return (
		<ToolSection
			icon={Calendar}
			title="Cron Expression Validator"
			description="Validate and analyze cron expressions"
		>
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="testExpression">Cron Expression</Label>
					<div className="flex gap-2">
						<Input
							id="testExpression"
							value={state.testExpression || ""}
							onChange={(e) => updateState({ testExpression: e.target.value })}
							placeholder="0 9 * * 1-5"
							className="font-mono"
						/>
						<Button onClick={handleValidate}>Validate</Button>
					</div>
				</div>

				{validation && (
					<Alert variant={validation.isValid ? "default" : "destructive"}>
						{validation.isValid ? (
							<CheckCircle className="h-5 w-5 text-green-600" />
						) : (
							<XCircle className="h-5 w-5 text-red-600" />
						)}
						<AlertTitle>
							{validation.isValid ? "Valid Expression" : "Invalid Expression"}
						</AlertTitle>
						<AlertDescription>{validation.error && `${validation.error}`}</AlertDescription>
					</Alert>
				)}

				{description && (
					<div className="bg-muted rounded-lg p-4">
						<h4 className="mb-2 text-sm font-medium">Description</h4>
						<p className="text-sm">{description}</p>
					</div>
				)}

				{nextRuns.length > 0 && (
					<div className="bg-muted rounded-lg p-4">
						<h4 className="mb-3 text-sm font-medium">Next 5 Execution Times</h4>
						<div className="space-y-2">
							{nextRuns.map((time, index) => (
								<div key={index} className="flex items-center justify-between text-sm">
									<span>{time.toLocaleString()}</span>
									<span className="text-muted-foreground font-mono">{time.toISOString()}</span>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</ToolSection>
	);
}
