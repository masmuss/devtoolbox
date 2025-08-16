import { Card } from "@/components/ui/card";
import { SimilarityCard } from "./similarity-card";
import { StatCard } from "./stat-card";
import type { DiffStats } from "@/lib/utils/text-diff";
import { Plus, Minus, Edit } from "lucide-react";
import ToolSection from "@/components/tool-section";

interface DiffStatsProps {
	stats: DiffStats;
	similarity: number;
}

export function DiffStatsDisplay({ stats, similarity }: DiffStatsProps) {
	const statItems = [
		{
			label: "Additions",
			value: stats.additions,
			icon: Plus,
			description: "New lines added to the text",
			variant: "default" as const,
		},
		{
			label: "Deletions",
			value: stats.deletions,
			icon: Minus,
			description: "Lines removed from original",
			variant: "destructive" as const,
		},
		{
			label: "Modifications",
			value: stats.modifications,
			icon: Edit,
			description: "Lines with content changes",
			variant: "muted" as const,
		},
	];

	return (
		<ToolSection
			icon={Plus}
			title="Diff Analysis"
			description="Statistical breakdown of text differences and similarity metrics"
		>
			<div className="space-y-6">
				<SimilarityCard similarity={similarity} />

				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					{statItems.map((stat) => (
						<StatCard
							key={stat.label}
							label={stat.label}
							value={stat.value}
							icon={stat.icon}
							description={stat.description}
							variant={stat.variant}
						/>
					))}
				</div>

				<Card className="bg-muted/10 border-dashed p-4">
					<div className="text-muted-foreground text-sm">
						<strong>Analysis Method:</strong> Line-by-line comparison identifies additions,
						deletions, and modifications. Word-level diff highlights specific changes within lines
						for granular review.
					</div>
				</Card>
			</div>
		</ToolSection>
	);
}
