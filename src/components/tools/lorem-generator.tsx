import { TextConfiguration, type PresetType } from "@/components/partials/lorem/text-configuration";
import { TextOutput } from "@/components/partials/lorem/text-output";
import { QuickPresets } from "@/components/partials/lorem/quick-presets";
import { LoremInfo } from "@/components/partials/lorem/lorem-info";
import { generateLoremText } from "@/lib/utils/lorem-generator";
import { useToolState } from "@/lib/hooks/use-tool-state";

interface LoremGeneratorComponentState {
	type: PresetType;
	count: string;
	startWithLorem: boolean;
	generatedText: string;
}

export default function LoremGeneratorComponent() {
	const { state, updateState, clearState } = useToolState<LoremGeneratorComponentState>({
		type: "paragraphs",
		count: "3",
		startWithLorem: true,
		generatedText: "",
	});

	const handleGenerate = () => {
		const numCount = Number.parseInt(state.count);
		const result = generateLoremText(state.type, numCount, state.startWithLorem);
		updateState({ generatedText: result });
	};

	const handlePresetSelect = (
		presetType: PresetType,
		presetCount: string,
		presetStartWithLorem: boolean,
	) => {
		updateState({
			type: presetType,
			count: presetCount,
			startWithLorem: presetStartWithLorem,
		});
	};

	return (
		<div className="grid gap-6 lg:grid-cols-2">
			{/* Configuration Section */}
			<div className="space-y-6">
				<TextConfiguration
					type={state.type}
					count={state.count}
					startWithLorem={state.startWithLorem}
					onTypeChange={(type) => updateState({ type })}
					onCountChange={(count) => updateState({ count })}
					onStartWithLoremChange={(startWithLorem) => updateState({ startWithLorem })}
					onGenerate={handleGenerate}
					onClear={clearState}
				/>
				<LoremInfo />
			</div>

			{/* Output Section */}
			<div className="space-y-6">
				<TextOutput generatedText={state.generatedText} />
				<QuickPresets onPresetSelect={handlePresetSelect} />
			</div>
		</div>
	);
}
