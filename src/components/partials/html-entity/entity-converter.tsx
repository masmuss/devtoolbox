import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "@/components/copy-button";
import { Code2, FileText } from "lucide-react";
import ToolSection from "@/components/tool-section";

interface EntityConverterProps {
	input: string;
	onInputChange: (value: string) => void;
	onEncode: (encodeAll: boolean) => void;
	onDecode: () => void;
	onClear: () => void;
	encoded: string;
	decoded: string;
}

export function EntityConverter({
	input,
	onInputChange,
	onEncode,
	onDecode,
	onClear,
	encoded,
	decoded,
}: EntityConverterProps) {
	const [encodeAll, setEncodeAll] = useState(false);

	return (
		<div className="space-y-6">
			<ToolSection
				icon={FileText}
				title="Input Text"
				description="Enter the text you want to encode or decode"
			>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="input-text">Text to process</Label>
						<Textarea
							id="input-text"
							placeholder="Enter your text here..."
							value={input}
							onChange={(e) => onInputChange(e.target.value)}
							className="min-h-32 font-mono text-sm"
						/>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<Switch id="encode-all" checked={encodeAll} onCheckedChange={setEncodeAll} />
							<Label htmlFor="encode-all" className="text-sm">
								Encode all special characters
							</Label>
						</div>

						<div className="flex gap-2">
							<Button onClick={() => onEncode(encodeAll)} disabled={!input.trim()} size="sm">
								<Code2 className="mr-2 h-4 w-4" />
								Encode
							</Button>
							<Button onClick={onDecode} disabled={!input.trim()} variant="outline" size="sm">
								Decode
							</Button>
							<Button onClick={onClear} variant="outline" size="sm">
								Clear
							</Button>
						</div>
					</div>
				</div>
			</ToolSection>

			{encoded && (
				<ToolSection title="Encoded Result" description="HTML entities encoded version">
					<div className="space-y-3">
						<div className="relative">
							<Textarea
								value={encoded}
								readOnly
								className="bg-muted/50 min-h-24 font-mono text-sm"
							/>
							<div className="absolute top-2 right-2">
								<CopyButton text={encoded} />
							</div>
						</div>
						<div className="text-muted-foreground text-xs">Length: {encoded.length} characters</div>
					</div>
				</ToolSection>
			)}

			{decoded && (
				<ToolSection title="Decoded Result" description="HTML entities decoded version">
					<div className="space-y-3">
						<div className="relative">
							<Textarea
								value={decoded}
								readOnly
								className="bg-muted/50 min-h-24 font-mono text-sm"
							/>
							<div className="absolute top-2 right-2">
								<CopyButton text={decoded} />
							</div>
						</div>
						<div className="text-muted-foreground text-xs">Length: {decoded.length} characters</div>
					</div>
				</ToolSection>
			)}
		</div>
	);
}
