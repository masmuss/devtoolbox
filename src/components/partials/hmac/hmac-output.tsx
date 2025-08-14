import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";

interface HMACOutputProps {
	output: string;
	algorithm: string;
	isProcessing: boolean;
	onGenerate: () => void;
	onClear: () => void;
}

export function HMACOutput({
	output,
	algorithm,
	isProcessing,
	onGenerate,
	onClear,
}: HMACOutputProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>HMAC Result</CardTitle>
				<CardDescription>Generated authentication code</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="flex gap-2">
						<Button onClick={onGenerate} disabled={isProcessing} className="flex-1">
							{isProcessing ? "Generating..." : "Generate HMAC"}
						</Button>
						<Button onClick={onClear} variant="outline">
							Clear
						</Button>
					</div>

					{output && (
						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label>HMAC ({algorithm})</Label>
								<CopyButton text={output} label="Copy" variant="outline" size="sm" />
							</div>
							<Textarea value={output} readOnly className="font-mono text-sm break-all" rows={3} />
							<div className="text-sm text-neutral-500 dark:text-neutral-400">
								Length: {output.length} characters
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
