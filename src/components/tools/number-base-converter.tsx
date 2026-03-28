import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function NumberBaseConverter() {
	const [values, setValues] = useState({
		dec: "",
		hex: "",
		bin: "",
		oct: "",
	});
	const [error, setError] = useState("");

	const updateValues = (value: string, base: 10 | 16 | 2 | 8) => {
		if (!value.trim()) {
			setValues({ dec: "", hex: "", bin: "", oct: "" });
			setError("");
			return;
		}

		try {
			// Remove commas or spaces if user added them
			const cleanValue = value.replace(/[\s,]/g, "");
			let bigIntVal: bigint;

			if (base === 10) bigIntVal = BigInt(cleanValue);
			else if (base === 16) bigIntVal = BigInt(`0x${cleanValue}`);
			else if (base === 8) bigIntVal = BigInt(`0o${cleanValue}`);
			else if (base === 2) bigIntVal = BigInt(`0b${cleanValue}`);
			else throw new Error("Invalid base");

			setValues({
				dec: bigIntVal.toString(10),
				hex: bigIntVal.toString(16).toUpperCase(),
				bin: bigIntVal.toString(2),
				oct: bigIntVal.toString(8),
			});
			setError("");
		} catch (e) {
			setError(`Invalid format for base ${base}`);
			// Still update the field they are typing in so it doesn't become unresponsive
			const newValues = { ...values };
			if (base === 10) newValues.dec = value;
			if (base === 16) newValues.hex = value;
			if (base === 2) newValues.bin = value;
			if (base === 8) newValues.oct = value;
			setValues(newValues);
		}
	};

	const copyToClipboard = (text: string, label: string) => {
		if (!text) return;
		navigator.clipboard.writeText(text);
		toast.success(`${label} copied to clipboard!`);
	};

	const clearAll = () => {
		setValues({ dec: "", hex: "", bin: "", oct: "" });
		setError("");
	};

	return (
		<div className="grid gap-6 md:grid-cols-2">
			<Card className="md:col-span-2">
				<CardHeader className="flex flex-row items-center justify-between pb-4">
					<div className="space-y-1">
						<CardTitle>Converter</CardTitle>
						<CardDescription>
							Type in any field to instantly convert to all other bases. Supports infinitely large
							numbers.
						</CardDescription>
					</div>
					<Button variant="outline" size="sm" onClick={clearAll}>
						<Trash2 className="mr-2 h-4 w-4" />
						Clear All
					</Button>
				</CardHeader>
				<CardContent className="space-y-6">
					{error && (
						<div className="bg-destructive/15 text-destructive rounded-md p-3 text-sm">{error}</div>
					)}

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="dec">Decimal (Base 10)</Label>
							<Button
								variant="ghost"
								size="icon"
								className="h-6 w-6"
								onClick={() => copyToClipboard(values.dec, "Decimal")}
							>
								<Copy className="h-4 w-4" />
							</Button>
						</div>
						<Input
							id="dec"
							value={values.dec}
							onChange={(e) => updateValues(e.target.value, 10)}
							placeholder="e.g. 42"
							className="font-mono text-lg"
						/>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="hex">Hexadecimal (Base 16)</Label>
							<Button
								variant="ghost"
								size="icon"
								className="h-6 w-6"
								onClick={() => copyToClipboard(values.hex, "Hexadecimal")}
							>
								<Copy className="h-4 w-4" />
							</Button>
						</div>
						<Input
							id="hex"
							value={values.hex}
							onChange={(e) => updateValues(e.target.value, 16)}
							placeholder="e.g. 2A"
							className="font-mono text-lg uppercase"
						/>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="bin">Binary (Base 2)</Label>
							<Button
								variant="ghost"
								size="icon"
								className="h-6 w-6"
								onClick={() => copyToClipboard(values.bin, "Binary")}
							>
								<Copy className="h-4 w-4" />
							</Button>
						</div>
						<Input
							id="bin"
							value={values.bin}
							onChange={(e) => updateValues(e.target.value, 2)}
							placeholder="e.g. 101010"
							className="font-mono text-lg"
						/>
					</div>

					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="oct">Octal (Base 8)</Label>
							<Button
								variant="ghost"
								size="icon"
								className="h-6 w-6"
								onClick={() => copyToClipboard(values.oct, "Octal")}
							>
								<Copy className="h-4 w-4" />
							</Button>
						</div>
						<Input
							id="oct"
							value={values.oct}
							onChange={(e) => updateValues(e.target.value, 8)}
							placeholder="e.g. 52"
							className="font-mono text-lg"
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
