import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
	label: string;
	value: number;
	icon: LucideIcon;
	description: string;
	variant?: "default" | "destructive" | "muted";
}

export function StatCard({
	label,
	value,
	icon: Icon,
	description,
	variant = "default",
}: StatCardProps) {
	const getVariantStyles = () => {
		switch (variant) {
			case "destructive":
				return {
					color: "text-destructive",
					bgColor: "bg-muted/50",
					borderColor: "border-border",
				};
			case "muted":
				return {
					color: "text-foreground",
					bgColor: "bg-muted/40",
					borderColor: "border-border",
				};
			default:
				return {
					color: "text-foreground",
					bgColor: "bg-muted/50",
					borderColor: "border-border",
				};
		}
	};

	const styles = getVariantStyles();

	return (
		<Card
			className={`transition-all duration-200 hover:shadow-md ${styles.bgColor} ${styles.borderColor} border-2`}
		>
			<CardHeader className="flex items-center justify-between">
				<Icon className={`h-6 w-6 ${styles.color}`} />
				<div className={`text-3xl font-bold ${styles.color}`}>{value}</div>
			</CardHeader>
			<CardContent className="text-sm font-medium">{label}</CardContent>
			<CardFooter className="text-muted-foreground text-xs">{description}</CardFooter>
		</Card>
	);
}
