import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/copy-button";
import ToolSection from "@/components/tool-section.tsx";

interface JWTOutputSectionProps {
	output: string;
	isProcessing: boolean;
	onGenerate: () => void;
}

export function JWTOutputSection({ output, isProcessing, onGenerate }: JWTOutputSectionProps) {
	return (
		<ToolSection
			title="Generate JWT Token"
			description="Click the button to generate your JWT token based on the provided header and payload."
		>
			<div className="space-y-4">
				<Button onClick={onGenerate} className="w-full" disabled={isProcessing}>
					{isProcessing ? "Generating..." : "Generate JWT Token"}
				</Button>

				{output && (
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label>JWT Token</Label>
							<CopyButton text={output} label="Copy" variant="outline" size="sm" />
						</div>
						<Textarea value={output} readOnly className="font-mono text-sm break-all" rows={6} />
					</div>
				)}
			</div>
		</ToolSection>
	);
}
