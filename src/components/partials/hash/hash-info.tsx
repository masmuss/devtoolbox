import { ToolGuide } from "@/components/tool-guide";

export function HashInfo() {
	return (
		<ToolGuide
			title="Hash Algorithm Information"
			description="Learn about different hash algorithms and their security levels"
		>
			<div className="grid gap-4 md:grid-cols-2">
				<div>
					<h3 className="mb-2 font-semibold text-black dark:text-white">Secure Algorithms</h3>
					<ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
						<li>
							• <strong>SHA-256:</strong> Most commonly used, very secure
						</li>
						<li>
							• <strong>SHA-384:</strong> Higher security, larger output
						</li>
						<li>
							• <strong>SHA-512:</strong> Highest security, largest output
						</li>
					</ul>
				</div>
				<div>
					<h3 className="mb-2 font-semibold text-black dark:text-white">Legacy Algorithms</h3>
					<ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
						<li>
							• <strong>SHA-1:</strong> Deprecated for security applications
						</li>
					</ul>
				</div>
			</div>
			<div className="mt-4 rounded-lg bg-neutral-50 p-4 dark:bg-neutral-900">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					<strong>Note:</strong> For password hashing, use specialized algorithms like bcrypt,
					scrypt, or Argon2 instead of these general-purpose hash functions.
				</p>
			</div>
		</ToolGuide>
	);
}
