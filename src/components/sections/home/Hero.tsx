import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { siteConfig } from "@/lib/data/constants";

export function Hero() {
	return (
		<section className="container mx-auto px-4 py-16 text-center md:py-24">
			<div className="mx-auto max-w-4xl">
				<Badge variant="secondary" className="mb-4">
					Free & Open Source
				</Badge>
				<h1 className="mb-6 text-4xl leading-tight font-bold text-neutral-900 md:text-6xl dark:text-neutral-100">
					Every Developer Tool
					<span className="text-neutral-700 dark:text-neutral-300"> You Need</span>
				</h1>
				<p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-neutral-600 dark:text-neutral-300">
					{siteConfig.description}
				</p>
				<div className="flex flex-col justify-center gap-4 sm:flex-row">
					<Button size="lg" asChild>
						<a href="/tools">
							Start Using Tools Free
							<ArrowRight className="ml-2 h-5 w-5" />
						</a>
					</Button>
					<Button variant="outline" size="lg" asChild>
						<a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
							View on GitHub
						</a>
					</Button>
				</div>
			</div>
		</section>
	);
}
