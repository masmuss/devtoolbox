import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export function ConversionGuide() {
	return (
		<Card className="border-neutral-200 dark:border-neutral-800">
			<CardHeader>
				<div className="flex items-center gap-3">
					<div className="rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
						<BookOpen className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
					</div>
					<div>
						<CardTitle className="text-lg">Case Conversion Guide</CardTitle>
						<CardDescription>Common use cases for different text formats</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid gap-6 text-sm md:grid-cols-2">
					<div className="space-y-4">
						<div>
							<h4 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100">
								Programming Conventions
							</h4>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="font-mono text-purple-600 dark:text-purple-400">camelCase</span>
									<span className="text-neutral-500 dark:text-neutral-400">
										Variables, functions
									</span>
								</div>
								<div className="flex justify-between">
									<span className="font-mono text-purple-600 dark:text-purple-400">PascalCase</span>
									<span className="text-neutral-500 dark:text-neutral-400">
										Classes, components
									</span>
								</div>
								<div className="flex justify-between">
									<span className="font-mono text-purple-600 dark:text-purple-400">snake_case</span>
									<span className="text-neutral-500 dark:text-neutral-400">Python, databases</span>
								</div>
								<div className="flex justify-between">
									<span className="font-mono text-purple-600 dark:text-purple-400">kebab-case</span>
									<span className="text-neutral-500 dark:text-neutral-400">CSS, URLs</span>
								</div>
								<div className="flex justify-between">
									<span className="font-mono text-purple-600 dark:text-purple-400">
										CONSTANT_CASE
									</span>
									<span className="text-neutral-500 dark:text-neutral-400">
										Constants, env vars
									</span>
								</div>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<div>
							<h4 className="mb-2 font-semibold text-neutral-900 dark:text-neutral-100">
								Text Formatting
							</h4>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="font-mono text-green-600 dark:text-green-400">Title Case</span>
									<span className="text-neutral-500 dark:text-neutral-400">Headlines, titles</span>
								</div>
								<div className="flex justify-between">
									<span className="font-mono text-green-600 dark:text-green-400">
										Sentence case
									</span>
									<span className="text-neutral-500 dark:text-neutral-400">Regular text</span>
								</div>
								<div className="flex justify-between">
									<span className="font-mono text-green-600 dark:text-green-400">UPPERCASE</span>
									<span className="text-neutral-500 dark:text-neutral-400">Emphasis, acronyms</span>
								</div>
								<div className="flex justify-between">
									<span className="font-mono text-green-600 dark:text-green-400">lowercase</span>
									<span className="text-neutral-500 dark:text-neutral-400">Casual text, tags</span>
								</div>
								<div className="flex justify-between">
									<span className="font-mono text-green-600 dark:text-green-400">dot.case</span>
									<span className="text-neutral-500 dark:text-neutral-400">Namespaces, files</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
