import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Eye, EyeOff, Lock, Unlock } from "lucide-react";

interface KeyDisplayCardProps {
	type: "public" | "private";
	value: string;
	keySize: string;
	showPrivateKey?: boolean;
	onTogglePrivateKey?: () => void;
}

export default function KeyDisplayCard({
	type,
	value,
	keySize,
	showPrivateKey,
	onTogglePrivateKey,
}: KeyDisplayCardProps) {
	const isPrivate = type === "private";
	const icon = isPrivate ? (
		<Lock className="h-5 w-5 text-red-600 dark:text-red-400" />
	) : (
		<Unlock className="h-5 w-5 text-green-600 dark:text-green-400" />
	);
	const title = isPrivate ? "Private Key" : "Public Key";
	const badge = isPrivate ? (
		<Badge variant="destructive">Keep Secret</Badge>
	) : (
		<Badge variant="outline" className="text-green-600 dark:text-green-400">
			Safe to Share
		</Badge>
	);
	const borderClass = isPrivate ? "border-red-200 dark:border-red-800" : "";
	const description = isPrivate ? (
		<CardDescription className="text-red-600 dark:text-red-400">
			This key must be kept absolutely secret and secure
		</CardDescription>
	) : (
		<CardDescription>Use this key for encryption and signature verification</CardDescription>
	);
	const downloadName = isPrivate ? `rsa_private_${keySize}.pem` : `rsa_public_${keySize}.pem`;

	function downloadKey(key: string, filename: string) {
		const blob = new Blob([key], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	return (
		<Card className={borderClass}>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						{icon}
						<CardTitle>{title}</CardTitle>
						{badge}
					</div>
					<div className="flex gap-2">
						{isPrivate && onTogglePrivateKey && (
							<Button onClick={onTogglePrivateKey} variant="outline" size="sm">
								{showPrivateKey ? (
									<>
										<EyeOff className="h-4 w-4" /> Hide
									</>
								) : (
									<>
										<Eye className="h-4 w-4" /> Show
									</>
								)}
							</Button>
						)}
						<CopyButton text={value} label="Copy" variant="outline" />
						<Button onClick={() => downloadKey(value, downloadName)} variant="outline" size="sm">
							<Download className="h-4 w-4" /> Download
						</Button>
					</div>
				</div>
				{description}
			</CardHeader>
			<CardContent>
				<Textarea
					value={isPrivate && showPrivateKey === false ? "•".repeat(64) : value}
					readOnly
					className="resize-none font-mono text-xs"
					rows={isPrivate ? (showPrivateKey ? 12 : 1) : 6}
				/>
			</CardContent>
		</Card>
	);
}
