import { Label } from "@/components/ui/label";
import { CopyButton } from "@/components/copy-button";

interface CalculationResultProps {
	title: string;
	value: string;
	copyValue?: string;
	className?: string;
}

export function CalculationResult({
	title,
	value,
	copyValue,
	className = "",
}: CalculationResultProps) {
	return (
		<div>
			<div className="mb-2 flex items-center justify-between">
				<Label className="text-sm font-medium">{title}</Label>
				<CopyButton text={copyValue || value} />
			</div>
			<div className={`bg-background rounded border p-3 text-sm ${className}`}>{value}</div>
		</div>
	);
}
