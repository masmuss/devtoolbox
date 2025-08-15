import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { PasswordOptions } from "@/lib/utils/password-generator";
import ToolSection from "@/components/tool-section.tsx";

interface PasswordOptionsProps {
	length: number;
	options: PasswordOptions;
	onLengthChange: (length: number) => void;
	onOptionChange: (key: keyof PasswordOptions, value: boolean) => void;
}

export function PasswordOptionsComponent({
	length,
	options,
	onLengthChange,
	onOptionChange,
}: PasswordOptionsProps) {
	const characterOptions = [
		{ key: "includeUppercase" as const, label: "Uppercase (A-Z)" },
		{ key: "includeLowercase" as const, label: "Lowercase (a-z)" },
		{ key: "includeNumbers" as const, label: "Numbers (0-9)" },
		{ key: "includeSymbols" as const, label: "Symbols (!@#$%^&*)" },
		{ key: "excludeSimilar" as const, label: "Exclude similar characters (i, l, 1, L, o, 0, O)" },
	];

	return (
		<ToolSection title="Options" description="Customize your password requirements">
			<div className="space-y-6">
				{/* Length Slider */}
				<div className="space-y-3">
					<div className="flex items-center justify-between">
						<Label className="text-black dark:text-white">Length</Label>
						<span className="text-sm text-neutral-600 dark:text-neutral-400">
							{length} characters
						</span>
					</div>
					<Slider
						value={[length]}
						onValueChange={(value) => onLengthChange(value[0])}
						max={128}
						min={4}
						step={1}
						className="w-full"
					/>
				</div>

				{/* Character Type Options */}
				<div className="space-y-4">
					<Label className="text-black dark:text-white">Include Characters</Label>
					{characterOptions.map(({ key, label }) => (
						<div key={key} className="flex items-center space-x-2">
							<Checkbox
								id={key}
								checked={options[key]}
								onCheckedChange={(checked) => onOptionChange(key, !!checked)}
							/>
							<Label htmlFor={key} className="text-neutral-700 dark:text-neutral-300">
								{label}
							</Label>
						</div>
					))}
				</div>
			</div>
		</ToolSection>
	);
}
