import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { isValidBase64 } from "@/lib/utils/base64-converter";
import ToolSection from "@/components/tool-section";
import { cn } from "@/lib/utils";

interface TextDecoderProps {
	base64Input: string;
	decodedResult: string;
	onBase64Change: (text: string) => void;
	onDecode: () => void;
	onClear: () => void;
}

export function TextDecoder({
	base64Input,
	decodedResult,
	onBase64Change,
	onDecode,
	onClear,
}: TextDecoderProps) {
	const isValid = !base64Input || isValidBase64(base64Input.replace(/\s/g, ""));

	return (
		<ToolSection title="Decode from Base64" description="Convert Base64 back to plain text">
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="base64Input">Base64 Text</Label>
					<Textarea
						id="base64Input"
						placeholder="Enter Base64 to decode..."
						value={base64Input}
						onChange={(e) => onBase64Change(e.target.value)}
						className="min-h-[120px] font-mono text-sm"
					/>
				</div>

				<div className="flex gap-2">
					<Button onClick={onDecode} className="flex-1">
						Decode
					</Button>
					<Button onClick={onClear} variant="outline">
						<RotateCcw className="h-4 w-4" />
					</Button>
				</div>

				{base64Input && (
					<span
						className={cn(
							"rounded px-2 py-1 text-xs",
							isValid
								? "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200"
								: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
						)}
					>
						{isValid ? "Valid Base64" : "Invalid Base64"}
					</span>
				)}

				{decodedResult && (
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label>Decoded Result</Label>
							<CopyButton text={decodedResult} size="sm" />
						</div>
						<Textarea value={decodedResult} readOnly className="min-h-[120px]" />
						<div className="text-sm text-neutral-500 dark:text-neutral-400">
							Length: {decodedResult.length} characters
						</div>
					</div>
				)}
			</div>
		</ToolSection>
	);
}
