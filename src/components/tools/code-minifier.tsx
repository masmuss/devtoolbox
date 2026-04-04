import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Copy, Trash2, Minimize2, Check } from "lucide-react";
import { toast } from "sonner";

type SupportedLanguage = "css" | "javascript" | "json";

export default function CodeMinifier() {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [language, setLanguage] = useState<SupportedLanguage>("css");
	const [stats, setStats] = useState({ oldSize: 0, newSize: 0, savings: 0 });
	const [copied, setCopied] = useState(false);

	const minifyCode = () => {
		if (!input.trim()) return;

		let result = input;
		try {
			if (language === "css") {
				result = result
					.replace(/\/\*[\s\S]*?\*\//g, "") // Remove block comments
					.replace(/\s+/g, " ") // Collapse whitespace
					.replace(/\s*([{},;:\>\+\~\!\[\]])\s*/g, "$1") // Remove spaces around safe operators
					.replace(/;}/g, "}") // Remove trailing semicolon
					.trim();
			} else if (language === "javascript") {
				// Naive JS minification
				result = result
					.replace(/\/\*[\s\S]*?\*\//g, "") // Block comments
					.replace(/\/\/.*$/gm, "") // Line comments
					.replace(/\s+/gm, " ") // All whitespace into spaces
					.replace(/\s*([{}[\]();,=<>+\-*/&|!?:])\s*/g, "$1") // Spaces around operators
					.replace(/return\s+/g, "return ") // Fix return keyword
					.replace(/typeof\s+/g, "typeof ") // Fix typeof keyword
					.replace(/new\s+/g, "new ") // Fix new keyword
					.replace(/(let|const|var)\s+/g, "$1 ") // Fix var declarations
					.trim();
			} else if (language === "json") {
				result = JSON.stringify(JSON.parse(result));
			}
			setOutput(result);

			const oldSize = new Blob([input]).size;
			const newSize = new Blob([result]).size;
			const savings = ((oldSize - newSize) / oldSize) * 100;
			setStats({ oldSize, newSize, savings: Number.isNaN(savings) ? 0 : savings });
			toast.success(`${language.toUpperCase()} minified successfully!`);
		} catch (_e) {
			toast.error(
				`Failed to minify: Invalid ${language.toUpperCase()} syntax or unsupported complex structures.`,
			);
		}
	};

	const formatSize = (bytes: number) => {
		if (bytes < 1024) return `${bytes} B`;
		return `${(bytes / 1024).toFixed(2)} KB`;
	};

	const copyToClipboard = () => {
		if (!output) return;
		navigator.clipboard.writeText(output);
		setCopied(true);
		toast.success("Minified code copied to clipboard!");
		setTimeout(() => setCopied(false), 2000);
	};

	const clearAll = () => {
		setInput("");
		setOutput("");
		setStats({ oldSize: 0, newSize: 0, savings: 0 });
	};

	return (
		<div className="grid gap-6 md:grid-cols-2">
			{/* Input Panel */}
			<Card className="flex h-full flex-col">
				<CardHeader className="pb-4">
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>Input Code</CardTitle>
							<CardDescription>Paste your raw code below</CardDescription>
						</div>
						<div>
							<Select value={language} onValueChange={(val: SupportedLanguage) => setLanguage(val)}>
								<SelectTrigger>
									<SelectValue placeholder="Language" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="css">CSS</SelectItem>
									<SelectItem value="javascript">JavaScript</SelectItem>
									<SelectItem value="json">JSON</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardHeader>
				<CardContent className="flex flex-1 flex-col gap-4">
					<Textarea
						className="min-h-[300px] flex-1 resize-y font-mono text-sm"
						placeholder={`Paste your ${language.toUpperCase()} code here...`}
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<div className="flex gap-2">
						<Button className="flex-1" onClick={minifyCode} disabled={!input.trim()}>
							<Minimize2 className="mr-2 h-4 w-4" /> Minify
						</Button>
						<Button variant="outline" size="icon" onClick={clearAll} title="Clear All">
							<Trash2 className="h-4 w-4" />
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Output Panel */}
			<Card className="flex h-full flex-col">
				<CardHeader className="pb-4">
					<div className="flex items-end justify-between">
						<div>
							<CardTitle>Minified Output</CardTitle>
							<CardDescription>
								{stats.oldSize > 0 ? (
									<span className="font-medium text-green-600">
										Saved {stats.savings.toFixed(1)}%
									</span>
								) : (
									"Optimized code will appear here"
								)}
							</CardDescription>
						</div>
						{stats.oldSize > 0 && (
							<div className="text-muted-foreground space-y-1 text-right text-xs">
								<div>Before: {formatSize(stats.oldSize)}</div>
								<div className="font-semibold">After: {formatSize(stats.newSize)}</div>
							</div>
						)}
					</div>
				</CardHeader>
				<CardContent className="flex flex-1 flex-col gap-4">
					<Textarea
						className="read-only:bg-muted/50 min-h-[300px] flex-1 resize-y font-mono text-sm"
						value={output}
						readOnly
						placeholder="Awaiting minification..."
					/>
					<Button
						className="w-full"
						variant="secondary"
						onClick={copyToClipboard}
						disabled={!output}
					>
						{copied ? (
							<Check className="mr-2 h-4 w-4 text-green-600" />
						) : (
							<Copy className="mr-2 h-4 w-4" />
						)}
						{copied ? "Copied" : "Copy to Clipboard"}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
