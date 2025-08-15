import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/copy-button";
import { Hash } from "lucide-react";
import ToolSection from "@/components/tool-section";

interface HashOutputProps {
	output: string;
	hashType: string;
	error?: string;
}

export function HashOutput({ output, hashType, error }: HashOutputProps) {
	const isValidHash = output && !error && output !== "Please enter some text to hash";

	return (
		<ToolSection
			icon={Hash}
			title="Generated Hash"
			description={`Your ${hashType.toUpperCase()} hash will appear here`}
		>
			<div className="space-y-4">
				<div className="relative">
					<Textarea
						value={error || output}
						readOnly
						placeholder="Your hash will appear here after generation..."
						className={`min-h-24 resize-none border-neutral-200 bg-neutral-50 font-mono text-sm dark:border-neutral-800 dark:bg-neutral-900 ${
							error ? "text-red-600 dark:text-red-400" : ""
						}`}
					/>
					{isValidHash && (
						<div className="absolute top-2 right-2">
							<CopyButton text={output} />
						</div>
					)}
				</div>
				{isValidHash && (
					<div className="text-sm text-neutral-600 dark:text-neutral-400">
						Hash length: {output.length} characters
					</div>
				)}
			</div>
		</ToolSection>
	);
}
