import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/copy-button";
import { Clock } from "lucide-react";
import { CRON_PRESETS } from "@/lib/utils/cron-generator";
import ToolSection from "@/components/tool-section";

interface CronPresetsProps {
	onSelectPreset: (expression: string) => void;
}

export function CronPresets({ onSelectPreset }: CronPresetsProps) {
	return (
		<ToolSection
			icon={Clock}
			title="Common Cron Expressions"
			description="Ready-to-use cron expressions for common schedules"
		>
			<div className="grid gap-3">
				{CRON_PRESETS.map((preset, index) => (
					<div key={index} className="bg-muted flex items-center justify-between rounded-lg p-3">
						<div className="flex-1">
							<div className="text-sm font-medium">{preset.name}</div>
							<div className="text-muted-foreground text-xs">{preset.description}</div>
							<div className="text-foreground mt-1 font-mono text-xs">{preset.expression}</div>
						</div>
						<div className="flex gap-2">
							<Button onClick={() => onSelectPreset(preset.expression)} variant="outline" size="sm">
								Use
							</Button>
							<CopyButton text={preset.expression} />
						</div>
					</div>
				))}
			</div>
		</ToolSection>
	);
}
