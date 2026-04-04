import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Database, FileCode2, Copy, AlertCircle, Wand2 } from "lucide-react";
import { toast } from "sonner";

type Dialect = "postgres" | "mysql" | "prisma" | "mongoose";

interface FieldMeta {
	name: string;
	type: string;
	isNullable: boolean;
	maxLength: number;
}

export default function SchemaGenerator() {
	const [input, setInput] = useState<string>(
		'[\n  {\n    "id": 1,\n    "name": "John Doe",\n    "email": "john@example.com",\n    "isActive": true,\n    "createdAt": "2023-01-15T08:30:00Z"\n  }\n]',
	);
	const [tableName, setTableName] = useState("users");
	const [dialect, setDialect] = useState<Dialect>("postgres");
	const [output, setOutput] = useState("");
	const [error, setError] = useState<string | null>(null);

	const inferType = (value: string, currentType: string = ""): string => {
		if (value === null || value === undefined) return currentType || "VARCHAR(255)";

		const type = typeof value;

		if (type === "boolean") return "boolean";
		if (type === "number") return Number.isInteger(value) ? "integer" : "float";
		if (type === "string") {
			// Check if it's a date
			const dateRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/;
			if (dateRegex.test(value)) return "date";

			if (value.length > 255) return "text";
			return "string";
		}

		if (Array.isArray(value)) return "array";
		if (type === "object") return "json";

		return "string";
	};

	const mapTypeToDialect = (baseType: string, dialect: Dialect): string => {
		switch (dialect) {
			case "postgres":
				if (baseType === "integer") return "INTEGER";
				if (baseType === "float") return "DOUBLE PRECISION";
				if (baseType === "boolean") return "BOOLEAN";
				if (baseType === "date") return "TIMESTAMP WITH TIME ZONE";
				if (baseType === "text") return "TEXT";
				if (baseType === "json") return "JSONB";
				if (baseType === "array") return "JSONB";
				return "VARCHAR(255)";

			case "mysql":
				if (baseType === "integer") return "INT";
				if (baseType === "float") return "DOUBLE";
				if (baseType === "boolean") return "TINYINT(1)";
				if (baseType === "date") return "DATETIME";
				if (baseType === "text") return "TEXT";
				if (baseType === "json") return "JSON";
				if (baseType === "array") return "JSON";
				return "VARCHAR(255)";

			case "prisma":
				if (baseType === "integer") return "Int";
				if (baseType === "float") return "Float";
				if (baseType === "boolean") return "Boolean";
				if (baseType === "date") return "DateTime";
				if (baseType === "json" || baseType === "array") return "Json";
				return "String";

			case "mongoose":
				if (baseType === "integer" || baseType === "float") return "Number";
				if (baseType === "boolean") return "Boolean";
				if (baseType === "date") return "Date";
				if (baseType === "json" || baseType === "array") return "Schema.Types.Mixed";
				return "String";

			default:
				return "VARCHAR(255)";
		}
	};

	const generateSchema = () => {
		setError(null);

		if (!input.trim()) {
			setError("Please provide some input data");
			return;
		}

		try {
			// Parse input (basic JSON parsing)
			let parsed: unknown;
			try {
				parsed = JSON.parse(input);
			} catch {
				throw new Error(
					"Invalid JSON format. Please provide a valid JSON object or array of objects.",
				);
			}

			// Ensure it's an array for analysis
			const items = Array.isArray(parsed) ? parsed : [parsed];

			if (items.length === 0) {
				throw new Error("The array is empty. Provide at least one object to infer schema.");
			}

			// Map to hold field analysis
			const fields = new Map<string, FieldMeta>();

			// Analyze all objects to determine types and nullability
			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				if (typeof item !== "object" || item === null) continue;

				Object.keys(item).forEach((key) => {
					const value = item[key];
					const existing = fields.get(key);

					const baseType = inferType(value, existing?.type);

					fields.set(key, {
						name: key,
						type: baseType,
						// If it wasn't in previous objects, it must be nullable
						isNullable: existing ? existing.isNullable || value === null : i > 0 || value === null,
						maxLength:
							typeof value === "string" ? Math.max(existing?.maxLength || 0, value.length) : 0,
					});
				});

				// Check if any previously found keys are missing in this object (meaning they are nullable)
				for (const [key, existing] of fields.entries()) {
					if (!(key in item)) {
						fields.set(key, { ...existing, isNullable: true });
					}
				}
			}

			// Generate output based on dialect
			let outStr = "";
			const fieldList = Array.from(fields.values());

			if (dialect === "postgres" || dialect === "mysql") {
				outStr = `CREATE TABLE ${tableName} (\n`;
				const lines = fieldList.map((f) => {
					let typeStr = mapTypeToDialect(f.type, dialect);
					// Primary key heuristic
					if (f.name.toLowerCase() === "id") {
						typeStr += dialect === "postgres" ? " PRIMARY KEY" : " PRIMARY KEY AUTO_INCREMENT";
					} else if (!f.isNullable) {
						typeStr += " NOT NULL";
					}
					return `  ${f.name} ${typeStr}`;
				});
				outStr += lines.join(",\n");
				outStr += `\n);`;
			} else if (dialect === "prisma") {
				outStr = `model ${tableName.charAt(0).toUpperCase() + tableName.slice(1)} {\n`;
				const lines = fieldList.map((f) => {
					let typeStr = mapTypeToDialect(f.type, dialect);
					if (f.isNullable && f.name.toLowerCase() !== "id") typeStr += "?";

					let modifiers = "";
					if (f.name.toLowerCase() === "id") {
						modifiers =
							f.type === "string" ? " @id @default(uuid())" : " @id @default(autoincrement())";
					}
					return `  ${f.name} ${typeStr}${modifiers}`;
				});
				outStr += lines.join("\n");
				outStr += `\n}`;
			} else if (dialect === "mongoose") {
				outStr = `const ${tableName}Schema = new mongoose.Schema({\n`;
				const lines = fieldList.map((f) => {
					let typeStr = mapTypeToDialect(f.type, dialect);
					let reqStr = !f.isNullable && f.name.toLowerCase() !== "id" ? `, required: true` : "";
					return `  ${f.name}: { type: ${typeStr}${reqStr} }`;
				});
				outStr += lines.join(",\n");
				outStr += `\ntimestamps: true\n});\n\nconst ${tableName.charAt(0).toUpperCase() + tableName.slice(1)} = mongoose.model('${tableName.charAt(0).toUpperCase() + tableName.slice(1)}', ${tableName}Schema);`;
			}

			setOutput(outStr);
			toast.success("Schema generated successfully!");
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		}
	};

	const copyToClipboard = () => {
		if (!output) return;
		navigator.clipboard.writeText(output);
		toast.success("Copied to clipboard");
	};

	return (
		<div className="grid gap-6 md:grid-cols-2">
			{/* Input Container */}
			<Card className="border-border/50 flex h-full flex-col">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Database className="text-primary h-5 w-5" />
						Input Data
					</CardTitle>
					<CardDescription>Paste your JSON array or object to infer schema</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-1 flex-col gap-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-1.5">
							<Label>Table/Model Name</Label>
							<input
								className="border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
								value={tableName}
								onChange={(e) => setTableName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))}
								placeholder="e.g. users"
							/>
						</div>
						<div className="space-y-1.5">
							<Label>Output Dialect</Label>
							<Select value={dialect} onValueChange={(v) => setDialect(v as Dialect)}>
								<SelectTrigger>
									<SelectValue placeholder="Select dialect" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="postgres">PostgreSQL</SelectItem>
									<SelectItem value="mysql">MySQL</SelectItem>
									<SelectItem value="prisma">Prisma</SelectItem>
									<SelectItem value="mongoose">Mongoose (MongoDB)</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="flex min-h-[300px] flex-1 flex-col">
						<Textarea
							value={input}
							onChange={(e) => setInput(e.target.value)}
							className="flex-1 resize-none font-mono text-sm"
							placeholder='[{"name": "John"}]'
						/>
					</div>

					{error && (
						<div className="flex items-start gap-2 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
							<AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
							<span>{error}</span>
						</div>
					)}

					<Button onClick={generateSchema} className="w-full gap-2">
						<Wand2 className="h-4 w-4" /> Generate Schema
					</Button>
				</CardContent>
			</Card>

			{/* Output Container */}
			<Card className="border-border/50 flex h-full flex-col">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<div className="space-y-1.5">
						<CardTitle className="flex items-center gap-2">
							<FileCode2 className="text-primary h-5 w-5" />
							Generated Schema
						</CardTitle>
						<CardDescription>Your inferred schema code</CardDescription>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={copyToClipboard}
						disabled={!output}
						className="h-8"
					>
						<Copy className="mr-2 h-4 w-4" />
						Copy
					</Button>
				</CardHeader>
				<CardContent className="flex flex-1 flex-col pt-0">
					<div className="bg-muted/30 relative flex min-h-[300px] flex-1 overflow-hidden rounded-lg border">
						{output ? (
							<textarea
								className="w-full flex-1 resize-none border-0 bg-transparent p-4 font-mono text-sm outline-none focus:ring-0"
								readOnly
								value={output}
							/>
						) : (
							<div className="text-muted-foreground absolute inset-0 flex flex-col items-center justify-center opacity-50">
								<Wand2 className="mb-2 h-12 w-12" />
								<p>Click generate to see the magical output</p>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
