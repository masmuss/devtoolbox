import ToolSectionWrapper from "@/components/tool-section.tsx";
import React from "react";

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
