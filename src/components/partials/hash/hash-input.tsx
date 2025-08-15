import ToolSection from "@/components/tool-section";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { hashTypes } from "@/lib/utils/hash-generator";
import { Type } from "lucide-react";

interface HashInputProps {
	input: string;
	hashType: string;
	onInputChange: (value: string) => void;
	onHashTypeChange: (value: string) => void;
	onGenerate: () => void;
	isProcessing?: boolean;
}

export function HashInput({
	input,
	hashType,
	onInputChange,
	onHashTypeChange,
	onGenerate,
	isProcessing = false,
}: HashInputProps) {
	return (
		<ToolSection icon={Type} title="Input Text" description="Enter the text you want to hash">
			<div className="space-y-4">
				<Textarea
					value={input}
					onChange={(e) => onInputChange(e.target.value)}
					placeholder="Enter your text here..."
					className="min-h-32 border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
				/>
				<div className="flex flex-col gap-4 sm:flex-row">
					<div className="flex-1">
						<Select value={hashType} onValueChange={onHashTypeChange}>
							<SelectTrigger className="border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
								<SelectValue placeholder="Select hash algorithm" />
							</SelectTrigger>
							<SelectContent>
								{hashTypes.map((type) => (
									<SelectItem key={type.value} value={type.value}>
										<div className="flex items-center gap-2 font-medium">
											{type.label}
											{!type.secure && (
												<span className="rounded bg-yellow-100 px-1 text-xs text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
													Legacy
												</span>
											)}
										</div>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<Button
						onClick={onGenerate}
						disabled={isProcessing}
						className="bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
					>
						{isProcessing ? "Generating..." : "Generate Hash"}
					</Button>
				</div>
			</div>
		</ToolSection>
	);
}
