import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";

interface SecretKeyInputProps {
	secretKey: string;
	onSecretKeyChange: (key: string) => void;
	onGenerateRandomKey: () => void;
}

export function SecretKeyInput({
	secretKey,
	onSecretKeyChange,
	onGenerateRandomKey,
}: SecretKeyInputProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Key className="h-5 w-5" />
					Secret Key
				</CardTitle>
				<CardDescription>Secret key for HMAC generation</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="secretKey">Secret Key</Label>
						<Input
							id="secretKey"
							type="password"
							placeholder="Enter your secret key..."
							value={secretKey}
							onChange={(e) => onSecretKeyChange(e.target.value)}
							className="font-mono"
						/>
					</div>
					<Button onClick={onGenerateRandomKey} variant="outline" size="sm">
						Generate Random Key
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
