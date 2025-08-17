import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface UnitSelectorProps {
	amount: string;
	unit: string;
	onAmountChange: (amount: string) => void;
	onUnitChange: (unit: string) => void;
}

export function UnitSelector({ amount, unit, onAmountChange, onUnitChange }: UnitSelectorProps) {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<div className="space-y-2">
				<Label htmlFor="amount">Amount</Label>
				<Input
					id="amount"
					type="number"
					value={amount}
					onChange={(e) => onAmountChange(e.target.value)}
					placeholder="1"
					className="font-mono"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="unit">Unit</Label>
				<Select value={unit} onValueChange={onUnitChange}>
					<SelectTrigger>
						<SelectValue placeholder="Select unit" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="seconds">Seconds</SelectItem>
						<SelectItem value="minutes">Minutes</SelectItem>
						<SelectItem value="hours">Hours</SelectItem>
						<SelectItem value="days">Days</SelectItem>
						<SelectItem value="months">Months</SelectItem>
						<SelectItem value="years">Years</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
