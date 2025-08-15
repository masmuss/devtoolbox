import { useToolState } from "@/lib/hooks/use-tool-state";
import { HashInput } from "../partials/hash/hash-input";
import { generateHash } from "@/lib/utils/hash-generator";
import { HashOutput } from "../partials/hash/hash-output";
import { HashInfo } from "../partials/hash/hash-info";

interface HashState {
	input: string;
	output: string;
	hashType: string;
	error: string;
}

export default function HashGeneratorComponent() {
	const { state, updateState, isProcessing, setIsProcessing } = useToolState<HashState>({
		input: "",
		output: "",
		hashType: "sha256",
		error: "",
	});

	const handleGenerate = async () => {
		if (!state.input.trim()) {
			updateState({ error: "Please enter some text to hash", output: "" });
			return;
		}

		setIsProcessing(true);
		updateState({ error: "" });

		try {
			const hash = await generateHash(state.input, state.hashType);
			updateState({ output: hash, error: "" });
		} catch (error) {
			updateState({
				error: error instanceof Error ? error.message : "Error generating hash",
				output: "",
			});
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<div className="grid gap-8">
			<HashInput
				input={state.input}
				hashType={state.hashType}
				onInputChange={(input) => updateState({ input })}
				onHashTypeChange={(hashType) => updateState({ hashType })}
				onGenerate={handleGenerate}
				isProcessing={isProcessing}
			/>

			<HashOutput output={state.output} hashType={state.hashType} error={state.error} />

			<HashInfo />
		</div>
	);
}
