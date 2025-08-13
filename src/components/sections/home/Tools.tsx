import {
	ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.tsx";
import { popularTools } from "@/lib/data/tools";
import { siteConfig } from "@/lib/data/constants";

export default function Tools() {
	const categories = ["All", "Security", "Text", "Design", "Encoding", "Time", "Utilities"];

	return (
		<section className="container mx-auto px-4 py-16">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
					Popular Developer Tools
				</h2>
				<p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
					Hand-picked tools that developers use daily. Fast, reliable, and always available.
				</p>
			</div>

			{/* Category Filter */}
			<div className="flex flex-wrap justify-center gap-2 mb-12">
				{categories.map((category) => (
					<Button
						key={category}
						variant={category === "All" ? "default" : "outline"}
						size="sm"
						className={`rounded-full ${category === "All"
							? "bg-black hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 dark:text-black"
							: "border-neutral-300 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800"
							}`}
					>
						{category}
					</Button>
				))}
			</div>

			{/* Tools Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
				{popularTools.map((tool) => {
					const IconComponent = tool.icon
					return (
						<a key={tool.title} href={tool.href} className="block">
							<Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 bg-white dark:bg-neutral-800 h-full">
								<CardHeader className="pb-4">
									<div className="flex items-start justify-between">
										<div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center group-hover:bg-neutral-200 dark:group-hover:bg-neutral-600 transition-colors">
											<IconComponent className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
										</div>
										{tool.popular && (
											<Badge
												variant="secondary"
												className="text-xs bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
											>
												Popular
											</Badge>
										)}
									</div>
									<CardTitle className="text-lg group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors dark:text-neutral-100">
										{tool.title}
									</CardTitle>
								</CardHeader>
								<CardContent className="pt-0">
									<CardDescription className="text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed">
										{tool.description}
									</CardDescription>
									<div className="flex items-center justify-between">
										<Badge
											variant="outline"
											className="text-xs border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300"
										>
											{tool.category}
										</Badge>
										<ArrowRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 group-hover:translate-x-1 transition-all" />
									</div>
								</CardContent>
							</Card>
						</a>
					)
				})}
			</div>

			<div className="text-center mt-12">
				<Button
					variant="outline"
					size="lg"
					asChild
				>
					<a href="/tools">
						View All {siteConfig.totalTools}+ Tools
						<ArrowRight className="ml-2 w-5 h-5" />
					</a>
				</Button>
			</div>
		</section>
	);
}
