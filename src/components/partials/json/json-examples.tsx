import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { getJsonExamples } from "@/lib/utils/json-formatter";
import ToolSection from "@/components/tool-section";
import { Input } from "@/components/ui/input";

interface JsonExamplesProps {
	onLoadExample: (json: string) => void;
}

export function JsonExamples({ onLoadExample }: JsonExamplesProps) {
	const examples = getJsonExamples();

	return (
		<ToolSection
			icon={BookOpen}
			title="JSON Examples"
			description="Load sample JSON data to test the formatter"
		>
			<div className="space-y-3">
				{examples.map((example, index) => (
					<div key={index} className="hover:bg-muted/50 rounded-lg border p-3 transition-colors">
						<div className="mb-2 flex items-center justify-between">
							<h4 className="text-sm font-medium">{example.name}</h4>
							<Button onClick={() => onLoadExample(example.json)} variant="outline" size="sm">
								Load
							</Button>
						</div>
						<p className="text-muted-foreground mb-2 text-xs">{example.description}</p>
						<Input
							value={
								example.json.length > 100 ? example.json.substring(0, 100) + "..." : example.json
							}
							className="bg-muted/50 overflow-x-scroll rounded p-2 font-mono text-xs"
						/>
					</div>
				))}
			</div>
		</ToolSection>
	);
}
