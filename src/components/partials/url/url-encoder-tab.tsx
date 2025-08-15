"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, ArrowUpDown, Globe } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import type { URLEncodingResult } from "@/lib/utils/url-encoder";
import ToolSection from "@/components/tool-section";
import { URLStats } from "./url-stats";
import { URLExamples } from "./url-examples";
import { Label } from "@/components/ui/label";

interface URLEncoderTabProps {
	input: string;
	output: string;
	result: URLEncodingResult | null;
	onInputChange: (value: string) => void;
	onEncode: () => void;
	onClear: () => void;
	onSwap: () => void;
}

const exampleURLs = [
	"https://example.com/search?q=hello world&category=tech",
	"https://api.example.com/users?name=John Doe&email=john@example.com",
	"Special characters: !@#$%^&*()+={}[]|\\:;\"'<>,.?/~`",
	"Unicode: 你好世界 🌍 café naïve résumé",
	"Spaces and symbols: This is a test & more!",
];

export function URLEncoderTab({
	input,
	output,
	result,
	onInputChange,
	onEncode,
	onClear,
	onSwap,
}: URLEncoderTabProps) {
	return (
		<div className="space-y-6">
			<ToolSection
				icon={Globe}
				title="URL Encode"
				description="Convert special characters to percent-encoded format"
			>
				<div className="space-y-4">
					<div className="space-y-2">
						<label className="text-sm font-medium text-black dark:text-white">
							Input (Plain Text/URL)
						</label>
						<Textarea
							value={input}
							onChange={(e) => onInputChange(e.target.value)}
							placeholder="Enter text or URL to encode..."
							className="min-h-24 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
						/>
					</div>

					<div className="flex flex-wrap gap-2">
						<Button
							onClick={onEncode}
							className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
						>
							Encode URL
						</Button>
						<Button
							onClick={onClear}
							variant="outline"
							className="border-gray-200 bg-transparent hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
						>
							<RefreshCw className="mr-2 h-4 w-4" />
							Clear
						</Button>
						<Button
							onClick={onSwap}
							variant="outline"
							className="border-gray-200 bg-transparent hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
						>
							<ArrowUpDown className="mr-2 h-4 w-4" />
							Swap with Decode
						</Button>
					</div>

					<div className="space-y-2">
						<Label className="text-sm font-medium text-black dark:text-white">
							Output (Encoded)
						</Label>
						<div className="relative">
							<Textarea
								value={output}
								readOnly
								placeholder="Encoded URL will appear here..."
								className="min-h-24 resize-none border-gray-200 bg-gray-50 font-mono text-sm dark:border-gray-800 dark:bg-gray-900"
							/>
							{output && !output.startsWith("Error:") && (
								<CopyButton text={output} className="absolute top-2 right-2 h-8 w-8 p-0" />
							)}
						</div>
					</div>
				</div>
			</ToolSection>

			{result && !result.error && <URLStats result={result} type="encode" />}

			<URLExamples onSelectExample={onInputChange} />
		</div>
	);
}
