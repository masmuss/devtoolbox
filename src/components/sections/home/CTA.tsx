import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { siteConfig } from "@/lib/data/constants";

export function CTA() {
	return (
		<section className="bg-neutral-800 py-16 dark:bg-neutral-900">
			<div className="container mx-auto px-4 text-center">
				<h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
					Ready to Boost Your Productivity?
				</h2>
				<p className="mx-auto mb-8 max-w-2xl text-xl text-neutral-300 dark:text-neutral-400">
					Join thousands of developers using our free, open source toolbox. No registration
					required.
				</p>
				<div className="flex flex-col justify-center gap-4 sm:flex-row">
					<Button size="lg" variant="secondary" asChild>
						<a href="/tools">
							Start Using Tools
							<ArrowRight className="ml-2 h-5 w-5" />
						</a>
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="border-0 bg-transparent text-neutral-300 hover:bg-transparent hover:text-neutral-100 dark:bg-transparent dark:hover:bg-transparent"
						asChild
					>
						<a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
							Contribute on GitHub
						</a>
					</Button>
				</div>
			</div>
		</section>
	);
}
