import { Info, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getPasswordStrength } from "@/lib/utils/password-generator";
import { useState } from "react";

interface PasswordSecurityIndicatorProps {
	password: string;
}

export function PasswordSecurityIndicator({ password }: PasswordSecurityIndicatorProps) {
	const [showDetails, setShowDetails] = useState<boolean>(false);
	const strength = getPasswordStrength(password);
	const isValidPassword = password && password !== "Please select at least one character type";

	if (!isValidPassword) {
		return null;
	}

	return (
		<div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
			<div className="mb-2 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Shield className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
					<span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
						Security Analysis
					</span>
				</div>
				<Button size="sm" variant="ghost" onClick={() => setShowDetails(!showDetails)}>
					<Info className="mr-1 h-3 w-3" />
					{showDetails ? "Hide" : "Details"}
				</Button>
			</div>

			<div className="mb-2 flex items-center justify-between">
				<span className="text-sm text-neutral-600 dark:text-neutral-400">Strength:</span>
				<span className={`text-sm font-medium ${strength.color}`}>{strength.label}</span>
			</div>

			<Progress value={Math.min((strength.score / 7) * 100, 100)} className="mb-2 h-2" />

			<div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
				<span>Entropy: {strength.entropy} bits</span>
				<span>Score: {strength.score}/7</span>
			</div>

			{showDetails && (
				<div className="mt-3 border-t border-neutral-200 pt-3 dark:border-neutral-700">
					<div className="space-y-1">
						{strength.details.map((detail, index) => (
							<div key={index} className="flex items-center gap-2 text-xs">
								<span
									className={
										detail.startsWith("✓")
											? "text-green-600 dark:text-green-400"
											: detail.startsWith("⚠")
												? "text-yellow-600 dark:text-yellow-400"
												: "text-red-600 dark:text-red-400"
									}
								>
									{detail}
								</span>
							</div>
						))}
					</div>

					<div className="mt-2 border-t border-neutral-200 pt-2 dark:border-neutral-700">
						<p className="text-xs text-neutral-500 dark:text-neutral-400">
							<strong>Entropy:</strong> Measures password randomness. Higher is better.
							{strength.entropy < 50 && " Consider a longer password."}
							{strength.entropy >= 50 && strength.entropy < 70 && " Good security level."}
							{strength.entropy >= 70 && " Excellent security level."}
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
