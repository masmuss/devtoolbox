import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface JWTSecretSectionProps {
	secret: string;
	onSecretChange: (secret: string) => void;
}

export function JWTSecretSection({ secret, onSecretChange }: JWTSecretSectionProps) {
	const [showSecret, setShowSecret] = useState(false);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Secret Key</CardTitle>
				<CardDescription>Secret key for HMAC algorithms</CardDescription>
			</CardHeader>
			<CardContent>
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
			</CardContent>
		</Card>
	);
}
