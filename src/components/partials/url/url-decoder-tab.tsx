"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw, ArrowUpDown } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import ToolSection from "@/components/tool-section";
import { Label } from "@/components/ui/label";

interface URLDecoderTabProps {
	input: string;
	output: string;
	onInputChange: (value: string) => void;
	onDecode: () => void;
	onClear: () => void;
	onSwap: () => void;
}

const exampleEncoded = [
	"https%3A//example.com/search%3Fq%3Dhello%20world%26category%3Dtech",
	"https%3A//api.example.com/users%3Fname%3DJohn%20Doe%26email%3Djohn%40example.com",
	"Special%20characters%3A%20!%40%23%24%25%5E%26*()%2B%3D%7B%7D%5B%5D%7C%5C%3A%3B%22'%3C%3E%2C.%3F/~%60",
];

export function URLDecoderTab({
	input,
	output,
	onInputChange,
	onDecode,
	onClear,
	onSwap,
}: URLDecoderTabProps) {
	return (
		<ToolSection
			title="URL Decoder"
			description="Decode percent-encoded URLs back to their original format."
		>
			<div className="space-y-2">
				<Label className="text-sm font-medium text-black dark:text-white">
					Input (Encoded URL)
				</Label>
				<Textarea
					value={input}
					onChange={(e) => onInputChange(e.target.value)}
					placeholder="Enter encoded URL to decode..."
					className="min-h-24 border-gray-200 bg-gray-50 font-mono text-sm dark:border-gray-800 dark:bg-gray-900"
				/>
			</div>

			<div className="flex flex-wrap gap-2">
				<Button
					onClick={onDecode}
					className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
				>
					Decode URL
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
					Swap with Encode
				</Button>
			</div>

			<div className="space-y-2">
				<label className="text-sm font-medium text-black dark:text-white">Output (Decoded)</label>
				<div className="relative">
					<Textarea
						value={output}
						readOnly
						placeholder="Decoded URL will appear here..."
						className="min-h-24 resize-none border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
					/>
					{output && !output.startsWith("Error:") && (
						<CopyButton text={output} className="absolute top-2 right-2 h-8 w-8 p-0" />
					)}
				</div>
			</div>

			<div className="space-y-2">
				<label className="text-sm text-gray-600 dark:text-gray-400">Try these examples:</label>
				<div className="grid gap-2">
					{exampleEncoded.map((url, index) => (
						<Button
							key={index}
							variant="outline"
							size="sm"
							onClick={() => onInputChange(url)}
							className="h-auto justify-start border-gray-200 p-3 text-left hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
						>
							<span className="truncate font-mono text-xs">{url}</span>
						</Button>
					))}
				</div>
			</div>
		</ToolSection>
	);
}
