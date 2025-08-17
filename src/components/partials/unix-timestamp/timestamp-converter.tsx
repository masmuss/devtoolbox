import { HumanToUnix } from "./human-to-unix";
import { UnixToHuman } from "./unix-to-human";

export interface UnixTimestampConverterState {
	timestamp: string;
	dateInput: string;
	conversion: "toUnix" | "toDate" | null;
	unixResult: number | null;
}

interface TimestampConverterProps {
	state: UnixTimestampConverterState;
	updateState: (updates: Partial<UnixTimestampConverterState>) => void;
}

export function TimestampConverter({ state, updateState }: TimestampConverterProps) {
	return (
		<div className="space-y-6">
			<UnixToHuman state={state} updateState={updateState} />
			<HumanToUnix state={state} updateState={updateState} />
		</div>
	);
}
