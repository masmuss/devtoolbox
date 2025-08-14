import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SlugOptionsProps {
	separator: string;
	lowercase: boolean;
	removeSpecialChars: boolean;
	maxLength: string;
	onSeparatorChange: (value: string) => void;
	onLowercaseChange: (checked: boolean) => void;
	onRemoveSpecialCharsChange: (checked: boolean) => void;
	onMaxLengthChange: (value: string) => void;
}

export function SlugOptions({
	separator,
	lowercase,
	removeSpecialChars,
	maxLength,
	onSeparatorChange,
	onLowercaseChange,
	onRemoveSpecialCharsChange,
	onMaxLengthChange,
}: SlugOptionsProps) {
	return (
		<Card className="border-neutral-200 dark:border-neutral-800">
			<CardHeader>
				<CardTitle className="text-black dark:text-white">Options</CardTitle>
				<CardDescription className="text-neutral-600 dark:text-neutral-400">
					Customize how your slug is generated
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2">
						<Label className="text-black dark:text-white">Separator</Label>
						<Select value={separator} onValueChange={onSeparatorChange}>
							<SelectTrigger className="border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="-">Hyphen (-)</SelectItem>
								<SelectItem value="_">Underscore (_)</SelectItem>
								<SelectItem value=".">Dot (.)</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label className="text-black dark:text-white">Max Length (optional)</Label>
						<Input
							type="number"
							value={maxLength}
							onChange={(e) => onMaxLengthChange(e.target.value)}
							placeholder="No limit"
							min="1"
							max="200"
							className="border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
						/>
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex items-center space-x-2">
						<Checkbox id="lowercase" checked={lowercase} onCheckedChange={onLowercaseChange} />
						<Label htmlFor="lowercase" className="text-neutral-700 dark:text-neutral-300">
							Convert to lowercase
						</Label>
					</div>

					<div className="flex items-center space-x-2">
						<Checkbox
							id="remove-special"
							checked={removeSpecialChars}
							onCheckedChange={onRemoveSpecialCharsChange}
						/>
						<Label htmlFor="remove-special" className="text-neutral-700 dark:text-neutral-300">
							Remove special characters and accents
						</Label>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
