import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "@/components/copy-button";

interface CaseResultsProps {
	results: Record<string, string>;
}

const caseTypes = [
	{
		key: "lowercase",
		name: "lowercase",
		description: "all characters in lowercase",
		category: "Basic",
	},
	{
		key: "uppercase",
		name: "UPPERCASE",
		description: "all characters in uppercase",
		category: "Basic",
	},
	{
		key: "titleCase",
		name: "Title Case",
		description: "first letter of each word capitalized",
		category: "Text",
	},
	{
		key: "sentenceCase",
		name: "Sentence case",
		description: "first letter capitalized, rest lowercase",
		category: "Text",
	},
	{
		key: "camelCase",
		name: "camelCase",
		description: "first word lowercase, subsequent words capitalized",
		category: "Programming",
	},
	{
		key: "pascalCase",
		name: "PascalCase",
		description: "first letter of each word capitalized, no spaces",
		category: "Programming",
	},
	{
		key: "snakeCase",
		name: "snake_case",
		description: "words separated by underscores",
		category: "Programming",
	},
	{
		key: "kebabCase",
		name: "kebab-case",
		description: "words separated by hyphens",
		category: "Programming",
	},
	{
		key: "constantCase",
		name: "CONSTANT_CASE",
		description: "uppercase words separated by underscores",
		category: "Programming",
	},
	{
		key: "dotCase",
		name: "dot.case",
		description: "words separated by dots",
		category: "Special",
	},
	{
		key: "pathCase",
		name: "path/case",
		description: "words separated by forward slashes",
		category: "Special",
	},
	{
		key: "alternatingCase",
		name: "aLtErNaTiNg CaSe",
		description: "alternating uppercase and lowercase characters",
		category: "Special",
	},
];

const categoryColors = {
	Basic: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
	Text: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
	Programming: "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
	Special: "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
};

export function CaseResults({ results }: CaseResultsProps) {
	const groupedCases = caseTypes.reduce(
		(acc, caseType) => {
			if (!acc[caseType.category]) {
				acc[caseType.category] = [];
			}
			acc[caseType.category].push(caseType);
			return acc;
		},
		{} as Record<string, typeof caseTypes>,
	);

	return (
		<div className="space-y-6">
			{Object.entries(groupedCases).map(([category, cases]) => (
				<div key={category}>
					<div className="mb-3 flex items-center gap-2">
						<span
							className={`rounded-full px-2 py-1 text-xs font-medium ${categoryColors[category as keyof typeof categoryColors]}`}
						>
							{category}
						</span>
						<div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-600" />
					</div>

					<div className="grid gap-3">
						{cases.map((caseType) => (
							<Card key={caseType.key} className="border-neutral-200 dark:border-neutral-800">
								<CardHeader>
									<div className="flex items-center justify-between">
										<div>
											<CardTitle className="font-mono text-base">{caseType.name}</CardTitle>
											<CardDescription className="text-xs">{caseType.description}</CardDescription>
										</div>
										{results[caseType.key] && <CopyButton text={results[caseType.key]} size="sm" />}
									</div>
								</CardHeader>
								<CardContent className="pt-0">
									<div className="flex min-h-[44px] items-center rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900">
										<code className="font-mono text-sm break-all text-neutral-900 dark:text-neutral-100">
											{results[caseType.key] || (
												<span className="text-neutral-400 italic dark:text-neutral-500">
													Result will appear here...
												</span>
											)}
										</code>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
