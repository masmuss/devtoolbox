import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { siteConfig } from "@/lib/data/constants";
import { popularTools } from "@/lib/data/tools";
import CategoryFilter from "@/components/category-filter";
import ToolCard from "@/components/tool-card";
import { categories } from "@/lib/data/categories";

export default function Tools() {
	return (
		<section className="container mx-auto px-4 py-16">
			<div className="mb-12 text-center">
				<h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl dark:text-neutral-100">
					Popular Developer Tools
				</h2>
				<p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
					Hand-picked tools that developers use daily. Fast, reliable, and always available.
				</p>
			</div>

			<CategoryFilter categories={categories} />

			{/* Tools Grid */}
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{popularTools.map((tool) => (
					<ToolCard key={tool.title} tool={tool} />
				))}
			</div>

			<div className="mt-12 text-center">
				<Button variant="outline" size="lg" asChild>
					<a href="/tools">
						View All {siteConfig.totalTools}+ Tools
						<ArrowRight className="ml-2 h-5 w-5" />
					</a>
				</Button>
			</div>
		</section>
	);
}

function CategoryButton({ category }: { category: string }) {
	return (
		<Button
			variant={category === "All" ? "default" : "outline"}
			size="sm"
			className={`rounded-full ${
				category === "All"
					? "bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
					: "border-neutral-300 hover:bg-neutral-50 dark:border-neutral-600 dark:hover:bg-neutral-800"
			}`}
		>
			{category}
		</Button>
	);
}
