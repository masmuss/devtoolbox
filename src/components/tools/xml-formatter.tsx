import { useToolState } from "@/lib/hooks/use-tool-state";
import { formatXml, minifyXml } from "@/lib/utils/xml-formatter";
import { XmlEditor } from "../partials/xml/xml-editor";
import { XmlStats } from "../partials/xml/xml-stats";
import { XmlExamples } from "../partials/xml/xml-examples";

interface XmlFormatterState {
	input: string;
	formatted: string;
	minified: string;
	isValid: boolean;
	error?: string;
	stats: any;
}

export default function XmlFormatterComponent() {
	const { state, updateState, clearState } = useToolState<XmlFormatterState>({
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
			elements: 0,
			attributes: 0,
			depth: 0,
			textNodes: 0,
		},
	});

	const handleFormat = (indent: number) => {
		if (!state.input.trim()) return;

		const result = formatXml(state.input, indent);
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

		const result = minifyXml(state.input);
		updateState({
			minified: result.minified,
			formatted: "",
			isValid: result.isValid,
			error: result.error,
			stats: result.stats,
		});
	};

	const handleLoadExample = (xml: string) => {
		updateState({
			input: xml,
			formatted: "",
			minified: "",
			isValid: false,
			error: undefined,
		});
	};

	return (
		<div className="grid gap-8 lg:grid-cols-3">
			<div className="lg:col-span-2">
				<XmlEditor
					input={state.input}
					onInputChange={(input) => updateState({ input })}
					onFormat={handleFormat}
					onMinify={handleMinify}
					onClear={clearState}
					formatted={state.formatted}
					minified={state.minified}
					isValid={state.isValid}
					error={state.error}
				/>
			</div>

			<div className="space-y-6">
				<XmlStats stats={state.stats} isValid={state.isValid} />
				<XmlExamples onLoadExample={handleLoadExample} />
			</div>
		</div>
	);
}
