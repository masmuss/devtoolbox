import type React from "react";
import ToolSectionWrapper from "@/components/tool-section.tsx";

interface ToolGuideProps {
	title: string;
	description?: string;
	children: React.ReactNode;
}

export function ToolGuide({ title, description, children }: ToolGuideProps) {
	return (
		<ToolSectionWrapper title={title} description={description} className="text-sm">
			{children}
		</ToolSectionWrapper>
	);
}
