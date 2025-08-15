import { ToolGuide } from "@/components/tool-guide";

export function PasswordTips() {
	return (
		<ToolGuide
			title="Password Security Tips"
			description="Follow these best practices to create strong and secure passwords."
		>
			<ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
				<li>• Use at least 12 characters for better security</li>
				<li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
				<li>• Avoid using personal information or common words</li>
				<li>• Use a unique password for each account</li>
				<li>• Consider using a password manager to store your passwords securely</li>
			</ul>
		</ToolGuide>
	);
}
