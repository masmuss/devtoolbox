import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Type } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { getCharacterCount, getWordCount } from "@/lib/utils/text-counter";

interface TextOutputProps {
	generatedText: string;
}

export function TextOutput({ generatedText }: TextOutputProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Generated Text</CardTitle>
				<CardDescription>Your Lorem Ipsum placeholder text</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{generatedText && (
						<>
							<div className="flex items-center justify-between">
								<div className="text-sm text-gray-500 dark:text-gray-400">
									{getWordCount(generatedText)} words, {getCharacterCount(generatedText)} characters
								</div>
								<CopyButton text={generatedText} label="Copy text" variant="outline" size="sm" />
							</div>
							<Textarea
								value={generatedText}
								readOnly
								className="min-h-[300px] text-sm leading-relaxed"
								placeholder="Generated text will appear here..."
							/>
						</>
					)}

					{!generatedText && (
						<div className="py-12 text-center text-gray-500 dark:text-gray-400">
							<Type className="mx-auto mb-4 h-12 w-12 opacity-50" />
							<p>Click "Generate Text" to create Lorem Ipsum</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
