import { useEffect } from "react";
import { useToolState } from "@/lib/hooks/use-tool-state";
import { SlugInput } from "../partials/slug/slug-input";
import { SlugOptions } from "../partials/slug/slug-options";
import { SlugOutput } from "../partials/slug/slug-output";

interface SlugGeneratorState {
	input: string;
	output: string;
	separator: string;
	lowercase: boolean;
	removeSpecialChars: boolean;
	maxLength: string;
}

export default function SlugGeneratorComponent() {
	const { state, updateState, clearState } = useToolState<SlugGeneratorState>({
		input: "",
		output: "",
		separator: "-",
		lowercase: true,
		removeSpecialChars: true,
		maxLength: "",
	});

	const generateSlug = (text: string) => {
		let slug = text;

		if (state.lowercase) {
			slug = slug.toLowerCase();
		}

		if (state.removeSpecialChars) {
			slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			slug = slug.replace(/[^a-zA-Z0-9\s\-_]/g, "");
		}

		slug = slug.replace(/[\s\-_]+/g, state.separator);

		slug = slug.replace(new RegExp(`^${state.separator}+|${state.separator}+$`, "g"), "");

		if (state.maxLength && Number.parseInt(state.maxLength) > 0) {
			slug = slug.substring(0, Number.parseInt(state.maxLength));
			slug = slug.replace(new RegExp(`${state.separator}+$`), "");
		}

		return slug;
	};

	useEffect(() => {
		if (state.input.trim()) {
			updateState({ output: generateSlug(state.input) });
		} else {
			updateState({ output: "" });
		}
	}, [state.input, state.separator, state.lowercase, state.removeSpecialChars, state.maxLength]);

	return (
		<div className="grid gap-8">
			<SlugInput
				value={state.input}
				onChange={(value) => updateState({ input: value })}
				onClear={clearState}
			/>

			<SlugOptions
				separator={state.separator}
				lowercase={state.lowercase}
				removeSpecialChars={state.removeSpecialChars}
				maxLength={state.maxLength}
				onSeparatorChange={(value) => updateState({ separator: value })}
				onLowercaseChange={(checked) => updateState({ lowercase: checked })}
				onRemoveSpecialCharsChange={(checked) => updateState({ removeSpecialChars: checked })}
				onMaxLengthChange={(value) => updateState({ maxLength: value })}
			/>

			<SlugOutput output={state.output} />
		</div>
	);
}
