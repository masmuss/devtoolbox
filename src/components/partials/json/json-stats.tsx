import { BarChart3 } from "lucide-react";
import type { JsonFormatResult } from "@/lib/utils/json-formatter";
import ToolSection from "@/components/tool-section";

interface JsonStatsProps {
	stats: JsonFormatResult["stats"];
	isValid: boolean;
}

export function JsonStats({ stats, isValid }: JsonStatsProps) {
	if (!isValid) return null;

	const formatBytes = (bytes: number) => {
		if (bytes === 0) return "0 B";
		const k = 1024;
		const sizes = ["B", "KB", "MB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
	};

	return (
		<ToolSection
			icon={BarChart3}
			title="JSON Analysis"
			description="Detailed statistics about your JSON structure"
		>
			<div className="grid gap-4 sm:grid-cols-2">
				<div className="space-y-3">
					<div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
						<span className="text-xs font-medium">Original Size</span>
						<span className="font-mono text-xs">{formatBytes(stats.originalSize)}</span>
					</div>

					<div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
						<span className="text-xs font-medium">Formatted Size</span>
						<span className="font-mono text-xs">{formatBytes(stats.formattedSize)}</span>
					</div>

					<div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
						<span className="text-xs font-medium">Minified Size</span>
						<span className="font-mono text-xs">{formatBytes(stats.minifiedSize)}</span>
					</div>

					<div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
						<span className="text-xs font-medium">Compression</span>
						<span className="font-mono text-xs">{stats.compressionRatio}%</span>
					</div>
				</div>

				<div className="space-y-3">
					<div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
						<span className="text-xs font-medium">Nesting Depth</span>
						<span className="font-mono text-xs">{stats.depth}</span>
					</div>

					<div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
						<span className="text-xs font-medium">Total Keys</span>
						<span className="font-mono text-xs">{stats.keys}</span>
					</div>

					<div className="bg-muted/50 flex items-center justify-between rounded-lg p-3">
						<span className="text-xs font-medium">Total Values</span>
						<span className="font-mono text-xs">{stats.values}</span>
					</div>

					<div className="bg-muted/50 rounded-lg p-3">
						<div className="mb-2 text-xs font-medium">Compression Ratio</div>
						<div className="bg-muted h-2 w-full rounded-full">
							<div
								className="bg-foreground h-2 rounded-full transition-all duration-300"
								style={{ width: `${Math.min(stats.compressionRatio, 100)}%` }}
							/>
						</div>
					</div>
				</div>
			</div>
		</ToolSection>
	);
}
