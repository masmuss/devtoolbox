import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, FileX, Upload, RotateCcw } from "lucide-react";
import { useRef } from "react";
import ToolSection from "@/components/tool-section";

interface DiffInputProps {
	originalText: string;
	modifiedText: string;
	onOriginalChange: (text: string) => void;
	onModifiedChange: (text: string) => void;
}

export function DiffInput({
	originalText,
	modifiedText,
	onOriginalChange,
	onModifiedChange,
}: DiffInputProps) {
	const originalFileRef = useRef<HTMLInputElement>(null);
	const modifiedFileRef = useRef<HTMLInputElement>(null);

	const handleFileUpload = (file: File, onChange: (text: string) => void) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const content = e.target?.result as string;
			onChange(content);
		};
		reader.readAsText(file);
	};

	const handleClear = (onChange: (text: string) => void) => {
		onChange("");
	};

	return (
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<ToolSection
				icon={FileText}
				title="Original Text"
				description="Enter or upload the original version"
			>
				<div className="space-y-3">
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => originalFileRef.current?.click()}
							className="flex items-center gap-2"
						>
							<Upload className="h-4 w-4" />
							Upload File
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => handleClear(onOriginalChange)}
							className="flex items-center gap-2"
						>
							<RotateCcw className="h-4 w-4" />
							Clear
						</Button>
					</div>

					<div className="relative">
						<Textarea
							value={originalText}
							onChange={(e) => onOriginalChange(e.target.value)}
							placeholder="Paste your original text here or upload a file..."
							className="min-h-[350px] resize-y font-mono text-sm leading-relaxed"
						/>
						<div className="text-muted-foreground bg-background/80 absolute right-3 bottom-3 rounded px-2 py-1 text-xs">
							{originalText.length} chars
						</div>
					</div>

					<input
						ref={originalFileRef}
						type="file"
						accept=".txt,.md,.js,.ts,.jsx,.tsx,.css,.html,.json,.xml,.csv"
						className="hidden"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (file) handleFileUpload(file, onOriginalChange);
						}}
					/>
				</div>
			</ToolSection>

			<ToolSection
				icon={FileX}
				title="Modified Text"
				description="Enter or upload the modified version to compare"
			>
				<div className="space-y-3">
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => modifiedFileRef.current?.click()}
							className="flex items-center gap-2"
						>
							<Upload className="h-4 w-4" />
							Upload File
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => handleClear(onModifiedChange)}
							className="flex items-center gap-2"
						>
							<RotateCcw className="h-4 w-4" />
							Clear
						</Button>
					</div>

					<div className="relative">
						<Textarea
							value={modifiedText}
							onChange={(e) => onModifiedChange(e.target.value)}
							placeholder="Paste your modified text here or upload a file..."
							className="min-h-[350px] resize-y font-mono text-sm leading-relaxed"
						/>
						<div className="text-muted-foreground bg-background/80 absolute right-3 bottom-3 rounded px-2 py-1 text-xs">
							{modifiedText.length} chars
						</div>
					</div>

					<input
						ref={modifiedFileRef}
						type="file"
						accept=".txt,.md,.js,.ts,.jsx,.tsx,.css,.html,.json,.xml,.csv"
						className="hidden"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (file) handleFileUpload(file, onModifiedChange);
						}}
					/>
				</div>
			</ToolSection>
		</div>
	);
}
