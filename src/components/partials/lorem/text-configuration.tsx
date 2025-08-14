import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Shuffle } from "lucide-react";

export type PresetType = "paragraphs" | "sentences" | "words";

interface TextConfigurationProps {
	type: PresetType;
	count: string;
	startWithLorem: boolean;
	onTypeChange: (type: PresetType) => void;
	onCountChange: (count: string) => void;
	onStartWithLoremChange: (startWithLorem: boolean) => void;
	onGenerate: () => void;
	onClear: () => void;
}

export function TextConfiguration({
	type,
	count,
	startWithLorem,
	onTypeChange,
	onCountChange,
	onStartWithLoremChange,
	onGenerate,
	onClear,
}: TextConfigurationProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<FileText className="h-5 w-5" />
					Text Configuration
				</CardTitle>
				<CardDescription>Customize your Lorem Ipsum text</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="type">Text Type</Label>
						<Select value={type} onValueChange={onTypeChange}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="words">Words</SelectItem>
								<SelectItem value="sentences">Sentences</SelectItem>
								<SelectItem value="paragraphs">Paragraphs</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="count">Number of {type.charAt(0).toUpperCase() + type.slice(1)}</Label>
						<Input
							id="count"
							type="number"
							min="1"
							max="100"
							value={count}
							onChange={(e) => onCountChange(e.target.value)}
						/>
					</div>

					<div className="flex items-center space-x-2">
						<Checkbox
							id="startWithLorem"
							checked={startWithLorem}
							onCheckedChange={(checked) => onStartWithLoremChange(checked as boolean)}
						/>
						<Label htmlFor="startWithLorem" className="text-sm">
							Start with "Lorem ipsum"
						</Label>
					</div>

					<div className="flex gap-2">
						<Button onClick={onGenerate} className="flex-1">
							<Shuffle className="mr-2 h-4 w-4" />
							Generate Text
						</Button>
						<Button onClick={onClear} variant="outline">
							Clear
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
