import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function RegexTester() {
	const [pattern, setPattern] = useState("[A-Z][a-z]+");
	const [flags, setFlags] = useState("g");
	const [testString, setTestString] = useState(
		"Hello world! This is a Regex tester where we Match Capitalized words.",
	);

	// Parse toggles based on flags string
	const isGlobal = flags.includes("g");
	const isIgnoreCase = flags.includes("i");
	const isMultiline = flags.includes("m");

	const updateFlags = (flag: string, active: boolean) => {
		let newFlags = flags.replace(flag, "");
		if (active) newFlags += flag;
		setFlags(newFlags);
	};

	const { elements, error, matchCount } = useMemo(() => {
		if (!pattern)
			return {
				elements: (
					<span className="text-muted-foreground opacity-50">
						{testString || "Enter text to test..."}
					</span>
				),
				error: null,
				matchCount: 0,
			};

		try {
			// Validate syntax
			new RegExp(pattern, flags);
			// We build an execRegex to find all occurrences manually for highlighting.
			const execFlags = flags.includes("g") ? flags : flags + "g";
			const execRegex = new RegExp(pattern, execFlags);

			const matches = [];
			let match: RegExpExecArray | null;
			let circuitBreaker = 0;
			while (true) {
				match = execRegex.exec(testString);
				if (match === null || circuitBreaker >= 10000) break;
				circuitBreaker++;
				// Skip zero-length to prevent purely infinite loops on purely empty patterns
				if (match.index === execRegex.lastIndex) execRegex.lastIndex++;
				if (match[0].length === 0) continue;

				matches.push({ start: match.index, end: match.index + match[0].length, value: match[0] });

				// If not global, we only want the absolute first match.
				if (!flags.includes("g")) break;
			}

			const els = [];
			let currentIdx = 0;
			matches.forEach((m, i) => {
				if (m.start > currentIdx) {
					els.push(<span key={`text-${i}`}>{testString.substring(currentIdx, m.start)}</span>);
				}
				els.push(
					<span
						key={`match-${i}`}
						className="bg-primary/20 text-primary rounded-sm font-semibold shadow-[0_0_0_1px_hsl(var(--primary)/0.3)]"
					>
						{m.value}
					</span>,
				);
				currentIdx = m.end;
			});

			if (currentIdx < testString.length) {
				els.push(<span key={`text-end`}>{testString.substring(currentIdx)}</span>);
			}

			return {
				elements: els.length > 0 ? els : testString,
				error: null,
				matchCount: matches.length,
			};
		} catch (err: unknown) {
			return { elements: testString, error: (err as Error).message, matchCount: 0 };
		}
	}, [pattern, flags, testString]);

	return (
		<div className="grid gap-6 md:grid-cols-12">
			{/* Controls */}
			<Card className="h-fit md:col-span-12 lg:col-span-5">
				<CardHeader>
					<CardTitle>Expression</CardTitle>
					<CardDescription>Write your regular expression underneath</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-3">
						<Label htmlFor="pattern">Regular Expression</Label>
						<div className="group relative flex items-center gap-2">
							<span className="text-muted-foreground translate-y-px font-mono text-xl font-bold select-none">
								/
							</span>
							<Input
								id="pattern"
								value={pattern}
								onChange={(e) => setPattern(e.target.value)}
								className={`font-mono text-base ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
								placeholder="Enter regex pattern here..."
							/>
							<span className="text-muted-foreground -translate-y-px font-mono text-xl font-bold select-none">
								/
							</span>
							<Input
								title="Flags"
								value={flags}
								onChange={(e) => setFlags(e.target.value)}
								className="w-16 font-mono text-base"
							/>
						</div>
						{error ? (
							<p className="text-destructive mt-1 flex items-center text-sm">
								<AlertCircle className="mr-1 inline-block h-4 w-4" />
								{error}
							</p>
						) : (
							<p className="mt-1 flex items-center text-sm text-green-600 dark:text-green-400">
								<CheckCircle2 className="mr-1 inline-block h-4 w-4" />
								Valid Expression
							</p>
						)}
					</div>

					<div className="space-y-4 pt-2">
						<Label>Common Flags</Label>
						<div className="flex items-center justify-between space-x-2">
							<Label htmlFor="flag-g" className="cursor-pointer font-normal">
								<b>g</b> (Global) - Match all occurrences
							</Label>
							<Switch
								id="flag-g"
								checked={isGlobal}
								onCheckedChange={(val) => updateFlags("g", val)}
							/>
						</div>

						<div className="flex items-center justify-between space-x-2">
							<Label htmlFor="flag-i" className="cursor-pointer font-normal">
								<b>i</b> (Case Insensitive) - Ignore capitalization
							</Label>
							<Switch
								id="flag-i"
								checked={isIgnoreCase}
								onCheckedChange={(val) => updateFlags("i", val)}
							/>
						</div>

						<div className="flex items-center justify-between space-x-2">
							<Label htmlFor="flag-m" className="cursor-pointer font-normal">
								<b>m</b> (Multiline) - Make ^ and $ match line boundaries
							</Label>
							<Switch
								id="flag-m"
								checked={isMultiline}
								onCheckedChange={(val) => updateFlags("m", val)}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Test Area */}
			<Card className="flex h-fit flex-col md:col-span-12 lg:col-span-7">
				<CardHeader className="pb-3">
					<div className="flex items-center justify-between">
						<CardTitle>Test String</CardTitle>
						{!error && pattern && (
							<span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-semibold">
								{matchCount} match{matchCount !== 1 ? "es" : ""} found
							</span>
						)}
					</div>
				</CardHeader>
				<CardContent className="flex flex-1 flex-col gap-4">
					<Textarea
						placeholder="Insert the text you want to test against your regex here..."
						value={testString}
						onChange={(e) => setTestString(e.target.value)}
						className="min-h-[160px] resize-y font-mono"
					/>

					<div className="mt-2 flex-1">
						<Label className="text-muted-foreground mt-1 mb-2 block text-xs font-semibold tracking-wider uppercase">
							Highlight Preview
						</Label>
						<div className="bg-muted/30 min-h-[160px] rounded-md border p-4 font-mono text-sm leading-relaxed break-words whitespace-pre-wrap">
							{elements}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
