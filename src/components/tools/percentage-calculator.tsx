import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function PercentageCalculator() {
	// Scenario 1: What is Y % of X?
	const [s1Y, setS1Y] = useState("");
	const [s1X, setS1X] = useState("");

	const val1Y = parseFloat(s1Y);
	const val1X = parseFloat(s1X);
	const res1 = (val1Y / 100) * val1X;

	// Scenario 2: X is what % of Y?
	const [s2X, setS2X] = useState("");
	const [s2Y, setS2Y] = useState("");

	const val2X = parseFloat(s2X);
	const val2Y = parseFloat(s2Y);
	const res2 = (val2X / val2Y) * 100;

	// Scenario 3: Percentage increase/decrease from X to Y
	const [s3X, setS3X] = useState("");
	const [s3Y, setS3Y] = useState("");

	const val3X = parseFloat(s3X);
	const val3Y = parseFloat(s3Y);
	const res3 = ((val3Y - val3X) / val3X) * 100;

	const formatResult = (result: number) => {
		if (Number.isNaN(result) || !Number.isFinite(result)) return "-";
		// To avoid 0.30000000000000004
		return Number(result.toFixed(6)).toLocaleString(undefined, { maximumFractionDigits: 6 });
	};

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{/* Calculator 1 */}
			<Card className="h-fit transition-shadow hover:shadow-md">
				<CardHeader>
					<CardTitle>Percentage of a Value</CardTitle>
					<CardDescription>Calculate what Y% of a number X is.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex flex-wrap items-center gap-2">
						<span className="text-sm font-medium">What is</span>
						<Input
							type="number"
							value={s1Y}
							onChange={(e) => setS1Y(e.target.value)}
							className="w-20"
							placeholder="Y"
						/>
						<span className="text-sm font-medium">% of</span>
						<Input
							type="number"
							value={s1X}
							onChange={(e) => setS1X(e.target.value)}
							className="w-24 flex-1"
							placeholder="X"
						/>
						<span className="text-sm font-medium">?</span>
					</div>
					<div className="bg-primary/10 text-primary border-primary/20 rounded-xl border p-6 text-center">
						<div className="mb-1 text-xs font-semibold tracking-wider uppercase opacity-70">
							Result
						</div>
						<div className="text-3xl font-bold break-all">{formatResult(res1)}</div>
					</div>
				</CardContent>
			</Card>

			{/* Calculator 2 */}
			<Card className="h-fit transition-shadow hover:shadow-md">
				<CardHeader>
					<CardTitle>Find the Percentage</CardTitle>
					<CardDescription>Calculate what percentage a number X is out of Y.</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex flex-wrap items-center gap-2">
						<Input
							type="number"
							value={s2X}
							onChange={(e) => setS2X(e.target.value)}
							className="w-24 flex-1"
							placeholder="X"
						/>
						<span className="text-sm font-medium">is what % of</span>
						<Input
							type="number"
							value={s2Y}
							onChange={(e) => setS2Y(e.target.value)}
							className="w-24 flex-1"
							placeholder="Y"
						/>
						<span className="text-sm font-medium">?</span>
					</div>
					<div className="bg-primary/10 text-primary border-primary/20 rounded-xl border p-6 text-center">
						<div className="mb-1 text-xs font-semibold tracking-wider uppercase opacity-70">
							Result
						</div>
						<div className="text-3xl font-bold break-all">
							{formatResult(res2)}
							{!Number.isNaN(res2) && Number.isFinite(res2) && "%"}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Calculator 3 */}
			<Card className="h-fit transition-shadow hover:shadow-md md:col-span-2 lg:col-span-1">
				<CardHeader>
					<CardTitle>Percentage Change</CardTitle>
					<CardDescription>
						Calculate the percentage increase or decrease from X to Y.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="flex flex-wrap items-center gap-2">
						<span className="text-sm font-medium">From</span>
						<Input
							type="number"
							value={s3X}
							onChange={(e) => setS3X(e.target.value)}
							className="w-24 flex-1"
							placeholder="X"
						/>
						<span className="text-sm font-medium">to</span>
						<Input
							type="number"
							value={s3Y}
							onChange={(e) => setS3Y(e.target.value)}
							className="w-24 flex-1"
							placeholder="Y"
						/>
					</div>
					<div className="bg-primary/10 text-primary border-primary/20 rounded-xl border p-6 text-center">
						<div className="mb-1 text-xs font-semibold tracking-wider uppercase opacity-70">
							{!Number.isNaN(res3) && Number.isFinite(res3)
								? res3 > 0
									? "Increase"
									: res3 < 0
										? "Decrease"
										: "No Change"
								: "Result"}
						</div>
						<div className="text-3xl font-bold break-all">
							{formatResult(Math.abs(res3))}
							{!Number.isNaN(res3) && Number.isFinite(res3) && "%"}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
