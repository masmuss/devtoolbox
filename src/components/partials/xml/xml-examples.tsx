import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { getXmlExamples } from "@/lib/utils/xml-formatter";
import ToolSection from "@/components/tool-section";
import { Input } from "@/components/ui/input";

interface XmlExamplesProps {
	onLoadExample: (xml: string) => void;
}

export function XmlExamples({ onLoadExample }: XmlExamplesProps) {
	const examples = getXmlExamples();

	return (
		<ToolSection
			icon={BookOpen}
			title="XML Examples"
			description="Load sample XML data to test the formatter"
		>
			<div className="space-y-3">
				{examples.map((example, index) => (
					<div key={index} className="hover:bg-muted/50 rounded-lg border p-3 transition-colors">
						<div className="mb-2 flex items-center justify-between">
							<h4 className="text-sm font-medium">{example.name}</h4>
							<Button onClick={() => onLoadExample(example.xml)} variant="outline" size="sm">
								Load
							</Button>
						</div>
						<p className="text-muted-foreground mb-2 text-xs">{example.description}</p>
						<Input
							value={example.xml.length > 100 ? example.xml.substring(0, 100) + "..." : example.xml}
							className="bg-muted/50 overflow-x-scroll rounded p-2 font-mono text-xs"
						/>
					</div>
				))}
			</div>
		</ToolSection>
	);
}
