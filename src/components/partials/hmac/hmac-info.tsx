import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HMACInfo() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>About HMAC</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
				<p>
					<strong>HMAC (Hash-based Message Authentication Code)</strong> is a mechanism for message
					authentication using cryptographic hash functions.
				</p>
				<div>
					<strong>Key Features:</strong>
					<ul className="mt-1 list-inside list-disc space-y-1">
						<li>Provides both data integrity and authenticity</li>
						<li>Uses a secret key with a hash function</li>
						<li>Resistant to length extension attacks</li>
						<li>Widely used in APIs and security protocols</li>
					</ul>
				</div>
				<div>
					<strong>Common Uses:</strong>
					<ul className="mt-1 list-inside list-disc space-y-1">
						<li>API authentication (AWS, GitHub, etc.)</li>
						<li>JWT token signing</li>
						<li>Message integrity verification</li>
						<li>Password-based authentication</li>
					</ul>
				</div>
				<div>
					<strong>Security Note:</strong> Keep your secret key secure and use SHA-256 or higher for
					production use.
				</div>
			</CardContent>
		</Card>
	);
}
