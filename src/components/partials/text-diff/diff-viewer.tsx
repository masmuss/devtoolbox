import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, Code, FileText } from "lucide-react";
import type { DiffLine } from "@/lib/utils/text-diff";
import ToolSection from "@/components/tool-section";
import { DiffLineView } from "./diff-line-view";
import { DiffWordView } from "./diff-word-view";

interface DiffViewerProps {
	diffLines: DiffLine[];
	wordDiff: string;
}

export function DiffViewer({ diffLines, wordDiff }: DiffViewerProps) {
	const addedLines = diffLines.filter((line) => line.type === "added").length;
	const removedLines = diffLines.filter((line) => line.type === "removed").length;
	const unchangedLines = diffLines.filter((line) => line.type === "unchanged").length;

	return (
		<ToolSection
			icon={Eye}
			title="Diff Viewer"
			description="Side-by-side comparison with line numbers and change indicators"
		>
			<Tabs defaultValue="line" className="w-full">
				<div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<TabsList className="grid w-full grid-cols-2 sm:w-auto">
						<TabsTrigger value="line" className="flex items-center gap-2">
							<Code className="h-4 w-4" />
							Line Analysis
						</TabsTrigger>
						<TabsTrigger value="word" className="flex items-center gap-2">
							<FileText className="h-4 w-4" />
							Word Analysis
						</TabsTrigger>
					</TabsList>

					<div className="flex flex-wrap gap-2">
						<Badge variant="outline" className="text-foreground border-border bg-muted/30">
							+{addedLines} added
						</Badge>
						<Badge variant="outline" className="text-muted-foreground border-muted bg-muted/20">
							-{removedLines} removed
						</Badge>
						<Badge variant="outline" className="text-muted-foreground border-muted bg-muted/10">
							{unchangedLines} unchanged
						</Badge>
					</div>
				</div>

				<TabsContent value="line" className="mt-4">
					<DiffLineView diffLines={diffLines} />
				</TabsContent>

				<TabsContent value="word" className="mt-4">
					<DiffWordView wordDiff={wordDiff} />
				</TabsContent>
			</Tabs>
		</ToolSection>
	);
}
