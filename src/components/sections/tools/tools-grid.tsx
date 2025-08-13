import CategoryFilter from "@/components/category-filter";
import ToolCard from "@/components/tool-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/lib/data/categories";
import { allTools } from "@/lib/data/tools";
import { ArrowRight } from "lucide-react";

export default function ToolsGrid() {
	return (
		<section className="container mx-auto px-4 pb-16">
			{/* Category Filter */}
			<CategoryFilter categories={categories} showCount totalCount={allTools.length} />

			{/* Tools Grid */}
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{allTools.map((tool) => (
					<ToolCard key={tool.title} tool={tool} />
				))}
				<Card className="group h-full cursor-pointer border-neutral-200 bg-white opacity-60 transition-all duration-200 hover:border-neutral-400 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-500">
					<CardContent className="flex flex-1 flex-col justify-between pt-0">
						Coming Soon...
					</CardContent>
				</Card>
			</div>

			{/* Load More Button */}
			<div className="mt-12 text-center">
				<p className="mb-4 text-neutral-600 dark:text-neutral-300">
					Showing all {allTools.length} tools
				</p>
				<Button
					variant="outline"
					size="lg"
					className="border-neutral-300 bg-transparent hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800"
				>
					Request a New Tool
					<ArrowRight className="ml-2 h-5 w-5" />
				</Button>
			</div>
		</section>
	);
}
