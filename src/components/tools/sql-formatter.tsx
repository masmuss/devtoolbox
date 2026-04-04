import { useState, useEffect } from "react";
import { format as formatter } from "sql-formatter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Copy, Trash2, Wand2, Database, Check } from "lucide-react";
import { toast } from "sonner";

const SAMPLES = {
	short: `SELECT id, name FROM users WHERE active = 1;`,
	medium: `SELECT u.id, u.name, count(o.id) as total_orders FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.active = 1 GROUP BY u.id, u.name ORDER BY total_orders DESC;`,
	long: `WITH active_users AS (SELECT id, name, created_at FROM users WHERE status = 'active' AND last_login >= current_date - interval '30 days'), top_products AS (SELECT product_id, COUNT(*) as sales_count FROM order_items GROUP BY product_id HAVING COUNT(*) > 100) SELECT au.name, tp.product_id, SUM(oi.quantity * oi.price) as total_revenue FROM active_users au JOIN orders o ON au.id = o.user_id JOIN order_items oi ON o.id = oi.order_id JOIN top_products tp ON oi.product_id = tp.product_id WHERE o.status = 'completed' GROUP BY au.name, tp.product_id ORDER BY total_revenue DESC LIMIT 50;`,
	complex: `SELECT * FROM (SELECT e.employee_id, e.first_name, e.last_name, d.department_name, MAX(s.salary) OVER (PARTITION BY e.department_id) as max_dept_salary, AVG(s.salary) OVER (PARTITION BY e.department_id) as avg_dept_salary, RANK() OVER (PARTITION BY e.department_id ORDER BY s.salary DESC) as salary_rank FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN salaries s ON e.employee_id = s.employee_id WHERE s.to_date = '9999-01-01') ranked_salaries WHERE salary_rank <= 3;`,
};

type SqlLanguage = "sql" | "postgresql" | "mysql" | "mariadb" | "sqlite" | "tsql" | "plsql";
type IndentStyle = "2-spaces" | "4-spaces" | "tabs";

export default function SqlFormatter() {
	const [input, setInput] = useState(SAMPLES.short);
	const [output, setOutput] = useState("");
	const [language, setLanguage] = useState<SqlLanguage>("sql");
	const [indent, setIndent] = useState<IndentStyle>("2-spaces");
	const [uppercase, setUppercase] = useState(true);
	const [copied, setCopied] = useState(false);

	const loadSample = (type: keyof typeof SAMPLES) => {
		setInput(SAMPLES[type]);
		setOutput("");
		toast.success(`Loaded ${type} sample query`);
	};

	const handleFormat = () => {
		try {
			const formatted = formatter(input, {
				language: language,
				tabWidth: indent === "4-spaces" ? 4 : 2,
				useTabs: indent === "tabs",
				keywordCase: uppercase ? "upper" : "lower",
				indentStyle: "standard",
			});

			setOutput(formatted);
		} catch (error) {
			console.error("SQL formatting error:", error);
			// Show original input if formatting fails due to incomplete syntax
			setOutput(input);
		}
	};

	const handleCopy = () => {
		if (!output) return;
		navigator.clipboard.writeText(output);
		setCopied(true);
		toast.success("Formatted SQL copied to clipboard!");
		setTimeout(() => setCopied(false), 2000);
	};

	const handleClear = () => {
		setInput("");
		setOutput("");
		toast.success("Cleared input");
	};

	return (
		<div className="grid gap-6 lg:grid-cols-2">
			{/* Input Section */}
			<Card className="border-border/50 flex h-full flex-col">
				<CardHeader className="pb-4">
					<div className="flex flex-col gap-4 sm:items-start sm:justify-between">
						<div>
							<CardTitle className="flex items-center gap-2 text-xl">
								<Database className="text-primary h-5 w-5" />
								Raw SQL
							</CardTitle>
							<CardDescription>Paste your minified or messy SQL here</CardDescription>
						</div>

						<div className="flex flex-wrap gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => loadSample("short")}
								className="h-8 text-xs"
							>
								Short
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => loadSample("medium")}
								className="h-8 text-xs"
							>
								Medium
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => loadSample("long")}
								className="h-8 text-xs"
							>
								Long
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => loadSample("complex")}
								className="h-8 text-xs"
							>
								Complex
							</Button>
						</div>
					</div>
				</CardHeader>

				<CardContent className="flex flex-1 flex-col gap-4">
					<Textarea
						className="min-h-[300px] flex-1 resize-y font-mono text-sm"
						placeholder="SELECT * FROM table..."
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>

					<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
						<div className="space-y-1.5">
							<Label className="text-muted-foreground text-xs">Dialect</Label>
							<Select value={language} onValueChange={(v: SqlLanguage) => setLanguage(v)}>
								<SelectTrigger className="h-9">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="sql">Standard SQL</SelectItem>
									<SelectItem value="postgresql">PostgreSQL</SelectItem>
									<SelectItem value="mysql">MySQL</SelectItem>
									<SelectItem value="mariadb">MariaDB</SelectItem>
									<SelectItem value="sqlite">SQLite</SelectItem>
									<SelectItem value="tsql">T-SQL (SQL Server)</SelectItem>
									<SelectItem value="plsql">PL/SQL</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-1.5">
							<Label className="text-muted-foreground text-xs">Indentation</Label>
							<Select value={indent} onValueChange={(v: IndentStyle) => setIndent(v)}>
								<SelectTrigger className="h-9">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="2-spaces">2 Spaces</SelectItem>
									<SelectItem value="4-spaces">4 Spaces</SelectItem>
									<SelectItem value="tabs">Tabs</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col justify-end space-y-1.5 pb-1.5">
							<div className="flex h-9 items-center space-x-2">
								<Switch id="uppercase" checked={uppercase} onCheckedChange={setUppercase} />
								<Label htmlFor="uppercase" className="cursor-pointer text-xs font-normal">
									Uppercase Keywords
								</Label>
							</div>
						</div>
						<div className="col-span-2 space-y-1.5 sm:col-span-3">
							<Label className="text-muted-foreground text-xs">Action</Label>
							<div className="flex gap-2">
								<Button className="h-9 flex-1" onClick={handleFormat} disabled={!input.trim()}>
									<Wand2 className="mr-2 h-4 w-4" /> Format
								</Button>
								<Button variant="outline" className="h-9 px-3" onClick={handleClear} title="Clear">
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Output Section */}
			<Card className="border-border/50 flex h-full flex-col">
				<CardHeader className="pb-4">
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-xl">Formatted Query</CardTitle>
							<CardDescription>Clean and readable SQL code</CardDescription>
						</div>
						<Button
							variant="secondary"
							size="sm"
							onClick={handleCopy}
							disabled={!output}
							className="h-8"
						>
							{copied ? (
								<Check className="mr-1.5 h-4 w-4 text-green-600" />
							) : (
								<Copy className="mr-1.5 h-4 w-4" />
							)}
							{copied ? "Copied" : "Copy"}
						</Button>
					</div>
				</CardHeader>
				<CardContent className="flex flex-1 flex-col">
					<div className="relative min-h-[300px] flex-1">
						<Textarea
							className="read-only:bg-muted/30 absolute inset-0 h-full resize-none border-0 font-mono text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
							value={output}
							readOnly
							placeholder="Formatted query will appear here..."
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
