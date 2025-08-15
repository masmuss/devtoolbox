"use client";

import ToolSection from "@/components/tool-section";
import { Button } from "@/components/ui/button";
import { urlExamples } from "@/lib/utils/url-encoder";
import { FileText } from "lucide-react";

interface URLExamplesProps {
	onSelectExample: (example: string) => void;
}

export function URLExamples({ onSelectExample }: URLExamplesProps) {
	return (
		<ToolSection icon={FileText} title="Example URLs" description="Click any example to try it out">
			<div className="space-y-4">
				{urlExamples.map((category) => (
					<div key={category.category} className="space-y-2">
						<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
							{category.category}
						</h4>
						<div className="grid gap-2">
							{category.examples.map((example) => (
								<Button
									key={example}
									variant="outline"
									size="sm"
									onClick={() => onSelectExample(example)}
									className="h-auto justify-start border-gray-200 p-3 text-left hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
								>
									<span className="truncate font-mono text-xs">{example}</span>
								</Button>
							))}
						</div>
					</div>
				))}
			</div>
		</ToolSection>
	);
}
