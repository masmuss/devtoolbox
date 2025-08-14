import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Key, Shield, AlertTriangle, CheckCircle } from "lucide-react";

interface KeyConfigurationProps {
	keySize: string;
	onKeySizeChange: (size: string) => void;
	onGenerate: () => void;
	onClear: () => void;
	isProcessing: boolean;
	hasKeys: boolean;
}

export function KeyConfiguration({
	keySize,
	onKeySizeChange,
	onGenerate,
	onClear,
	isProcessing,
	hasKeys,
}: KeyConfigurationProps) {
	const getSecurityLevel = (keySize: string) => {
		switch (keySize) {
			case "1024":
				return { level: "Low", color: "destructive", icon: AlertTriangle };
			case "2048":
				return { level: "Good", color: "default", icon: CheckCircle };
			case "3072":
				return { level: "High", color: "secondary", icon: Shield };
			case "4096":
				return { level: "Maximum", color: "secondary", icon: Shield };
			default:
				return { level: "Unknown", color: "outline", icon: AlertTriangle };
		}
	};

	const security = getSecurityLevel(keySize);
	const SecurityIcon = security.icon;

	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Key className="h-5 w-5" />
						Configuration
					</CardTitle>
					<CardDescription>Set your RSA key parameters</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-3">
						<Label htmlFor="keySize">Key Size</Label>
						<Select value={keySize} onValueChange={onKeySizeChange}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="1024">1024 bits</SelectItem>
								<SelectItem value="2048">2048 bits</SelectItem>
								<SelectItem value="3072">3072 bits</SelectItem>
								<SelectItem value="4096">4096 bits</SelectItem>
							</SelectContent>
						</Select>

						<div className="flex items-center gap-2">
							<Badge variant={security.color as any} className="flex items-center gap-1">
								<SecurityIcon className="h-3 w-3" />
								{security.level} Security
							</Badge>
							<span className="text-sm text-neutral-500 dark:text-neutral-400">{keySize} bits</span>
						</div>

						<div className="text-sm text-neutral-600 dark:text-neutral-400">
							{keySize === "1024" && "⚠️ Deprecated - Not secure for production"}
							{keySize === "2048" && "✅ Industry standard - Secure until ~2030"}
							{keySize === "3072" && "✅ High security - Equivalent to 128-bit AES"}
							{keySize === "4096" && "✅ Maximum security - Slower performance"}
						</div>
					</div>

					<Separator />

					<div className="flex flex-col gap-2">
						<Button onClick={onGenerate} disabled={isProcessing} className="w-full" size="lg">
							{isProcessing ? "Generating Keys..." : "Generate Key Pair"}
						</Button>
						<Button
							onClick={onClear}
							variant="outline"
							className="w-full bg-transparent"
							disabled={!hasKeys}
						>
							Clear All
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="text-base">Security Guide</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3 text-sm">
					<div>
						<div className="mb-2 font-medium text-neutral-900 dark:text-white">
							Key Size Recommendations:
						</div>
						<div className="space-y-1 text-neutral-600 dark:text-neutral-400">
							<div>
								• <strong>2048 bits:</strong> Standard security
							</div>
							<div>
								• <strong>3072 bits:</strong> High security
							</div>
							<div>
								• <strong>4096 bits:</strong> Maximum security
							</div>
						</div>
					</div>
					<div className="border-t border-neutral-200 pt-2 dark:border-neutral-700">
						<div className="font-medium text-red-600 dark:text-red-400">⚠️ Security Warning</div>
						<div className="mt-1 text-neutral-600 dark:text-neutral-400">
							Never share your private key. Store it securely and use strong passphrases.
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
