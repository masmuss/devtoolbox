import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/copy-button";
import ToolSection from "@/components/tool-section.tsx";
import { PasswordSecurityIndicator } from "@/components/partials/password/password-security-indicator.tsx";

interface PasswordOutputProps {
	password: string;
	onGenerate: () => void;
}

export function PasswordOutput({ password, onGenerate }: PasswordOutputProps) {
	const isValidPassword = password && password !== "Please select at least one character type";

	return (
		<ToolSection title="Generated Password" description="Your secure password will appear here">
			<div className="space-y-4">
				<div className="relative">
					<Input
						value={password}
						readOnly
						placeholder="Click 'Generate Password' to create a password"
						className="border-neutral-200 bg-neutral-50 pr-20 font-mono text-sm dark:border-neutral-800 dark:bg-neutral-900"
					/>
					<div className="absolute top-1/2 right-2 flex -translate-y-1/2 space-x-1">
						<CopyButton
							text={password}
							disabled={!isValidPassword}
							className="h-8 w-8 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800"
						/>
						<Button
							size="sm"
							variant="ghost"
							onClick={onGenerate}
							className="h-8 w-8 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800"
						>
							<RefreshCw className="h-4 w-4" />
						</Button>
					</div>
				</div>

				<PasswordSecurityIndicator password={password} />

				<Button
					onClick={onGenerate}
					className="w-full bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
				>
					Generate Password
				</Button>
			</div>
		</ToolSection>
	);
}
