import { allTools as tools } from "../data/tools";

export function getToolsByCategory(category: string) {
	if (category === "All") {
		return tools;
	}
	return tools.filter((tool) => tool.category === category);
}
