import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/copy-button";

interface ConversionResultProps {
	label: string;
	value: string;
	className?: string;
}

export function ConversionResult({ label, value, className = "" }: ConversionResultProps) {
	return (
		<div className="grid gap-3">
			<div className="flex items-center justify-between">
				<Label className="text-sm font-medium">{label}</Label>
				<CopyButton text={value} />
			</div>
			<div className={`bg-background rounded border p-2 text-sm ${className}`}>{value}</div>
		</div>
	);
}
