import { useToolState } from "@/lib/hooks/use-tool-state";
import { CurrentTimeDisplay } from "../partials/unix-timestamp/current-time-display";
import {
	TimestampConverter,
	type UnixTimestampConverterState,
} from "../partials/unix-timestamp/timestamp-converter";

export default function UnixTimestampConverterComponent() {
	const { state, updateState } = useToolState<UnixTimestampConverterState>({
		timestamp: "",
		dateInput: "",
		conversion: null,
		unixResult: null,
	});

	return (
		<div className="space-y-8">
			<CurrentTimeDisplay />
			<TimestampConverter state={state} updateState={updateState} />
		</div>
	);
}
