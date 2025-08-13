import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.tsx";
import { siteConfig } from "@/lib/data/constants";
import { popularTools } from "@/lib/data/tools";

export default function Tools() {
	const categories = ["All", "Security", "Text", "Design", "Encoding", "Time", "Utilities"];

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

			{/* Category Filter */}
			<div className="mb-12 flex flex-wrap justify-center gap-2">
				{categories.map((category) => (
					<Button
						key={category}
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
				))}
			</div>

			{/* Tools Grid */}
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{popularTools.map((tool) => {
					const IconComponent = tool.icon;
					return (
						<a key={tool.title} href={tool.href} className="block">
							<Card className="group h-full cursor-pointer border-neutral-200 bg-white transition-all duration-200 hover:border-neutral-400 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-500">
								<CardHeader className="pb-4">
									<div className="flex items-start justify-between">
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
									<CardTitle className="text-lg transition-colors group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
										{tool.title}
									</CardTitle>
								</CardHeader>
								<CardContent className="pt-0">
									<CardDescription className="mb-4 leading-relaxed text-neutral-600 dark:text-neutral-300">
										{tool.description}
									</CardDescription>
									<div className="flex items-center justify-between">
										<Badge
											variant="outline"
											className="border-neutral-300 text-xs text-neutral-700 dark:border-neutral-600 dark:text-neutral-300"
										>
											{tool.category}
										</Badge>
										<ArrowRight className="h-4 w-4 text-neutral-400 transition-all group-hover:translate-x-1 group-hover:text-neutral-700 dark:text-neutral-500 dark:group-hover:text-neutral-300" />
									</div>
								</CardContent>
							</Card>
						</a>
					);
				})}
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
