import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import type { Tool } from "@/lib/data/tools";

interface ToolCardProps {
	tool: Tool;
	showComingSoon?: boolean;
}

export function ToolCard({ tool, showComingSoon = false }: ToolCardProps) {
	const IconComponent = tool.icon;
	const isComingSoon = !tool.href && showComingSoon;

	const cardContent = (
		<Card
			className={`group h-full cursor-pointer border-neutral-200 bg-white transition-all duration-200 hover:border-neutral-400 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-500 ${isComingSoon ? "opacity-60" : ""}`}
		>
			<CardHeader className="pb-4">
				<div className="mb-3 flex items-start justify-between">
					<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100 transition-colors group-hover:bg-neutral-200 dark:bg-neutral-700 dark:group-hover:bg-neutral-600">
						<IconComponent className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
					</div>
					{tool.popular && (
						<Badge
							variant="secondary"
							className="bg-neutral-100 text-xs text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200"
						>
							Popular
						</Badge>
					)}
				</div>
				<CardTitle className="text-lg leading-tight transition-colors group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
					{tool.title}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-1 flex-col justify-between pt-0">
				<CardDescription className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
					{tool.description}
				</CardDescription>
				<div className="flex items-center justify-between">
					<Badge
						variant="outline"
						className="border-neutral-300 text-xs text-neutral-700 dark:border-neutral-600 dark:text-neutral-300"
					>
						{tool.category}
					</Badge>
					{isComingSoon ? (
						<Badge variant="secondary" className="text-xs">
							Coming Soon
						</Badge>
					) : (
						<ArrowRight className="h-4 w-4 text-neutral-400 transition-all group-hover:translate-x-1 group-hover:text-neutral-700 dark:text-neutral-500 dark:group-hover:text-neutral-300" />
					)}
				</div>
			</CardContent>
		</Card>
	);

	if (tool.href && !isComingSoon) {
		return (
			<a href={tool.href} className="block h-full">
				{cardContent}
			</a>
		);
	}

	return cardContent;
}
