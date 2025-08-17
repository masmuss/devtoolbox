import { useToolState } from "@/lib/hooks/use-tool-state";
import { formatJson, minifyJson } from "@/lib/utils/json-formatter";
import { JsonEditor } from "../partials/json/json-editor";
import { JsonStats } from "../partials/json/json-stats";
import { JsonExamples } from "../partials/json/json-examples";

interface JsonFormatterState {
	input: string;
	formatted: string;
	minified: string;
	isValid: boolean;
	error?: string;
	stats: any;
}

export default function JsonFormatterComponent() {
	const { state, updateState, clearState } = useToolState<JsonFormatterState>({
		input: "",
		formatted: "",
		minified: "",
		isValid: false,
		error: undefined,
		stats: {
			originalSize: 0,
			formattedSize: 0,
			minifiedSize: 0,
			compressionRatio: 0,
			depth: 0,
			keys: 0,
			values: 0,
		},
	});

	const handleFormat = (indent: number) => {
		if (!state.input.trim()) return;

		const result = formatJson(state.input, indent);
		updateState({
			formatted: result.formatted,
			minified: "",
			isValid: result.isValid,
			error: result.error,
			stats: result.stats,
		});
	};

	const handleMinify = () => {
		if (!state.input.trim()) return;

		const result = minifyJson(state.input);
		updateState({
			minified: result.minified,
			formatted: "",
			isValid: result.isValid,
			error: result.error,
			stats: result.stats,
		});
	};

	const handleLoadExample = (json: string) => {
		updateState({
			input: json,
			formatted: "",
			minified: "",
			isValid: false,
			error: undefined,
		});
	};

	return (
		<div className="grid gap-8 lg:grid-cols-3">
			<div className="lg:col-span-2">
				<JsonEditor
					input={state.input}
					onInputChange={(input) => updateState({ input })}
					onFormat={handleFormat}
					onMinify={handleMinify}
					onClear={clearState}
					formatted={state.formatted}
					minified={state.minified}
					error={state.error}
				/>
			</div>

			<div className="space-y-6">
				<JsonStats stats={state.stats} isValid={state.isValid} />
				<JsonExamples onLoadExample={handleLoadExample} />
			</div>
		</div>
	);
}
