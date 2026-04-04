import { allTools, type Tool } from "@/lib/data/tools";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";
import { ChevronRight, Wrench } from "lucide-react";

export default function ToolSidebar({
	currentPath,
	isMobile,
}: {
	currentPath: string;
	isMobile?: boolean;
}) {
	// Normalize path to ignore trailing slashes
	const normalizedPath =
		currentPath.endsWith("/") && currentPath !== "/" ? currentPath.slice(0, -1) : currentPath;

	const groupedTools = categories
		.map((cat: string) => ({
			category: cat,
			items: allTools.filter((t: Tool) => t.category === cat),
		}))
		.filter((g) => g.items.length > 0);

	if (isMobile) {
		return (
			<div className="w-full">
				<label
					htmlFor="mobile-tool-select"
					className="text-muted-foreground mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase"
				>
					<Wrench className="h-3.5 w-3.5" /> Quick Jump
				</label>
				<div className="relative">
					<select
						id="mobile-tool-select"
						className="border-input bg-card ring-offset-background placeholder:text-muted-foreground focus:ring-ring hover:bg-accent/50 flex h-10 w-full appearance-none items-center justify-between rounded-md border px-3 py-2 text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
						value={normalizedPath}
						onChange={(e) => (window.location.href = e.target.value)}
					>
						<option value="/tools">⟵ Back to All Tools Dashboard</option>
						{groupedTools.map((group) => (
							<optgroup key={group.category} label={`--- ${group.category} ---`}>
								{group.items.map((tool: Tool) => (
									<option key={tool.href} value={tool.href}>
										{tool.title}
									</option>
								))}
							</optgroup>
						))}
					</select>
					<div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center bg-transparent px-2">
						<ChevronRight className="h-4 w-4 rotate-90" />
					</div>
				</div>
			</div>
		);
	}

	return (
		<nav className="flex w-full flex-col gap-6 pt-1 pr-4 pb-12">
			<a
				href="/tools"
				className={cn(
					"hover:text-primary hover:bg-primary/10 -ml-2 flex items-center rounded-lg p-2 text-sm font-semibold transition-colors",
					normalizedPath === "/tools" ? "text-primary bg-primary/10" : "text-muted-foreground",
				)}
			>
				<ChevronRight className="mr-1 h-4 w-4 rotate-180 opacity-50" />
				All Tools
			</a>

			{groupedTools.map((group) => (
				<div key={group.category} className="flex flex-col gap-2">
					<h4 className="text-foreground/60 text-xs font-bold tracking-wider uppercase">
						{group.category}
					</h4>
					<div className="border-border/40 ml-1.5 flex flex-col gap-0.5 border-l-2 pl-3">
						{group.items.map((tool: Tool) => {
							const isActive = normalizedPath === tool.href;
							const Icon = tool.icon;
							return (
								<a
									key={tool.href}
									href={tool.href}
									className={cn(
										"group hover:text-primary hover:bg-muted/50 flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-all",
										isActive ? "text-primary bg-primary/5 font-semibold" : "text-muted-foreground",
									)}
								>
									<Icon
										className={cn(
											"h-4 w-4 shrink-0 transition-transform",
											isActive
												? "scale-110 opacity-100"
												: "opacity-60 group-hover:scale-110 group-hover:opacity-100",
										)}
									/>
									<span className="truncate">{tool.title}</span>
								</a>
							);
						})}
					</div>
				</div>
			))}
		</nav>
	);
}
