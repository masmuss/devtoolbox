import { Code, Shield, Zap } from "lucide-react";
import { siteConfig } from "@/lib/data/constants";

export function Features() {
	return (
		<section className="bg-white py-16 dark:bg-neutral-800">
			<div className="container mx-auto px-4">
				<div className="mb-12 text-center">
					<h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl dark:text-neutral-100">
						Why Choose {siteConfig.name}?
					</h2>
				</div>
				<div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
					<div className="text-center">
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-700">
							<Zap className="h-8 w-8 text-neutral-700 dark:text-neutral-300" />
						</div>
						<h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
							Lightning Fast
						</h3>
						<p className="text-neutral-600 dark:text-neutral-300">
							All tools run instantly in your browser. No waiting, no loading screens.
						</p>
					</div>
					<div className="text-center">
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-700">
							<Shield className="h-8 w-8 text-neutral-700 dark:text-neutral-300" />
						</div>
						<h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
							Privacy First
						</h3>
						<p className="text-neutral-600 dark:text-neutral-300">
							Your data never leaves your browser. Everything is processed locally.
						</p>
					</div>
					<div className="text-center">
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-700">
							<Code className="h-8 w-8 text-neutral-700 dark:text-neutral-300" />
						</div>
						<h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
							Free & Open Source
						</h3>
						<p className="text-neutral-600 dark:text-neutral-300">
							Completely free to use. Open source code you can trust and contribute to.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
