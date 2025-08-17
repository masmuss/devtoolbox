import { ToolGuide } from "@/components/tool-guide";

export function Base64Info() {
	return (
		<ToolGuide
			title="What is Base64?"
			description="Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format using 64 printable characters."
		>
			<div className="grid gap-4 md:grid-cols-2">
				<div>
					<strong>Common Uses:</strong>
					<ul className="mt-1 list-inside list-disc space-y-1">
						<li>Email attachments (MIME)</li>
						<li>Data URLs in web development</li>
						<li>API data transmission</li>
						<li>Configuration files</li>
						<li>Embedding images in CSS/HTML</li>
					</ul>
				</div>
				<div>
					<strong>Characteristics:</strong>
					<ul className="mt-1 list-inside list-disc space-y-1">
						<li>Uses A-Z, a-z, 0-9, +, / characters</li>
						<li>Padding with = characters</li>
						<li>~33% size increase from original</li>
						<li>Safe for text-based protocols</li>
						<li>Reversible encoding</li>
					</ul>
				</div>
			</div>
		</ToolGuide>
	);
}
