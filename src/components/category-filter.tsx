import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getToolsByCategory } from "@/lib/utils/tools-counter";
import { cn } from "@/lib/utils";

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
					className={cn(
						"rounded-full",
						"flex items-center justify-between gap-2",
						category === activeCategory
							? "bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
							: "border-neutral-300 hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800",
					)}
					onClick={() => onCategoryChange?.(category)}
				>
					<span>{category}</span>
					{showCount && (
						<span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-neutral-100 text-xs text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200">
							{category === "All" ? totalCount : getToolsByCategory(category).length}
						</span>
					)}
				</Button>
			))}
		</div>
	);
}
