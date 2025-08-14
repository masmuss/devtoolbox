import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";

interface SlugInputProps {
	value: string;
	onChange: (value: string) => void;
	onClear: () => void;
}

const exampleTexts = [
	"Hello World! This is a Test",
	"How to Build a React App in 2024",
	"The Quick Brown Fox Jumps Over the Lazy Dog",
	"Understanding JavaScript Promises & Async/Await",
	"10 Tips for Better Web Development",
];

export function SlugInput({ value, onChange, onClear }: SlugInputProps) {
	const loadExample = (text: string) => {
		onChange(text);
	};

	return (
		<Card className="border-neutral-200 dark:border-neutral-800">
			<CardHeader>
				<CardTitle className="text-black dark:text-white">Input Text</CardTitle>
				<CardDescription className="text-neutral-600 dark:text-neutral-400">
					Enter the text you want to convert to a slug
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<Textarea
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Enter your text here..."
					className="min-h-24 border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
				/>

				<div className="space-y-2">
					<Label className="text-sm text-neutral-600 dark:text-neutral-400">
						Try these examples:
					</Label>
					<div className="flex flex-wrap gap-2">
						{exampleTexts.map((text, index) => (
							<Button
								key={index}
								variant="outline"
								size="sm"
								onClick={() => loadExample(text)}
								className="border-neutral-200 text-xs hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
							>
								{text.length > 30 ? text.substring(0, 30) + "..." : text}
							</Button>
						))}
					</div>
				</div>

				<Button
					onClick={onClear}
					variant="outline"
					className="border-neutral-200 bg-transparent hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
				>
					<RefreshCw className="mr-2 h-4 w-4" />
					Clear
				</Button>
			</CardContent>
		</Card>
	);
}
