import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useClipboard } from "@/lib/hooks/use-clipboard";

interface CopyButtonProps {
	text: string;
	disabled?: boolean;
	size?: "sm" | "default" | "lg";
	variant?: "default" | "outline" | "ghost";
	className?: string;
	label?: string;
}

export function CopyButton({
	text,
	disabled,
	size = "sm",
	variant = "ghost",
	className,
	label = "Copy to clipboard",
}: CopyButtonProps) {
	const { copied, copyToClipboard } = useClipboard();

	return (
		<Button
			size={size}
			variant={variant}
			onClick={() => copyToClipboard(text)}
			disabled={disabled || !text}
			className={className}
		>
			{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
			{label && <span>{copied ? "Copied!" : `${label}`}</span>}
		</Button>
	);
}
