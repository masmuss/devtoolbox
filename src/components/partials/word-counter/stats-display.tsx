import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { BarChart3, Clock, Eye, MessageSquare, TrendingUp } from "lucide-react";
import type { WordCountStats, ReadabilityStats } from "@/lib/utils/word-counter";
import ToolSection from "@/components/tool-section";
import { Button } from "@/components/ui/button";

interface StatsDisplayProps {
	stats: WordCountStats & { readability: ReadabilityStats };
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
	const basicStats = [
		{ label: "Characters", value: stats.characters.toLocaleString(), subtext: "with spaces" },
		{
			label: "Characters",
			value: stats.charactersNoSpaces.toLocaleString(),
			subtext: "without spaces",
		},
		{ label: "Words", value: stats.words.toLocaleString(), subtext: "total count" },
		{ label: "Sentences", value: stats.sentences.toLocaleString(), subtext: "detected" },
		{ label: "Paragraphs", value: stats.paragraphs.toLocaleString(), subtext: "separated" },
		{ label: "Lines", value: stats.lines.toLocaleString(), subtext: "line breaks" },
	];

	const timeStats = [
		{
			label: "Reading Time",
			value: `${stats.readingTime}`,
			unit: "min",
			icon: Eye,
			subtext: "~250 words/min",
		},
		{
			label: "Speaking Time",
			value: `${stats.speakingTime}`,
			unit: "min",
			icon: MessageSquare,
			subtext: "~150 words/min",
		},
	];

	return (
		<div className="space-y-8">
			<ToolSection
				icon={BarChart3}
				title="Text Statistics"
				description="Comprehensive analysis of your text content"
			>
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3">
					{basicStats.map((stat, index) => (
						<Card
							key={`${stat.label}-${index}`}
							className="text-center transition-shadow hover:shadow-md"
						>
							<CardHeader className="flex items-center justify-center capitalize">
								{stat.subtext}
							</CardHeader>
							<CardContent>
								<div className="text-foreground mb-2 text-3xl font-bold">{stat.value}</div>
								<div className="text-muted-foreground mb-1 text-sm font-medium">{stat.label}</div>
							</CardContent>
						</Card>
					))}
				</div>
			</ToolSection>

			<ToolSection
				icon={Clock}
				title="Reading & Speaking Time"
				description="Estimated duration based on average reading and speaking speeds"
			>
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{timeStats.map((stat) => (
						<Card key={stat.label}>
							<CardContent className="flex items-start gap-4">
								<div className="bg-muted rounded-lg p-3">
									<stat.icon className="text-foreground h-6 w-6" />
								</div>
								<div className="flex-1">
									<div className="mb-1 flex items-baseline gap-2">
										<span className="text-foreground text-3xl font-bold">{stat.value}</span>
										<span className="text-muted-foreground text-lg">{stat.unit}</span>
									</div>
									<div className="text-foreground mb-1 text-sm font-medium">{stat.label}</div>
									<div className="text-muted-foreground text-xs">{stat.subtext}</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</ToolSection>

			<ToolSection
				icon={TrendingUp}
				title="Readability Analysis"
				description="Advanced metrics to understand text complexity and structure"
			>
				<div className="space-y-6">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<Card>
							<CardHeader>Average Words per Sentence</CardHeader>
							<CardContent className="text-foreground text-3xl font-bold">
								{stats.readability.averageWordsPerSentence}
							</CardContent>
							<CardFooter className="text-muted-foreground text-xs">words per sentence</CardFooter>
						</Card>

						<Card>
							<CardHeader>Average Sentences per Paragraph</CardHeader>
							<CardContent className="text-foreground text-3xl font-bold">
								{stats.readability.averageCharactersPerWord}
							</CardContent>
							<CardFooter className="text-muted-foreground text-xs">
								sentences per paragraph
							</CardFooter>
						</Card>
					</div>

					{stats.readability.longestWord && (
						<Card>
							<CardHeader>
								Longest Word
								<CardDescription>
									The longest word found in the text, useful for understanding complexity
								</CardDescription>
							</CardHeader>
							<CardContent className="font-mono text-xl">
								{stats.readability.longestWord}
							</CardContent>
							<CardFooter className="text-muted-foreground text-xs">
								{stats.readability.longestWord.length} characters
							</CardFooter>
						</Card>
					)}

					{stats.readability.mostCommonWords.length > 0 && (
						<Card>
							<CardHeader>
								Most Common Words
								<CardDescription>
									Top words used in the text, excluding common stop words
								</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-wrap gap-3">
								{stats.readability.mostCommonWords.map((item, index) => (
									<Button key={item.word} variant="outline" size="sm">
										<span className="font-medium">{item.word}</span>
										<span className="text-muted-foreground ml-2">×{item.count}</span>
									</Button>
								))}
							</CardContent>
						</Card>
					)}
				</div>
			</ToolSection>
		</div>
	);
}
