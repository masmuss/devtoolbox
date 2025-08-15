import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Shield } from "lucide-react";
import ToolSection from "@/components/tool-section.tsx";

interface JWTHeaderSectionProps {
	header: string;
	algorithm: string;
	onHeaderChange: (header: string) => void;
	onAlgorithmChange: (algorithm: string) => void;
}

export function JWTHeaderSection({
	header,
	algorithm,
	onHeaderChange,
	onAlgorithmChange,
}: JWTHeaderSectionProps) {
	return (
		<ToolSection
			title="Header"
			description="JWT header containing algorithm and token type"
			icon={Shield}
		>
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="algorithm">Algorithm</Label>
					<Select value={algorithm} onValueChange={onAlgorithmChange}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="HS256">HS256</SelectItem>
							<SelectItem value="HS384">HS384</SelectItem>
							<SelectItem value="HS512">HS512</SelectItem>
							<SelectItem value="RS256">RS256</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-2">
					<Label htmlFor="header">Header JSON</Label>
					<Textarea
						id="header"
						value={header}
						onChange={(e) => onHeaderChange(e.target.value)}
						className="font-mono text-sm"
						rows={4}
					/>
				</div>
			</div>
		</ToolSection>
	);
}
