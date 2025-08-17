import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConversionResult } from "./conversion-result";
import { Clock, RefreshCw } from "lucide-react";
import {
	convertUnixTimestamp,
	getCurrentTimestamp,
	validateTimestamp,
} from "@/lib/utils/unix-timestamp";
import ToolSection from "@/components/tool-section";

interface UnixToHumanProps {
	state: any;
	updateState: (updates: any) => void;
}

export function UnixToHuman({ state, updateState }: UnixToHumanProps) {
	const [error, setError] = useState<string>("");

	const handleTimestampChange = (value: string) => {
		updateState({ timestamp: value });

		if (!value.trim()) {
			updateState({ conversion: null });
			setError("");
			return;
		}

		const validation = validateTimestamp(value);
		if (!validation.isValid) {
			setError(validation.error || "Invalid timestamp");
			updateState({ conversion: null });
			return;
		}

		setError("");
		const conversion = convertUnixTimestamp(Number.parseInt(value));
		updateState({ conversion });
	};

	const setCurrentTimestamp = () => {
		const current = getCurrentTimestamp();
		updateState({
			timestamp: current.seconds.toString(),
			conversion: convertUnixTimestamp(current.seconds),
		});
		setError("");
	};

	return (
		<ToolSection
			icon={Clock}
			title="Unix to Human Readable"
			description="Convert Unix timestamp to human-readable formats"
		>
			<div className="space-y-4">
				<div className="flex items-end gap-2">
					<div className="flex-1 space-y-2">
						<Label htmlFor="timestamp">Unix Timestamp</Label>
						<Input
							id="timestamp"
							value={state.timestamp || ""}
							onChange={(e) => handleTimestampChange(e.target.value)}
							placeholder="1640995200"
							className="font-mono"
						/>
						{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
					</div>
					<Button
						onClick={setCurrentTimestamp}
						variant="outline"
						size="icon"
						className="mt-6 bg-transparent"
						title="Use current timestamp"
					>
						<RefreshCw className="h-4 w-4" />
					</Button>
				</div>

				{state.conversion && (
					<div className="bg-muted space-y-3 rounded-lg p-4">
						<ConversionResult label="ISO 8601" value={state.conversion.iso} className="font-mono" />
						<ConversionResult label="UTC" value={state.conversion.utc} className="font-mono" />
						<ConversionResult
							label="Local Time"
							value={state.conversion.local}
							className="font-mono"
						/>
						<ConversionResult label="Relative" value={state.conversion.relative} />
					</div>
				)}
			</div>
		</ToolSection>
	);
}
