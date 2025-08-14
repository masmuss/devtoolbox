import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RefreshCw } from "lucide-react";
import { useFlexibleToolState } from "@/lib/hooks/use-tool-state";
import { CopyButton } from "../copy-button";

export default function SlugGeneratorComponent() {
	const { state, updateState, clearState } = useFlexibleToolState({
		input: "",
		separator: "-",
		lowercase: true,
		removeSpecialChars: true,
		maxLength: "",
	});

	const [output, setOutput] = useState("");

	const generateSlug = (text: string) => {
		let slug = text;

		if (state.lowercase) {
			slug = slug.toLowerCase();
		}

		if (state.removeSpecialChars) {
			slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
			slug = slug.replace(/[^a-zA-Z0-9\s\-_]/g, "");
		}

		slug = slug.replace(/[\s\-_]+/g, state.separator);

		slug = slug.replace(new RegExp(`^${state.separator}+|${state.separator}+$`, "g"), "");

		if (state.maxLength && Number.parseInt(state.maxLength) > 0) {
			slug = slug.substring(0, Number.parseInt(state.maxLength));
			slug = slug.replace(new RegExp(`${state.separator}+$`), "");
		}

		return slug;
	};

	useEffect(() => {
		if (state.input.trim()) {
			setOutput(generateSlug(state.input));
		} else {
			setOutput("");
		}
	}, [state.input, state.separator, state.lowercase, state.removeSpecialChars, state.maxLength]);

	const clearAll = () => {
		clearState();
		setOutput("");
	};

	const exampleTexts = [
		"Hello World! This is a Test",
		"How to Build a React App in 2024",
		"The Quick Brown Fox Jumps Over the Lazy Dog",
		"Understanding JavaScript Promises & Async/Await",
		"10 Tips for Better Web Development",
	];

	const loadExample = (text: string) => {
		updateState({ input: text });
	};

	return (
		<div className="mb-8 grid gap-8">
			{/* Input Section */}
			<Card className="border-gray-200 dark:border-gray-800">
				<CardHeader>
					<CardTitle className="text-black dark:text-white">Input Text</CardTitle>
					<CardDescription className="text-gray-600 dark:text-gray-400">
						Enter the text you want to convert to a slug
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Textarea
						value={state.input}
						onChange={(e) => updateState({ input: e.target.value })}
						placeholder="Enter your text here..."
						className="min-h-24 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
					/>

					{/* Example buttons */}
					<div className="space-y-2">
						<Label className="text-sm text-gray-600 dark:text-gray-400">Try these examples:</Label>
						<div className="flex flex-wrap gap-2">
							{exampleTexts.map((text, index) => (
								<Button
									key={index}
									variant="outline"
									size="sm"
									onClick={() => loadExample(text)}
									className="border-gray-200 text-xs hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
								>
									{text.length > 30 ? text.substring(0, 30) + "..." : text}
								</Button>
							))}
						</div>
					</div>

					<div className="flex gap-2">
						<Button onClick={clearAll} variant="default">
							<RefreshCw className="mr-2 h-4 w-4" />
							Clear
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Options */}
			<Card className="border-gray-200 dark:border-gray-800">
				<CardHeader>
					<CardTitle className="text-black dark:text-white">Options</CardTitle>
					<CardDescription className="text-gray-600 dark:text-gray-400">
						Customize how your slug is generated
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid gap-4 md:grid-cols-2">
						{/* Separator */}
						<div className="space-y-2">
							<Label className="text-black dark:text-white">Separator</Label>
							<Select
								value={state.separator}
								onValueChange={(val) => updateState({ separator: val })}
							>
								<SelectTrigger className="border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="-">Hyphen (-)</SelectItem>
									<SelectItem value="_">Underscore (_)</SelectItem>
									<SelectItem value=".">Dot (.)</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Max Length */}
						<div className="space-y-2">
							<Label className="text-black dark:text-white">Max Length (optional)</Label>
							<Input
								type="number"
								value={state.maxLength}
								onChange={(e) => updateState({ maxLength: e.target.value })}
								placeholder="No limit"
								min="1"
								max="200"
								className="border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
							/>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<Checkbox
								id="lowercase"
								checked={state.lowercase}
								onCheckedChange={(checked) => updateState({ lowercase: !!checked })}
							/>
							<Label htmlFor="lowercase" className="text-gray-700 dark:text-gray-300">
								Convert to lowercase
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<Checkbox
								id="remove-special"
								checked={state.removeSpecialChars}
								onCheckedChange={(checked) => updateState({ removeSpecialChars: !!checked })}
							/>
							<Label htmlFor="remove-special" className="text-gray-700 dark:text-gray-300">
								Remove special characters and accents
							</Label>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Output Section */}
			<Card className="border-gray-200 dark:border-gray-800">
				<CardHeader>
					<CardTitle className="text-black dark:text-white">Generated Slug</CardTitle>
					<CardDescription className="text-gray-600 dark:text-gray-400">
						Your URL-friendly slug will appear here automatically
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="relative">
						<Input
							value={output}
							readOnly
							placeholder="Your slug will appear here..."
							className="border-gray-200 bg-gray-50 pr-12 font-mono text-sm dark:border-gray-800 dark:bg-gray-900"
						/>
						{output && (
							<CopyButton
								text={output}
								className="absolute top-1/2 right-2 h-8 w-8 -translate-y-1/2 p-0"
							/>
						)}
					</div>

					{/* Preview URL */}
					{output && (
						<div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
							<Label className="text-sm text-gray-600 dark:text-gray-400">Preview URL:</Label>
							<p className="font-mono text-sm break-all text-gray-800 dark:text-gray-200">
								https://example.com/blog/{output}
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
