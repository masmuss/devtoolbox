import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

interface SimilarityCardProps {
	similarity: number;
}

export function SimilarityCard({ similarity }: SimilarityCardProps) {
	const getSimilarityLevel = (similarity: number) => {
		if (similarity >= 90) return { level: "Excellent", color: "text-foreground" };
		if (similarity >= 75) return { level: "Good", color: "text-foreground" };
		if (similarity >= 50) return { level: "Fair", color: "text-muted-foreground" };
		if (similarity >= 25) return { level: "Poor", color: "text-muted-foreground" };
		return { level: "Very Poor", color: "text-muted-foreground" };
	};

	const similarityInfo = getSimilarityLevel(similarity);

	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<TrendingUp className="text-muted-foreground h-6 w-6" />
					<div>
						<h3 className="text-lg font-semibold">Text Similarity Score</h3>
						<p className="text-muted-foreground text-sm">
							Calculated using Levenshtein distance algorithm
						</p>
					</div>
				</div>
				<div className="text-right">
					<div className="text-3xl font-bold">{similarity}%</div>
					<div className={`text-sm font-medium ${similarityInfo.color}`}>
						{similarityInfo.level}
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<Progress value={similarity} className="mb-3 h-3" />
			</CardContent>
			<CardFooter className="text-muted-foreground text-xs">
				Higher scores indicate greater similarity between texts. Scores above 75% suggest minimal
				differences.
			</CardFooter>
		</Card>
	);
}
