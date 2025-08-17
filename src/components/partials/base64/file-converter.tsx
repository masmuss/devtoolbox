import type React from "react";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageIcon } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { fileToBase64, formatBase64, getFileSize } from "@/lib/utils/base64-converter";
import ToolSection from "@/components/tool-section";
import { Input } from "@/components/ui/input";

interface FileConverterProps {
	fileBase64: string;
	onFileBase64Change: (base64: string) => void;
}

export function FileConverter({ fileBase64, onFileBase64Change }: FileConverterProps) {
	const [fileInput, setFileInput] = useState<File | null>(null);

	const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFileInput(file);
			try {
				const base64 = await fileToBase64(file);
				onFileBase64Change(base64);
			} catch (error) {
				console.error("Error converting file to Base64:", error);
			}
		}
	};

	return (
		<div className="mb-8 grid gap-6 lg:grid-cols-2">
			{/* File Upload Section */}
			<ToolSection title="File to Base64" description="Convert files to Base64 encoding">
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="fileInput">Select File</Label>
						<Input id="fileInput" type="file" onChange={handleFileUpload} />
					</div>
					{fileInput && (
						<div className="text-sm text-neutral-600 dark:text-neutral-400">
							<div>File: {fileInput.name}</div>
							<div>Size: {(fileInput.size / 1024).toFixed(1)} KB</div>
							<div>Type: {fileInput.type || "Unknown"}</div>
						</div>
					)}
				</div>
			</ToolSection>

			{/* File Base64 Result */}
			<ToolSection title="Base64 Output" description="Base64 representation of your file">
				{fileBase64 ? (
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<Label>Base64 Data</Label>
							<CopyButton text={fileBase64} size="sm" />
						</div>
						<Textarea
							value={formatBase64(fileBase64)}
							readOnly
							className="font-mono text-xs"
							rows={10}
						/>
						<div className="text-sm text-neutral-500 dark:text-neutral-400">
							Base64 size: {getFileSize(fileBase64)}
						</div>
					</div>
				) : (
					<div className="py-8 text-center text-neutral-500 dark:text-neutral-400">
						<ImageIcon className="mx-auto mb-4 h-12 w-12 opacity-50" />
						<p>Select a file to see its Base64 encoding</p>
					</div>
				)}
			</ToolSection>
		</div>
	);
}
