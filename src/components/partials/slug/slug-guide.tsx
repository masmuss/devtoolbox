import { ToolGuide } from "@/components/tool-guide";

export function SlugGuide() {
	return (
		<ToolGuide
			title="Creating Effective Slugs"
			description="Follow these guidelines to create SEO-friendly and user-friendly slugs for your content."
		>
			<ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
				<li>• Keep slugs short and descriptive (under 60 characters)</li>
				<li>• Use hyphens (-) as separators for better SEO</li>
				<li>• Avoid special characters and spaces</li>
				<li>• Include relevant keywords for search optimization</li>
				<li>• Make slugs readable and meaningful to users</li>
				<li>• Avoid stop words (a, an, the, and, or, but) when possible</li>
			</ul>
		</ToolGuide>
	);
}
