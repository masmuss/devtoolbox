import { useToolState } from "@/lib/hooks/use-tool-state";
import {
	type CaseResults as CaseResultsType,
	convertTextToAllCases,
	getEmptyResults,
} from "@/lib/utils/text-case-converter";
import { CaseInput } from "../partials/text-case/case-input";
import { CaseResults } from "../partials/text-case/case-result";
import { QuickExamples } from "../partials/text-case/quick-examples";

interface TextCaseState {
	inputText: string;
	results: CaseResultsType;
}

export default function TextCaseConverterComponent() {
	const { state, updateState, clearState } = useToolState<TextCaseState>({
		inputText: "",
		results: getEmptyResults(),
	});

	const convertText = (text: string) => {
		const results = convertTextToAllCases(text);
		updateState({ results });
	};

	const handleInputChange = (text: string) => {
		updateState({ inputText: text });
		convertText(text);
	};

	const handleExampleClick = (example: string) => {
		updateState({ inputText: example });
		convertText(example);
	};

	return (
		<div className="grid gap-6 lg:grid-cols-3">
			{/* Input Section */}
			<div className="space-y-6 lg:col-span-1">
				<CaseInput
					inputText={state.inputText}
					onInputChange={handleInputChange}
					onClear={clearState}
					onConvert={() => convertText(state.inputText)}
				/>
				<QuickExamples onExampleClick={handleExampleClick} />
			</div>

			{/* Results Section */}
			<div className="lg:col-span-2">
				<CaseResults results={state.results as unknown as Record<string, string>} />
			</div>
		</div>
	);
}
