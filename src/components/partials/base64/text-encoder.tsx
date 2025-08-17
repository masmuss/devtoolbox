"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { formatBase64 } from "@/lib/utils/base64-converter";
import ToolSection from "@/components/tool-section";

interface TextEncoderProps {
	textInput: string;
	encodedResult: string;
	onTextChange: (text: string) => void;
	onEncode: () => void;
	onSwap: () => void;
	canSwap: boolean;
}

export function TextEncoder({
	textInput,
	encodedResult,
	onTextChange,
	onEncode,
	onSwap,
	canSwap,
}: TextEncoderProps) {
	return (
		<ToolSection title="Encode to Base64" description="Convert plain text to Base64">
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="textInput">Plain Text</Label>
					<Textarea
						id="textInput"
						placeholder="Enter text to encode..."
						value={textInput}
						onChange={(e) => onTextChange(e.target.value)}
						className="min-h-[120px]"
					/>
				</div>

				<div className="flex gap-2">
					<Button onClick={onEncode} className="flex-1">
						Encode
					</Button>
					<Button onClick={onSwap} variant="outline" disabled={!canSwap}>
						<ArrowUpDown className="h-4 w-4" />
					</Button>
				</div>

				{encodedResult && (
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label>Base64 Result</Label>
							<CopyButton text={encodedResult} size="sm" />
						</div>
						<Textarea
							value={formatBase64(encodedResult)}
							readOnly
							className="font-mono text-sm"
							rows={6}
						/>
						<div className="text-sm text-neutral-500 dark:text-neutral-400">
							Length: {encodedResult.length} characters
						</div>
					</div>
				)}
			</div>
		</ToolSection>
	);
}
