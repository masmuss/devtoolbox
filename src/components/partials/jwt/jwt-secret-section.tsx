import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock } from "lucide-react";
import ToolSection from "@/components/tool-section.tsx";

interface JWTSecretSectionProps {
	secret: string;
	onSecretChange: (secret: string) => void;
}

export function JWTSecretSection({ secret, onSecretChange }: JWTSecretSectionProps) {
	const [showSecret, setShowSecret] = useState<boolean>(false);

	return (
		<ToolSection
			title="Secret Key"
			description="Enter your secret key for signing JWT tokens."
			icon={Lock}
		>
			<div className="space-y-2">
				<Label htmlFor="secret">Secret</Label>
				<div className="relative">
					<Input
						id="secret"
						type={showSecret ? "text" : "password"}
						value={secret}
						onChange={(e) => onSecretChange(e.target.value)}
						className="pr-10 font-mono"
					/>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
						onClick={() => setShowSecret(!showSecret)}
					>
						{showSecret ? (
							<EyeOff className="h-4 w-4 text-neutral-500" />
						) : (
							<Eye className="h-4 w-4 text-neutral-500" />
						)}
					</Button>
				</div>
			</div>
		</ToolSection>
	);
}
