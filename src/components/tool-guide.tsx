import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ToolGuideProps {
	title: string;
	description?: string;
	children: React.ReactNode;
}

export function ToolGuide({ title, description, children }: ToolGuideProps) {
	return (
		<Card className="mt-8 border-neutral-200 dark:border-neutral-800">
			<CardHeader>
				<CardTitle className="text-black dark:text-white">{title}</CardTitle>
				{description && (
					<CardDescription className="text-neutral-600 dark:text-neutral-400">
						{description}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent className="space-y-4 text-sm">{children}</CardContent>
		</Card>
	);
}
