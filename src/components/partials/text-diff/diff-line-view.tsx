import { Card } from "@/components/ui/card";
import type { DiffLine } from "@/lib/utils/text-diff";

interface DiffLineViewProps {
	diffLines: DiffLine[];
}

export function DiffLineView({ diffLines }: DiffLineViewProps) {
	return (
		<Card className="overflow-hidden">
			<div className="max-h-[600px] overflow-y-auto">
				<div className="divide-border divide-y">
					{diffLines.map((line, index) => (
						<div
							key={index}
							className={`flex items-start transition-colors duration-150 ${
								line.type === "added"
									? "bg-muted/30 hover:bg-muted/50"
									: line.type === "removed"
										? "bg-muted/20 hover:bg-muted/40"
										: "bg-background hover:bg-muted/20"
							}`}
						>
							<div className="text-muted-foreground bg-muted/30 w-16 flex-shrink-0 border-r px-3 py-2 text-right text-xs">
								{line.lineNumber}
							</div>
							<div
								className={`w-8 flex-shrink-0 px-2 py-2 text-center font-mono text-sm ${
									line.type === "added"
										? "text-foreground bg-muted/50 font-bold"
										: line.type === "removed"
											? "text-muted-foreground bg-muted/30"
											: "text-muted-foreground bg-muted/20"
								}`}
							>
								{line.type === "added" ? "+" : line.type === "removed" ? "-" : ""}
							</div>
							<div className="flex-1 px-4 py-2 font-mono text-sm leading-relaxed break-all whitespace-pre-wrap">
								{line.content || " "}
							</div>
						</div>
					))}
				</div>
			</div>
		</Card>
	);
}
