import { CategoryFilter } from "@/components/category-filter";
import { ToolCard } from "@/components/tool-card";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/data/categories";
import { allTools } from "@/lib/data/tools";
import { getToolsByCategory } from "@/lib/utils/tools-counter";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

export function ToolsGrid() {
	const [activeCategory, setActiveCategory] = useState<string>("All");

	const filteredTools = useMemo(() => {
		let filtered = allTools;

		if (activeCategory !== "All") {
			filtered = filtered.filter((tool) => tool.category === activeCategory);
		}

		return filtered;
	}, [activeCategory]);

	const categoryOptions = ["All", ...categories];

	return (
		<section className="container mx-auto px-4 pb-16">
			{/* Category Filter */}
			<CategoryFilter
				categories={categoryOptions}
				onCategoryChange={setActiveCategory}
				activeCategory={activeCategory}
				showCount
				totalCount={allTools.length}
			/>

			{/* Tools Grid */}
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{filteredTools.map((tool) => (
					<ToolCard key={tool.title} tool={tool} />
				))}
			</div>

			{/* Load More Button */}
			<div className="mt-12 text-center">
				<p className="mb-4 text-neutral-600 dark:text-neutral-300">
					Showing all {getToolsByCategory(activeCategory).length} tools
				</p>
				<Button variant="outline" size="lg">
					Request a New Tool
					<ArrowRight className="ml-2 h-5 w-5" />
				</Button>
			</div>
		</section>
	);
}
