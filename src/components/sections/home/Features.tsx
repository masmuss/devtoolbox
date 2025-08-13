import { Code, Shield, Zap } from "lucide-react";
import { siteConfig } from "@/lib/data/constants";

export default function Features() {
	return (
		<section className="bg-white dark:bg-neutral-800 py-16">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
						Why Choose {siteConfig.name}?
					</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					<div className="text-center">
						<div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
							<Zap className="w-8 h-8 text-neutral-700 dark:text-neutral-300" />
						</div>
						<h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Lightning Fast</h3>
						<p className="text-neutral-600 dark:text-neutral-300">
							All tools run instantly in your browser. No waiting, no loading screens.
						</p>
					</div>
					<div className="text-center">
						<div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
							<Shield className="w-8 h-8 text-neutral-700 dark:text-neutral-300" />
						</div>
						<h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Privacy First</h3>
						<p className="text-neutral-600 dark:text-neutral-300">
							Your data never leaves your browser. Everything is processed locally.
						</p>
					</div>
					<div className="text-center">
						<div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
							<Code className="w-8 h-8 text-neutral-700 dark:text-neutral-300" />
						</div>
						<h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Free & Open Source</h3>
						<p className="text-neutral-600 dark:text-neutral-300">
							Completely free to use. Open source code you can trust and contribute to.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
