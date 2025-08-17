import {
	encodeToBase64,
	decodeFromBase64,
	getEmptyBase64Results,
	type Base64Results,
} from "@/lib/utils/base64-converter";
import { FileText, ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToolState } from "@/lib/hooks/use-tool-state";
import { TextEncoder } from "../partials/base64/text-encoder";
import { TextDecoder } from "../partials/base64/text-decoder";
import { FileConverter } from "../partials/base64/file-converter";

interface Base64State {
	textInput: string;
	base64Input: string;
	results: Base64Results;
}

export default function Base64ConverterComponent() {
	const { state, updateState, clearState } = useToolState<Base64State>({
		textInput: "",
		base64Input: "",
		results: getEmptyBase64Results(),
	});

	const handleEncodeText = () => {
		try {
			const encoded = encodeToBase64(state.textInput);
			updateState({
				results: { ...state.results, encoded },
			});
		} catch (error) {
			alert(error instanceof Error ? error.message : "Error encoding text");
		}
	};

	const handleDecodeBase64 = () => {
		try {
			const decoded = decodeFromBase64(state.base64Input);
			updateState({
				results: { ...state.results, decoded },
			});
		} catch (error) {
			alert(error instanceof Error ? error.message : "Error decoding Base64");
		}
	};

	const handleSwapEncodeDecode = () => {
		if (state.results.encoded) {
			updateState({
				base64Input: state.results.encoded,
				results: { ...state.results, encoded: "" },
			});
		}
	};

	const handleFileBase64Change = (fileBase64: string) => {
		updateState({
			results: { ...state.results, fileBase64 },
		});
	};

	return (
		<Tabs defaultValue="text" className="space-y-6">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="text" className="flex items-center gap-2">
					<FileText className="h-4 w-4" />
					Text Conversion
				</TabsTrigger>
				<TabsTrigger value="file" className="flex items-center gap-2">
					<ImageIcon className="h-4 w-4" />
					File Conversion
				</TabsTrigger>
			</TabsList>

			<TabsContent value="text" className="space-y-6">
				<div className="grid gap-6 lg:grid-cols-2">
					<TextEncoder
						textInput={state.textInput}
						encodedResult={state.results.encoded}
						onTextChange={(text) => updateState({ textInput: text })}
						onEncode={handleEncodeText}
						onSwap={handleSwapEncodeDecode}
						canSwap={!!state.results.encoded}
					/>

					<TextDecoder
						base64Input={state.base64Input}
						decodedResult={state.results.decoded}
						onBase64Change={(text) => updateState({ base64Input: text })}
						onDecode={handleDecodeBase64}
						onClear={clearState}
					/>
				</div>
			</TabsContent>

			<TabsContent value="file" className="space-y-6">
				<FileConverter
					fileBase64={state.results.fileBase64}
					onFileBase64Change={handleFileBase64Change}
				/>
			</TabsContent>
		</Tabs>
	);
}
