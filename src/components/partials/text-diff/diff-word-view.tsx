import { Card } from "@/components/ui/card";

interface DiffWordViewProps {
	wordDiff: string;
}

export function DiffWordView({ wordDiff }: DiffWordViewProps) {
	return (
		<Card className="p-6">
			<div className="bg-muted/20 mb-4 rounded-lg border border-dashed p-3">
				<div className="text-muted-foreground text-sm">
					<strong>Word-level Changes:</strong> Strikethrough text shows deletions, highlighted text
					shows additions.
				</div>
			</div>
			<div
				className="prose prose-sm max-h-[600px] max-w-none overflow-y-auto font-mono text-sm leading-relaxed"
				dangerouslySetInnerHTML={{ __html: wordDiff }}
				style={{
					wordBreak: "break-word",
					lineHeight: "1.8",
				}}
			/>
		</Card>
	);
}
