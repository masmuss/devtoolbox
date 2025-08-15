import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToolState } from "@/lib/hooks/use-tool-state";
import { URLDecoderTab } from "../partials/url/url-decoder-tab";
import { useState } from "react";
import {
	decodeURL,
	encodeURL,
	type URLDecodingResult,
	type URLEncodingResult,
} from "@/lib/utils/url-encoder";
import { URLEncoderTab } from "../partials/url/url-encoder-tab";

interface URLEncoderState {
	encodeInput: string;
	decodeInput: string;
}

export default function URLEncoderComponent() {
	const { state, updateState } = useToolState<URLEncoderState>({
		encodeInput: "",
		decodeInput: "",
	});

	const [encodeResult, setEncodeResult] = useState<URLEncodingResult | null>(null);
	const [decodeResult, setDecodeResult] = useState<URLDecodingResult | null>(null);

	const handleEncode = () => {
		const result = encodeURL(state.encodeInput);
		setEncodeResult(result);
	};

	const handleDecode = () => {
		const result = decodeURL(state.decodeInput);
		setDecodeResult(result);
	};

	const clearEncode = () => {
		updateState({ encodeInput: "" });
		setEncodeResult(null);
	};

	const clearDecode = () => {
		updateState({ decodeInput: "" });
		setDecodeResult(null);
	};

	const swapEncodeDecode = () => {
		const tempInput = state.encodeInput;
		updateState({
			encodeInput: state.decodeInput,
			decodeInput: tempInput,
		});
		setEncodeResult(null);
		setDecodeResult(null);
	};

	return (
		<Tabs defaultValue="encode" className="space-y-8">
			<div className="flex justify-center">
				<TabsList className="grid w-full max-w-md grid-cols-2 bg-neutral-100 dark:bg-neutral-900">
					<TabsTrigger
						value="encode"
						className="data-[state=active]:bg-white dark:data-[state=active]:bg-black"
					>
						Encode
					</TabsTrigger>
					<TabsTrigger
						value="decode"
						className="data-[state=active]:bg-white dark:data-[state=active]:bg-black"
					>
						Decode
					</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="encode" className="space-y-8">
				<URLEncoderTab
					input={state.encodeInput}
					output={
						encodeResult?.encoded || (encodeResult?.error ? `Error: ${encodeResult.error}` : "")
					}
					result={encodeResult}
					onInputChange={(value) => updateState({ encodeInput: value })}
					onEncode={handleEncode}
					onClear={clearEncode}
					onSwap={swapEncodeDecode}
				/>
			</TabsContent>

			<TabsContent value="decode" className="space-y-8">
				<URLDecoderTab
					input={state.decodeInput}
					output={
						decodeResult?.decoded || (decodeResult?.error ? `Error: ${decodeResult.error}` : "")
					}
					onInputChange={(value) => updateState({ decodeInput: value })}
					onDecode={handleDecode}
					onClear={clearDecode}
					onSwap={swapEncodeDecode}
				/>
			</TabsContent>
		</Tabs>
	);
}
