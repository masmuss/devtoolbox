import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LoremInfo() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>About Lorem Ipsum</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
				<p>
					<strong>Lorem Ipsum</strong> is placeholder text commonly used in the printing and
					typesetting industry since the 1500s.
				</p>
				<div>
					<strong>Why use Lorem Ipsum?</strong>
					<ul className="mt-1 list-inside list-disc space-y-1">
						<li>Focuses attention on design, not content</li>
						<li>Prevents distraction from readable text</li>
						<li>Industry standard for mockups</li>
						<li>Consistent length and structure</li>
					</ul>
				</div>
				<div>
					<strong>Common Uses:</strong>
					<ul className="mt-1 list-inside list-disc space-y-1">
						<li>Website mockups and wireframes</li>
						<li>Print design layouts</li>
						<li>Typography testing</li>
						<li>Content management systems</li>
					</ul>
				</div>
			</CardContent>
		</Card>
	);
}
