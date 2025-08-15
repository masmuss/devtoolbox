import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw, Type } from "lucide-react";
import ToolSection from "@/components/tool-section";

interface CaseInputProps {
	inputText: string;
	onInputChange: (text: string) => void;
	onClear: () => void;
	onConvert: () => void;
}

export function CaseInput({ inputText, onInputChange, onClear, onConvert }: CaseInputProps) {
	const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

	return (
		<ToolSection
			title="Input Text"
			description="Enter the text you want to convert into different cases."
		>
			<div className="space-y-2">
				<Label htmlFor="inputText" className="text-sm font-medium">
					Text to Convert
				</Label>
				<Textarea
					id="inputText"
					placeholder="Enter your text here..."
					value={inputText}
					onChange={(e) => onInputChange(e.target.value)}
					className="mt-2 min-h-[120px] resize-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
				/>
			</div>

			<div className="flex items-center justify-between">
				<div className="font-mono text-sm text-neutral-500 dark:text-neutral-400">
					{inputText.length} chars • {wordCount} words
				</div>
				<div className="flex gap-2">
					<Button
						onClick={onConvert}
						size="sm"
						className="bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
					>
						Convert
					</Button>
					<Button onClick={onClear} variant="outline" size="sm">
						<RotateCcw className="mr-1 h-4 w-4" />
						Clear
					</Button>
				</div>
			</div>
		</ToolSection>
	);
}
