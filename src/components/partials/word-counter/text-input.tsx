import type React from "react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, Upload, X } from "lucide-react";
import { useRef } from "react";
import ToolSection from "@/components/tool-section";

interface TextInputProps {
	text: string;
	onTextChange: (text: string) => void;
}

export function TextInput({ text, onTextChange }: TextInputProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && file.type === "text/plain") {
			const reader = new FileReader();
			reader.onload = (e) => {
				const content = e.target?.result as string;
				onTextChange(content);
			};
			reader.readAsText(file);
		}
	};

	const clearText = () => {
		onTextChange("");
	};

	return (
		<ToolSection
			icon={FileText}
			title="Text Input"
			description="Enter, paste, or upload your text to analyze"
		>
			<div className="mb-4 flex gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => fileInputRef.current?.click()}
					className="flex items-center gap-2"
				>
					<Upload className="h-4 w-4" />
					Upload File
				</Button>
				{text && (
					<Button
						variant="outline"
						size="sm"
						onClick={clearText}
						className="flex items-center gap-2 bg-transparent"
					>
						<X className="h-4 w-4" />
						Clear
					</Button>
				)}
				<input
					ref={fileInputRef}
					type="file"
					accept=".txt"
					onChange={handleFileUpload}
					className="hidden"
				/>
			</div>

			<div className="relative">
				<Textarea
					value={text}
					onChange={(e) => onTextChange(e.target.value)}
					placeholder="Type or paste your text here..."
					className="focus:border-foreground/20 min-h-[250px] resize-y border-2 font-mono text-sm leading-relaxed transition-colors"
				/>
				{text && (
					<div className="text-muted-foreground bg-background/80 absolute right-3 bottom-3 rounded px-2 py-1 text-xs">
						{text.length} characters
					</div>
				)}
			</div>
		</ToolSection>
	);
}
