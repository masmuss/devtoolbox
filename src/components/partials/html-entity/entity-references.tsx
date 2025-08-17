import { CopyButton } from "@/components/copy-button";
import { BookOpen } from "lucide-react";
import { getCommonEntities } from "@/lib/utils/html-entity-encoder";
import ToolSection from "@/components/tool-section";

export function EntityReference() {
	const entities = getCommonEntities();

	return (
		<ToolSection
			icon={BookOpen}
			title="Common HTML Entities"
			description="Reference guide for frequently used HTML entities"
		>
			<div className="grid gap-3">
				{entities.map((entity, index) => (
					<div
						key={index}
						className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-3 transition-colors"
					>
						<div className="flex items-center gap-4">
							<div className="bg-muted flex h-8 w-8 items-center justify-center rounded font-mono text-lg">
								{entity.char}
							</div>
							<div>
								<div className="font-mono text-sm">{entity.entity}</div>
								<div className="text-muted-foreground text-xs">{entity.description}</div>
							</div>
						</div>
						<div className="flex gap-1">
							<CopyButton text={entity.char} size="sm" />
							<CopyButton text={entity.entity} size="sm" />
						</div>
					</div>
				))}
			</div>
		</ToolSection>
	);
}
