import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

interface ValidationResult {
	isValid: boolean;
	hasSyntaxError: boolean;
	isDisposable: boolean;
	isRoleAccount: boolean;
	isFreeMail: boolean;
	domain: string;
	username: string;
}

// Very basic disposable/freemail/role domain lists to provide heuristic feedback
const COMMON_FREEMAIL = [
	"gmail.com",
	"yahoo.com",
	"hotmail.com",
	"outlook.com",
	"icloud.com",
	"aol.com",
];
const DISPOSABLE_DOMAINS = [
	"mailinator.com",
	"10minutemail.com",
	"tempmail.com",
	"guerrillamail.com",
];
const ROLE_ACCOUNTS = [
	"admin",
	"support",
	"info",
	"contact",
	"sales",
	"marketing",
	"billing",
	"hello",
	"help",
];

export default function EmailValidator() {
	const [email, setEmail] = useState("");
	const [result, setResult] = useState<ValidationResult | null>(null);

	const validateEmail = (inputEmail: string) => {
		if (!inputEmail.trim()) {
			setResult(null);
			return;
		}

		// Basic Regex for email structure
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isValidSyntax = emailRegex.test(inputEmail);

		let username = "";
		let domain = "";

		if (inputEmail.includes("@")) {
			const parts = inputEmail.split("@");
			username = parts[0].toLowerCase();
			domain = parts[1].toLowerCase();
		}

		setResult({
			isValid: isValidSyntax,
			hasSyntaxError: !isValidSyntax,
			isDisposable: DISPOSABLE_DOMAINS.includes(domain),
			isRoleAccount: ROLE_ACCOUNTS.includes(username),
			isFreeMail: COMMON_FREEMAIL.includes(domain),
			domain: domain,
			username: username,
		});
	};

	return (
		<div className="grid gap-6 md:grid-cols-12">
			{/* Input Section */}
			<Card className="h-fit md:col-span-5 lg:col-span-5">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Mail className="text-primary h-5 w-5" />
						Validate Address
					</CardTitle>
					<CardDescription>Enter an email address to check its format and type</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex gap-2">
						<Input
							placeholder="e.g. hello@example.com"
							type="email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								if (!e.target.value) setResult(null);
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter") validateEmail(email);
							}}
						/>
						<Button onClick={() => validateEmail(email)}>Check</Button>
					</div>

					{/* Quick Guide */}
					<div className="bg-muted/40 text-muted-foreground space-y-2 rounded-lg border p-4 text-sm">
						<div className="flex items-start gap-2">
							<Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
							<p>
								This tool performs local syntax checks to determine if an email is formatted
								correctly.
							</p>
						</div>
						<div className="flex items-start gap-2">
							<AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
							<p>
								It cannot verify if the inbox exists, but it highlights role accounts and popular
								free providers.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Results Section */}
			<Card className="h-fit md:col-span-7 lg:col-span-7">
				<CardHeader>
					<CardTitle>Validation Results</CardTitle>
					<CardDescription>Format, security, and address heuristics</CardDescription>
				</CardHeader>
				<CardContent>
					{!result ? (
						<div className="text-muted-foreground flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-12">
							<Mail className="mb-3 h-12 w-12 opacity-20" />
							<p>Enter an email address to see analysis.</p>
						</div>
					) : (
						<div className="space-y-6">
							{/* Overall Status */}
							<div
								className={`flex items-center gap-3 rounded-lg p-4 ${result.isValid ? "border border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-900/20 dark:text-green-300" : "border border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300"}`}
							>
								{result.isValid ? (
									<CheckCircle2 className="h-8 w-8" />
								) : (
									<XCircle className="h-8 w-8" />
								)}
								<div>
									<h3 className="text-lg font-semibold">
										{result.isValid ? "Valid Format" : "Invalid Format"}
									</h3>
									<p className="text-sm opacity-90">
										{result.isValid
											? "The email structure conforms to standard syntax."
											: "The email doesn't have a valid username or domain structure."}
									</p>
								</div>
							</div>

							{/* Details Grid */}
							{result.isValid && (
								<div className="space-y-4">
									<h4 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
										Address Breakdown
									</h4>
									<div className="grid grid-cols-2 gap-4">
										<div className="bg-muted/30 rounded-lg border p-3">
											<div className="text-muted-foreground mb-1 text-xs">
												Username (Local Part)
											</div>
											<div className="font-mono text-sm font-medium break-all">
												{result.username}
											</div>
										</div>
										<div className="bg-muted/30 rounded-lg border p-3">
											<div className="text-muted-foreground mb-1 text-xs">Domain Part</div>
											<div className="font-mono text-sm font-medium break-all">{result.domain}</div>
										</div>
									</div>

									<h4 className="text-muted-foreground mt-6 mb-2 ml-1 text-sm font-medium tracking-wider uppercase">
										Signals
									</h4>
									<div className="space-y-3">
										<div className="flex items-center justify-between rounded-lg border p-3">
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium">Provider Type</span>
											</div>
											<div>
												{result.isFreeMail ? (
													<Badge variant="secondary">Free Mail</Badge>
												) : result.isDisposable ? (
													<Badge variant="destructive">Disposable Mail</Badge>
												) : (
													<Badge variant="outline" className="bg-primary/5">
														Custom/Corporate
													</Badge>
												)}
											</div>
										</div>

										<div className="flex items-center justify-between rounded-lg border p-3">
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium">Role Account</span>
											</div>
											<div>
												{result.isRoleAccount ? (
													<Badge variant="outline" className="border-amber-200 text-amber-500">
														Yes (General Inbox)
													</Badge>
												) : (
													<Badge variant="outline" className="border-green-200 text-green-500">
														No (Personal)
													</Badge>
												)}
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
