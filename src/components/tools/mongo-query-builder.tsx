import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Database, Plus, Trash2, Copy, FileJson, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

type Operator =
	| "$eq"
	| "$ne"
	| "$gt"
	| "$gte"
	| "$lt"
	| "$lte"
	| "$in"
	| "$nin"
	| "$regex"
	| "$exists";
type ValueType = "string" | "number" | "boolean" | "array" | "null";

interface Rule {
	id: string;
	field: string;
	operator: Operator;
	value: string;
	type: ValueType;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export default function MongoQueryBuilder() {
	const [logicalOperator, setLogicalOperator] = useState<"$and" | "$or">("$and");
	const [rules, setRules] = useState<Rule[]>([
		{ id: generateId(), field: "status", operator: "$eq", value: "active", type: "string" },
	]);
	const [outputQuery, setOutputQuery] = useState("");

	const addRule = () => {
		setRules([
			...rules,
			{ id: generateId(), field: "", operator: "$eq", value: "", type: "string" },
		]);
	};

	const removeRule = (id: string) => {
		if (rules.length <= 1) return;
		setRules(rules.filter((r) => r.id !== id));
	};

	const updateRule = (id: string, field: keyof Rule, value: string) => {
		setRules(rules.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
	};

	// Generate Query JSON
	useEffect(() => {
		const buildQuery = () => {
			if (rules.length === 0) return "{}";

			const parseValue = (val: string, type: ValueType) => {
				if (type === "number") return Number(val) || 0;
				if (type === "boolean") return val === "true";
				if (type === "null") return null;
				if (type === "array") {
					return val
						.split(",")
						.map((v) => v.trim())
						.filter(Boolean);
				}
				return val;
			};

			const conditions: Record<string, unknown>[] = [];

			for (const rule of rules) {
				if (!rule.field.trim()) continue;

				const parsedVal = parseValue(rule.value, rule.type);

				// Simplified condition for $eq
				if (rule.operator === "$eq") {
					conditions.push({ [rule.field]: parsedVal });
				}
				// Special case for $exists (takes boolean)
				else if (rule.operator === "$exists") {
					conditions.push({ [rule.field]: { $exists: rule.value === "true" } });
				}
				// Standard operators
				else {
					conditions.push({ [rule.field]: { [rule.operator]: parsedVal } });
				}
			}

			if (conditions.length === 0) return "{}";

			let finalQuery = {};
			if (conditions.length === 1) {
				// No need for $and / $or wrapper if there's only 1 condition
				finalQuery = conditions[0];
			} else {
				finalQuery = { [logicalOperator]: conditions };
			}

			return JSON.stringify(finalQuery, null, 2);
		};

		setOutputQuery(buildQuery());
	}, [rules, logicalOperator]);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(outputQuery);
		toast.success("Query copied to clipboard");
	};

	return (
		<div className="grid gap-6 space-y-0 md:grid-cols-12">
			{/* Builder Section */}
			<div className="flex h-fit flex-col gap-6 md:col-span-7 lg:col-span-7">
				<Card className="border-border/50">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Database className="text-primary h-5 w-5" />
							Visual Builder
						</CardTitle>
						<CardDescription>
							Construct MongoDB filter predicates without typing JSON
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="bg-muted/30 flex items-center gap-3 rounded-lg border p-3">
							<span className="text-sm font-medium">Match rules using:</span>
							<Select
								value={logicalOperator}
								onValueChange={(val: "$and" | "$or") => setLogicalOperator(val)}
							>
								<SelectTrigger className="bg-background w-[120px]">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="$and">AND ($and)</SelectItem>
									<SelectItem value="$or">OR ($or)</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-3">
							{rules.map((rule, idx) => (
								<div
									key={rule.id}
									className="bg-card group relative flex flex-col items-start gap-2 rounded-lg border p-3 sm:flex-row sm:items-center"
								>
									<div className="text-muted-foreground bg-background absolute top-1/2 -left-3 hidden w-6 -translate-y-1/2 rounded-full border text-center font-mono text-xs sm:block">
										{idx + 1}
									</div>

									<Input
										className="min-w-[120px] flex-1"
										placeholder="Field (e.g. age)"
										value={rule.field}
										onChange={(e) => updateRule(rule.id, "field", e.target.value)}
									/>

									<Select
										value={rule.operator}
										onValueChange={(val) => updateRule(rule.id, "operator", val)}
									>
										<SelectTrigger className="w-full sm:w-[130px]">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="$eq">== ($eq)</SelectItem>
											<SelectItem value="$ne">!= ($ne)</SelectItem>
											<SelectItem value="$gt">&gt; ($gt)</SelectItem>
											<SelectItem value="$gte">&gt;= ($gte)</SelectItem>
											<SelectItem value="$lt">&lt; ($lt)</SelectItem>
											<SelectItem value="$lte">&lt;= ($lte)</SelectItem>
											<SelectItem value="$in">In Array ($in)</SelectItem>
											<SelectItem value="$nin">Not In ($nin)</SelectItem>
											<SelectItem value="$regex">Regex ($regex)</SelectItem>
											<SelectItem value="$exists">Exists ($exists)</SelectItem>
										</SelectContent>
									</Select>

									<Select
										value={rule.type}
										onValueChange={(val) => updateRule(rule.id, "type", val as ValueType)}
									>
										<SelectTrigger className="w-full sm:w-[110px]">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="string">String</SelectItem>
											<SelectItem value="number">Number</SelectItem>
											<SelectItem value="boolean">Boolean</SelectItem>
											<SelectItem value="array">Array (csv)</SelectItem>
											<SelectItem value="null">Null</SelectItem>
										</SelectContent>
									</Select>

									{rule.type !== "null" &&
										(rule.type === "boolean" || rule.operator === "$exists" ? (
											<Select
												value={rule.value || "true"}
												onValueChange={(val) => updateRule(rule.id, "value", val)}
											>
												<SelectTrigger className="min-w-[100px] flex-1">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="true">True</SelectItem>
													<SelectItem value="false">False</SelectItem>
												</SelectContent>
											</Select>
										) : (
											<Input
												className="min-w-[100px] flex-1"
												placeholder={rule.type === "array" ? "a,b,c" : "Value"}
												value={rule.value}
												type={rule.type === "number" ? "number" : "text"}
												onChange={(e) => updateRule(rule.id, "value", e.target.value)}
											/>
										))}

									<Button
										variant="ghost"
										size="icon"
										className="text-muted-foreground shrink-0 self-end hover:bg-red-500/10 hover:text-red-500 sm:self-auto"
										onClick={() => removeRule(rule.id)}
										disabled={rules.length === 1}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							))}
						</div>

						<Button variant="outline" className="w-full border-dashed" onClick={addRule}>
							<Plus className="mr-2 h-4 w-4" />
							Add Condition
						</Button>
					</CardContent>
				</Card>
			</div>

			{/* Code Output Section */}
			<div className="h-fit md:col-span-5 lg:col-span-5">
				<Card className="border-border/50 flex h-full flex-col">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<div className="space-y-1.5">
							<CardTitle className="flex items-center gap-2">
								<FileJson className="text-primary h-5 w-5" />
								Query JSON
							</CardTitle>
						</div>
						<Button variant="ghost" size="sm" onClick={copyToClipboard}>
							<Copy className="mr-2 h-4 w-4" /> Copy
						</Button>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<div className="bg-muted/40 relative min-h-[300px] overflow-hidden rounded-lg border">
							<textarea
								className="h-full min-h-[300px] w-full resize-none border-0 bg-transparent p-4 font-mono text-sm outline-none focus:ring-0"
								readOnly
								value={outputQuery}
							/>
						</div>

						<div className="bg-primary/5 text-primary border-primary/20 flex gap-2 rounded-lg border p-3 text-xs">
							<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
							<p>
								This query output maps directly to the standard MongoDB Node.js driver or Mongoose{" "}
								<code>.find()</code> filter parameters.
							</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
