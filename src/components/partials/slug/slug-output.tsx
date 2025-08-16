import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/copy-button";

interface SlugOutputProps {
	output: string;
}

export function SlugOutput({ output }: SlugOutputProps) {
	return (
		<Card className="border-neutral-200 dark:border-neutral-800">
			<CardHeader>
				<CardTitle className="text-black dark:text-white">Generated Slug</CardTitle>
				<CardDescription className="text-neutral-600 dark:text-neutral-400">
					Your URL-friendly slug will appear here automatically
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="relative">
					<Input
						value={output}
						readOnly
						placeholder="Your slug will appear here..."
						className="border-neutral-200 bg-neutral-50 pr-12 font-mono text-sm dark:border-neutral-800 dark:bg-neutral-900"
					/>
					{output && (
						<CopyButton
							text={output}
							className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 p-0"
						/>
					)}
				</div>

				{output && (
					<div className="rounded-lg bg-neutral-50 p-3 dark:bg-neutral-900">
						<Label className="text-sm text-neutral-600 dark:text-neutral-400">Preview URL:</Label>
						<p className="font-mono text-sm break-all text-neutral-800 dark:text-neutral-200">
							https://example.com/blog/{output}
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
