import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PresetType } from "./text-configuration";

interface QuickPresetsProps {
	onPresetSelect: (type: PresetType, count: string, startWithLorem: boolean) => void;
}

export function QuickPresets({ onPresetSelect }: QuickPresetsProps) {
	const presets = [
		{ label: "50 Words", type: "words", count: "50" },
		{ label: "5 Sentences", type: "sentences", count: "5" },
		{ label: "3 Paragraphs", type: "paragraphs", count: "3" },
		{ label: "5 Paragraphs", type: "paragraphs", count: "5" },
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Quick Presets</CardTitle>
				<CardDescription>Common Lorem Ipsum configurations</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-2">
					{presets.map((preset) => (
						<Button
							key={preset.label}
							variant="outline"
							size="sm"
							onClick={() => onPresetSelect(preset.type as PresetType, preset.count, true)}
						>
							{preset.label}
						</Button>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
