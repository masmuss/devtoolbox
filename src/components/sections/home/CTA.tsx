import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { siteConfig } from "@/lib/data/constants";

export default function CTA() {
	return (
		<section className="bg-neutral-900 py-16 dark:bg-neutral-950">
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
					<Button variant="default" size="lg" asChild>
						<a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
							Contribute on GitHub
						</a>
					</Button>
				</div>
			</div>
		</section>
	);
}
