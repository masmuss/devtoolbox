import { ToolGuide } from "@/components/tool-guide";

export function JWTInfo() {
	return (
		<ToolGuide
			title="About JSON Web Tokens (JWT)"
			description="JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims between two parties."
		>
			<div>
				<strong>Structure:</strong>
				<ul className="mt-1 list-inside list-disc space-y-1">
					<li>
						<strong>Header:</strong> Contains algorithm and token type
					</li>
					<li>
						<strong>Payload:</strong> Contains claims and data
					</li>
					<li>
						<strong>Signature:</strong> Verifies token integrity
					</li>
				</ul>
			</div>
			<div>
				<strong>Common Claims:</strong>
				<ul className="mt-1 list-inside list-disc space-y-1">
					<li>
						<code>iss</code> - Issuer
					</li>
					<li>
						<code>sub</code> - Subject
					</li>
					<li>
						<code>aud</code> - Audience
					</li>
					<li>
						<code>exp</code> - Expiration time
					</li>
					<li>
						<code>iat</code> - Issued at
					</li>
				</ul>
			</div>
		</ToolGuide>
	);
}
