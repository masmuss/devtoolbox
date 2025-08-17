import { useToolState } from "@/lib/hooks/use-tool-state";
import { encodeHtmlEntities, decodeHtmlEntities } from "@/lib/utils/html-entity-encoder";
import { EntityConverter } from "../partials/html-entity/entity-converter";
import { EntityReference } from "../partials/html-entity/entity-references";

interface HtmlEntityState {
	input: string;
	encoded: string;
	decoded: string;
}

export default function HtmlEntityEncoderComponent() {
	const { state, updateState, clearState } = useToolState<HtmlEntityState>({
		input: "",
		encoded: "",
		decoded: "",
	});

	const handleEncode = (encodeAll: boolean) => {
		if (!state.input.trim()) return;

		const encoded = encodeHtmlEntities(state.input, encodeAll);
		updateState({ encoded, decoded: "" });
	};

	const handleDecode = () => {
		if (!state.input.trim()) return;

		const decoded = decodeHtmlEntities(state.input);
		updateState({ decoded, encoded: "" });
	};

	return (
		<div className="grid gap-8 lg:grid-cols-3">
			<div className="lg:col-span-2">
				<EntityConverter
					input={state.input}
					onInputChange={(input) => updateState({ input })}
					onEncode={handleEncode}
					onDecode={handleDecode}
					onClear={clearState}
					encoded={state.encoded}
					decoded={state.decoded}
				/>
			</div>

			<div>
				<EntityReference />
			</div>
		</div>
	);
}
