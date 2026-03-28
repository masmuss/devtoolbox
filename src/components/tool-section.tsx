import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils.ts";

interface ToolSectionProps {
	title: string;
	description?: string;
	icon?: LucideIcon;
	className?: string;
	children: ReactNode;
}

export default function ToolSection({
	title,
	description,
	icon: Icon,
	className = "",
	children,
}: ToolSectionProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					{Icon && <Icon className="h-5 w-5" />}
					{title}
				</CardTitle>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent className={cn("space-y-4", className)}>{children}</CardContent>
		</Card>
	);
}
