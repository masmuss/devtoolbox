import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CopyButton } from "@/components/copy-button";
import { Code2, Minimize2, FileText, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ToolSection from "@/components/tool-section";

interface JsonEditorProps {
	input: string;
	onInputChange: (value: string) => void;
	onFormat: (indent: number) => void;
	onMinify: () => void;
	onClear: () => void;
	formatted: string;
	minified: string;
	error?: string;
}

export function JsonEditor({
	input,
	onInputChange,
	onFormat,
	onMinify,
	onClear,
	formatted,
	minified,
	error,
}: JsonEditorProps) {
	const [indent, setIndent] = useState("2");

	const handleFormat = () => {
		onFormat(Number.parseInt(indent, 10));
	};

	return (
		<div className="space-y-6">
			<ToolSection
				icon={FileText}
				title="JSON Input"
				description="Paste your JSON data to format or validate"
			>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="json-input">JSON Data</Label>
						<Textarea
							id="json-input"
							placeholder="Paste your JSON here..."
							value={input}
							onChange={(e) => onInputChange(e.target.value)}
							className="min-h-40 font-mono text-sm"
						/>
					</div>

					{error && (
						<Alert variant="destructive">
							<AlertCircle className="h-4 w-4" />
							<AlertDescription className="font-mono text-sm">{error}</AlertDescription>
						</Alert>
					)}

					<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2">
								<Label htmlFor="indent-select" className="text-sm">
									Indentation:
								</Label>
								<Select value={indent} onValueChange={setIndent}>
									<SelectTrigger id="indent-select" className="w-20">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="2">2</SelectItem>
										<SelectItem value="4">4</SelectItem>
										<SelectItem value="8">8</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<div className="flex gap-2">
							<Button onClick={handleFormat} disabled={!input.trim()} size="sm">
								<Code2 className="mr-2 h-4 w-4" />
								Format
							</Button>
							<Button onClick={onMinify} disabled={!input.trim()} variant="outline" size="sm">
								<Minimize2 className="mr-2 h-4 w-4" />
								Minify
							</Button>
							<Button onClick={onClear} variant="outline" size="sm">
								Clear
							</Button>
						</div>
					</div>
				</div>
			</ToolSection>

			{formatted && (
				<ToolSection
					title="Formatted JSON"
					description="Pretty-printed JSON with proper indentation"
				>
					<div className="space-y-3">
						<div className="relative">
							<Textarea
								value={formatted}
								readOnly
								className="bg-muted/50 min-h-40 font-mono text-sm"
							/>
							<div className="absolute top-2 right-2">
								<CopyButton text={formatted} />
							</div>
						</div>
						<div className="text-muted-foreground text-xs">
							Length: {formatted.length} characters
						</div>
					</div>
				</ToolSection>
			)}

			{minified && (
				<ToolSection title="Minified JSON" description="Compressed JSON with no whitespace">
					<div className="space-y-3">
						<div className="relative">
							<Textarea
								value={minified}
								readOnly
								className="bg-muted/50 min-h-24 font-mono text-sm"
							/>
							<div className="absolute top-2 right-2">
								<CopyButton text={minified} />
							</div>
						</div>
						<div className="text-muted-foreground text-xs">
							Length: {minified.length} characters
						</div>
					</div>
				</ToolSection>
			)}
		</div>
	);
}
