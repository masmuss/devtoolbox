import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, ArrowUpDown } from "lucide-react";
import { Label } from "../ui/label";
import { useToolState } from "@/lib/hooks/use-tool-state";
import { CopyButton } from "@/components/copy-button";

interface URLEncoderState {
	encodeInput: string;
	decodeInput: string;
	encodeOutput: string;
	decodeOutput: string;
}

export default function URLEncoderComponent() {
	const { state, updateState, clearState } = useToolState<URLEncoderState>({
		encodeInput: "",
		decodeInput: "",
		encodeOutput: "",
		decodeOutput: "",
	});

	const encodeURL = () => {
		try {
			const encoded = encodeURIComponent(state.encodeInput);
			updateState({ encodeOutput: encoded });
		} catch (error) {
			updateState({ encodeOutput: "Error: Invalid input for encoding" });
		}
	};

	const decodeURL = () => {
		try {
			const decoded = decodeURIComponent(state.decodeInput);
			updateState({ decodeOutput: decoded });
		} catch (error) {
			updateState({ decodeOutput: "Error: Invalid URL encoding" });
		}
	};

	const clearEncode = () => {
		updateState({
			encodeInput: "",
			encodeOutput: "",
		});
	};

	const clearDecode = () => {
		updateState({
			decodeInput: "",
			decodeOutput: "",
		});
	};

	const swapEncodeDecode = () => {
		const tempInput = state.encodeInput;
		const tempOutput = state.encodeOutput;
		updateState({
			encodeInput: state.decodeInput,
			encodeOutput: state.decodeOutput,
			decodeInput: tempInput,
			decodeOutput: tempOutput,
		});
	};

	const exampleURLs = [
		"https://example.com/search?q=hello world&category=tech",
		"https://api.example.com/users?name=John Doe&email=john@example.com",
		"Special characters: !@#$%^&*()+={}[]|\\:;\"'<>,.?/~`",
		"Unicode: 你好世界 🌍 café naïve résumé",
		"Spaces and symbols: This is a test & more!",
	];

	const exampleEncoded = [
		"https%3A//example.com/search%3Fq%3Dhello%20world%26category%3Dtech",
		"https%3A//api.example.com/users%3Fname%3DJohn%20Doe%26email%3Djohn%40example.com",
		"Special%20characters%3A%20!%40%23%24%25%5E%26*()%2B%3D%7B%7D%5B%5D%7C%5C%3A%3B%22'%3C%3E%2C.%3F/~%60",
	];

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

			{/* Encode Tab */}
			<TabsContent value="encode" className="space-y-8">
				<Card className="border-neutral-200 dark:border-neutral-800">
					<CardHeader>
						<CardTitle className="text-black dark:text-white">URL Encode</CardTitle>
						<CardDescription className="text-neutral-600 dark:text-neutral-400">
							Convert special characters to percent-encoded format
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label>Input (Plain Text/URL)</Label>
							<Textarea
								value={state.encodeInput}
								onChange={(e) => updateState({ encodeInput: e.target.value })}
								placeholder="Enter text or URL to encode..."
								className="min-h-24 border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
							/>
						</div>

						<div className="flex flex-wrap gap-2">
							<Button
								onClick={encodeURL}
								className="bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
							>
								Encode URL
							</Button>
							<Button
								onClick={clearEncode}
								variant="outline"
								className="border-neutral-200 bg-transparent hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
							>
								<RefreshCw className="mr-2 h-4 w-4" />
								Clear
							</Button>
							<Button
								onClick={swapEncodeDecode}
								variant="outline"
								className="border-neutral-200 bg-transparent hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
							>
								<ArrowUpDown className="mr-2 h-4 w-4" />
								Swap with Decode
							</Button>
						</div>

						<div className="space-y-2">
							<Label>Output (Encoded)</Label>
							<div className="relative">
								<Textarea
									value={state.encodeOutput}
									readOnly
									placeholder="Encoded URL will appear here..."
									className="min-h-24 resize-none border-neutral-200 bg-neutral-50 font-mono text-sm dark:border-neutral-800 dark:bg-neutral-900"
								/>
								{state.encodeOutput && !state.encodeOutput.startsWith("Error:") && (
									<CopyButton
										text={state.encodeOutput}
										className="absolute top-2 right-2 h-8 w-8 p-0"
									/>
								)}
							</div>
						</div>

						{/* Examples for encoding */}
						<div className="space-y-2">
							<Label>Try these examples:</Label>
							<div className="grid gap-2">
								{exampleURLs.map((url, index) => (
									<Button
										key={index}
										variant="outline"
										size="sm"
										onClick={() => updateState({ encodeInput: url })}
										className="h-auto justify-start border-neutral-200 p-3 text-left hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
									>
										<span className="truncate text-xs">{url}</span>
									</Button>
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</TabsContent>

			{/* Decode Tab */}
			<TabsContent value="decode" className="space-y-8">
				<Card className="border-neutral-200 dark:border-neutral-800">
					<CardHeader>
						<CardTitle className="text-black dark:text-white">URL Decode</CardTitle>
						<CardDescription className="text-neutral-600 dark:text-neutral-400">
							Convert percent-encoded characters back to readable format
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label className="text-sm font-medium text-black dark:text-white">
								Input (Encoded URL)
							</Label>
							<Textarea
								value={state.decodeInput}
								onChange={(e) => updateState({ decodeInput: e.target.value })}
								placeholder="Enter encoded URL to decode..."
								className="min-h-24 border-neutral-200 bg-neutral-50 font-mono text-sm dark:border-neutral-800 dark:bg-neutral-900"
							/>
						</div>

						<div className="flex flex-wrap gap-2">
							<Button
								onClick={decodeURL}
								className="bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
							>
								Decode URL
							</Button>
							<Button
								onClick={clearDecode}
								variant="outline"
								className="border-neutral-200 bg-transparent hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
							>
								<RefreshCw className="mr-2 h-4 w-4" />
								Clear
							</Button>
							<Button
								onClick={swapEncodeDecode}
								variant="outline"
								className="border-neutral-200 bg-transparent hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
							>
								<ArrowUpDown className="mr-2 h-4 w-4" />
								Swap with Encode
							</Button>
						</div>

						<div className="space-y-2">
							<Label className="text-sm font-medium text-black dark:text-white">
								Output (Decoded)
							</Label>
							<div className="relative">
								<Textarea
									value={state.decodeOutput}
									readOnly
									placeholder="Decoded URL will appear here..."
									className="min-h-24 resize-none border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
								/>
								{state.decodeOutput && !state.decodeOutput.startsWith("Error:") && (
									<CopyButton
										text={state.decodeOutput}
										className="absolute top-2 right-2 h-8 w-8 p-0"
									/>
								)}
							</div>
						</div>

						{/* Examples for decoding */}
						<div className="space-y-2">
							<Label>Try these examples:</Label>
							<div className="grid gap-2">
								{exampleEncoded.map((url, index) => (
									<Button
										key={index}
										variant="outline"
										size="sm"
										onClick={() => updateState({ decodeInput: url })}
										className="h-auto justify-start border-neutral-200 p-3 text-left hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
									>
										<span className="truncate font-mono text-xs">{url}</span>
									</Button>
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
