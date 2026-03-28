import { useMemo } from "react";
import { useToolState } from "@/lib/hooks/use-tool-state";
import { analyzeText } from "@/lib/utils/word-counter";
import { StatsDisplay } from "../partials/word-counter/stats-display";
import { TextInput } from "../partials/word-counter/text-input";

export default function WordCounterComponent() {
	const { state, updateState } = useToolState({
		text: "",
	});

	const stats = useMemo(() => analyzeText(state.text), [state.text]);

	return (
		<div className="space-y-6">
			<TextInput text={state.text} onTextChange={(text) => updateState({ text })} />

			{state.text.trim() && <StatsDisplay stats={stats} />}
		</div>
	);
}
