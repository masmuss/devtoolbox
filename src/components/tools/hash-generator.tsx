import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CopyButton } from "@/components/copy-button";
import { useToolState } from "@/lib/hooks/use-tool-state";

interface HashType {
	value: string;
	label: string;
	description: string;
}

interface HashGeneratorState {
	input: string;
	hashType: "sha1" | "sha256" | "sha384" | "sha512";
	output: string;
}

const hashTypes: HashType[] = [
	{ value: "sha1", label: "SHA-1", description: "160-bit hash" },
	{ value: "sha256", label: "SHA-256", description: "256-bit hash (recommended)" },
	{ value: "sha384", label: "SHA-384", description: "384-bit hash" },
	{ value: "sha512", label: "SHA-512", description: "512-bit hash" },
];

export default function HashGeneratorComponent() {
	const { state, updateState } = useToolState<HashGeneratorState>({
		input: "",
		hashType: "sha1",
		output: "",
	});

	const generateHash = async () => {
		if (!state.input.trim()) {
			updateState({ output: "Please enter some text to hash" });
			return;
		}

		try {
			const encoder = new TextEncoder();
			const data = encoder.encode(state.input);

			let hashBuffer: ArrayBuffer;

			switch (state.hashType) {
				case "sha1":
					hashBuffer = await crypto.subtle.digest("SHA-1", data);
					break;
				case "sha256":
					hashBuffer = await crypto.subtle.digest("SHA-256", data);
					break;
				case "sha384":
					hashBuffer = await crypto.subtle.digest("SHA-384", data);
					break;
				case "sha512":
					hashBuffer = await crypto.subtle.digest("SHA-512", data);
					break;
				default:
					hashBuffer = await crypto.subtle.digest("SHA-256", data);
			}

			const hashArray = Array.from(new Uint8Array(hashBuffer));
			const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
			updateState({ output: hashHex });
		} catch (error) {
			updateState({ output: "Error generating hash" });
		}
	};

	return (
		<div className="grid gap-8">
			<Card className="border-neutral-200 dark:border-neutral-800">
				<CardHeader>
					<CardTitle className="text-black dark:text-white">Input Text</CardTitle>
					<CardDescription className="text-neutral-600 dark:text-neutral-400">
						Enter the text you want to hash
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Textarea
						value={state.input}
						onChange={(e) => updateState({ input: e.target.value })}
						placeholder="Enter your text here..."
						className="min-h-32 border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
					/>
					<div className="flex flex-col gap-4 sm:flex-row">
						<div className="flex-1">
							<div className="flex items-center space-x-2">
								<Select
									value={state.hashType}
									onValueChange={(v) => updateState({ hashType: v as typeof state.hashType })}
								>
									<SelectTrigger className="border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
										<SelectValue placeholder="Select hash algorithm" />
									</SelectTrigger>
									<SelectContent>
										{hashTypes.map((type) => (
											<SelectItem key={type.value} value={type.value}>
												<div className="font-medium">{type.label}</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<span className="text-muted-foreground text-sm">
									{hashTypes.find((type) => type.value === state.hashType)?.description || ""}
								</span>
							</div>
						</div>
						<Button
							onClick={generateHash}
							className="bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
						>
							Generate Hash
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card className="border-neutral-200 dark:border-neutral-800">
				<CardHeader>
					<CardTitle className="text-black dark:text-white">Generated Hash</CardTitle>
					<CardDescription className="text-neutral-600 dark:text-neutral-400">
						Your {state.hashType.toUpperCase()} hash will appear here
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="relative">
						<Textarea
							value={state.output}
							readOnly
							placeholder="Your hash will appear here after generation..."
							className="min-h-24 max-w-full resize-none border-neutral-200 bg-neutral-50 font-mono text-sm dark:border-neutral-800 dark:bg-neutral-900"
						/>
						{state.output &&
							state.output !== "Please enter some text to hash" &&
							state.output !== "Error generating hash" && (
								<div className="absolute top-2 right-2">
									<CopyButton
										text={state.output}
										className="h-8 w-8 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800"
									/>
								</div>
							)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
