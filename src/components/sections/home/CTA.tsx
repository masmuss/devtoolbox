import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { siteConfig } from "@/lib/data/constants";

export default function CTA() {
	return (
		<section className="bg-neutral-900 dark:bg-neutral-950 py-16">
			<div className="container mx-auto px-4 text-center">
				<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Boost Your Productivity?</h2>
				<p className="text-xl text-neutral-300 dark:text-neutral-400 mb-8 max-w-2xl mx-auto">
					Join thousands of developers using our free, open source toolbox. No registration required.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Button size="lg" variant="secondary" asChild>
						<a href="/tools">
							Start Using Tools
							<ArrowRight className="ml-2 w-5 h-5" />
						</a>
					</Button>
					<Button
						variant="default"
						size="lg"
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
