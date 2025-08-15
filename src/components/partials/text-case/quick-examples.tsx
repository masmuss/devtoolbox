import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

interface QuickExamplesProps {
	onExampleClick: (example: string) => void;
}

const examples = [
	{ text: "Hello World", category: "Basic" },
	{ text: "the quick brown fox", category: "Sentence" },
	{ text: "JavaScript Programming", category: "Programming" },
	{ text: "user_name_field", category: "Database" },
	{ text: "API-RESPONSE-DATA", category: "API" },
	{ text: "myVariableName", category: "Variable" },
];

export function QuickExamples({ onExampleClick }: QuickExamplesProps) {
	return (
		<Card className="border-neutral-200 dark:border-neutral-800">
			<CardHeader className="pb-4">
				<div className="flex items-center gap-3">
					<div className="rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
						<Lightbulb className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
					</div>
					<div>
						<CardTitle className="text-lg">Quick Examples</CardTitle>
						<CardDescription>Click to try these examples</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 gap-2">
					{examples.map((example) => (
						<Button
							key={example.text}
							variant="outline"
							size="sm"
							className="h-auto justify-start bg-transparent p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800"
							onClick={() => onExampleClick(example.text)}
						>
							<div className="text-left">
								<div className="font-mono text-sm">{example.text}</div>
								<div className="text-xs text-neutral-500 dark:text-neutral-400">
									{example.category}
								</div>
							</div>
						</Button>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
