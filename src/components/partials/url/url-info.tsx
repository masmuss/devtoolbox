import { ToolGuide } from "@/components/tool-guide";

export function UrlInfo() {
	return (
		<ToolGuide
			title="URL Encoder/Decoder"
			description="This tool allows you to encode and decode URLs. Encoding converts special characters into a format that can be transmitted over the internet, while decoding reverses this process."
		>
			<div className="grid gap-6 md:grid-cols-2">
				<div>
					<h3 className="mb-3 font-semibold text-black dark:text-white">
						When to Use URL Encoding
					</h3>
					<ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
						<li>• Query parameters with special characters</li>
						<li>• Form data submission</li>
						<li>• API requests with complex parameters</li>
						<li>• Handling non-ASCII characters in URLs</li>
						<li>• Spaces and reserved characters in URLs</li>
					</ul>
				</div>
				<div>
					<h3 className="mb-3 font-semibold text-black dark:text-white">
						Common Encoded Characters
					</h3>
					<div className="space-y-1 font-mono text-sm text-neutral-600 dark:text-neutral-400">
						<div>Space → %20</div>
						<div>& → %26</div>
						<div>= → %3D</div>
						<div>? → %3F</div>
						<div># → %23</div>
						<div>+ → %2B</div>
					</div>
				</div>
			</div>
		</ToolGuide>
	);
}
