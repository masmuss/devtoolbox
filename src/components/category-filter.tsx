import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CategoryFilterProps {
	categories: string[];
	activeCategory?: string;
	onCategoryChange?: (category: string) => void;
	showCount?: boolean;
	totalCount?: number;
}

export function CategoryFilter({
	categories,
	activeCategory = "All",
	onCategoryChange,
	showCount = false,
	totalCount = 0,
}: CategoryFilterProps) {
	return (
		<div className="mb-12 flex flex-wrap justify-center gap-2">
			{categories.map((category) => (
				<Button
					key={category}
					variant={category === activeCategory ? "default" : "outline"}
					size="sm"
					className={`rounded-full ${
						category === activeCategory
							? "bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
							: "border-neutral-300 hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800"
					}`}
					onClick={() => onCategoryChange?.(category)}
				>
					{category}
					{category === "All" && showCount && <Badge variant="secondary">{totalCount}</Badge>}
				</Button>
			))}
		</div>
	);
}
