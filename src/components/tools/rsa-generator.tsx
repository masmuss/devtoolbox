import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	AlertTriangle,
	CheckCircle,
	Download,
	Eye,
	EyeOff,
	Key,
	Lock,
	Shield,
	Unlock,
} from "lucide-react";
import { CopyButton } from "../copy-button";
import { useFlexibleToolState } from "@/lib/hooks/use-tool-state";
import { Badge } from "../ui/badge";
import { Separator } from "@radix-ui/react-select";

interface RSAState {
	keySize: string;
	publicKey: string;
	privateKey: string;
	showPrivateKey: boolean;
}

export default function RSAGeneratorComponent() {
	const { state, updateState, clearState, isProcessing, setIsProcessing } =
		useFlexibleToolState<RSAState>({
			keySize: "2048",
			publicKey: "",
			privateKey: "",
			showPrivateKey: false,
		});

	const generateRSAKeys = async () => {
		setIsProcessing(true);
		try {
			const keyPair = await crypto.subtle.generateKey(
				{
					name: "RSA-OAEP",
					modulusLength: Number.parseInt(state.keySize),
					publicExponent: new Uint8Array([1, 0, 1]),
					hash: "SHA-256",
				},
				true,
				["encrypt", "decrypt"],
			);

			const publicKeyData = await crypto.subtle.exportKey("spki", keyPair.publicKey);
			const publicKeyPem = arrayBufferToPem(publicKeyData, "PUBLIC KEY");

			const privateKeyData = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
			const privateKeyPem = arrayBufferToPem(privateKeyData, "PRIVATE KEY");

			updateState({
				publicKey: publicKeyPem,
				privateKey: privateKeyPem,
				showPrivateKey: false,
			});
		} catch (error) {
			console.error("Error generating RSA keys:", error);
			alert("Error generating RSA keys. Please try again.");
		} finally {
			setIsProcessing(false);
		}
	};

	const arrayBufferToPem = (buffer: ArrayBuffer, type: string) => {
		const binary = String.fromCharCode(...new Uint8Array(buffer));
		const base64 = btoa(binary);
		const formatted = base64.match(/.{1,64}/g)?.join("\n") || base64;
		return `-----BEGIN ${type}-----\n${formatted}\n-----END ${type}-----`;
	};

	const downloadKey = (key: string, filename: string) => {
		const blob = new Blob([key], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

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

	const security = getSecurityLevel(state.keySize);
	const SecurityIcon = security.icon;

	return (
		<div className="grid gap-6 lg:grid-cols-3">
			<div className="lg:col-span-1">
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
							<Select
								value={state.keySize}
								onValueChange={(value) => updateState({ keySize: value })}
							>
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

							{/*  Added security level badge and description */}
							<div className="flex items-center gap-2">
								<Badge variant={security.color as any} className="flex items-center gap-1">
									<SecurityIcon className="h-3 w-3" />
									{security.level} Security
								</Badge>
								<span className="text-sm text-gray-500 dark:text-gray-400">
									{state.keySize} bits
								</span>
							</div>

							<div className="text-sm text-gray-600 dark:text-gray-400">
								{state.keySize === "1024" && "⚠️ Deprecated - Not secure for production"}
								{state.keySize === "2048" && "✅ Industry standard - Secure until ~2030"}
								{state.keySize === "3072" && "✅ High security - Equivalent to 128-bit AES"}
								{state.keySize === "4096" && "✅ Maximum security - Slower performance"}
							</div>
						</div>

						<Separator />

						<div className="flex flex-col gap-2">
							<Button
								onClick={generateRSAKeys}
								disabled={isProcessing}
								className="w-full"
								size="lg"
							>
								{isProcessing ? "Generating Keys..." : "Generate Key Pair"}
							</Button>
							<Button
								onClick={clearState}
								variant="outline"
								className="w-full bg-transparent"
								disabled={!state.publicKey && !state.privateKey}
							>
								Clear All
							</Button>
						</div>
					</CardContent>
				</Card>

				{/*  Added compact security information card */}
				<Card className="mt-4">
					<CardHeader>
						<CardTitle className="text-base">Security Guide</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3 text-sm">
						<div>
							<div className="mb-2 font-medium text-gray-900 dark:text-white">
								Key Size Recommendations:
							</div>
							<div className="space-y-1 text-gray-600 dark:text-gray-400">
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
						<div className="border-t border-gray-200 pt-2 dark:border-gray-700">
							<div className="font-medium text-red-600 dark:text-red-400">⚠️ Security Warning</div>
							<div className="mt-1 text-gray-600 dark:text-gray-400">
								Never share your private key. Store it securely and use strong passphrases.
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="space-y-4 lg:col-span-2">
				{state.publicKey ? (
					<>
						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Unlock className="h-5 w-5 text-green-600 dark:text-green-400" />
										<CardTitle>Public Key</CardTitle>
										<Badge variant="outline" className="text-green-600 dark:text-green-400">
											Safe to Share
										</Badge>
									</div>
									<div className="flex gap-2">
										<CopyButton text={state.publicKey} label="Copy" variant="outline" />
										<Button
											onClick={() =>
												downloadKey(state.publicKey, `rsa_public_${state.keySize}.pem`)
											}
											variant="outline"
											size="sm"
										>
											<Download className="mr-2 h-4 w-4" />
											Download
										</Button>
									</div>
								</div>
								<CardDescription>
									Use this key for encryption and signature verification
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Textarea
									value={state.publicKey}
									readOnly
									className="resize-none font-mono text-xs"
									rows={6}
								/>
							</CardContent>
						</Card>

						<Card className="border-red-200 dark:border-red-800">
							<CardHeader>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<Lock className="h-5 w-5 text-red-600 dark:text-red-400" />
										<CardTitle>Private Key</CardTitle>
										<Badge variant="destructive">Keep Secret</Badge>
									</div>
									<div className="flex gap-2">
										<Button
											onClick={() => updateState({ showPrivateKey: !state.showPrivateKey })}
											variant="outline"
											size="sm"
										>
											{state.showPrivateKey ? (
												<>
													<EyeOff className="mr-2 h-4 w-4" />
													Hide
												</>
											) : (
												<>
													<Eye className="mr-2 h-4 w-4" />
													Show
												</>
											)}
										</Button>
										<CopyButton text={state.privateKey} label="Copy" variant="outline" />
										<Button
											onClick={() =>
												downloadKey(state.privateKey, `rsa_private_${state.keySize}.pem`)
											}
											variant="outline"
											size="sm"
										>
											<Download className="mr-2 h-4 w-4" />
											Download
										</Button>
									</div>
								</div>
								<CardDescription className="text-red-600 dark:text-red-400">
									This key must be kept absolutely secret and secure
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Textarea
									value={state.showPrivateKey ? state.privateKey : "•".repeat(64)}
									readOnly
									className="resize-none font-mono text-xs"
									rows={state.showPrivateKey ? 12 : 1}
								/>
							</CardContent>
						</Card>
					</>
				) : (
					<Card className="border-dashed">
						<CardContent className="flex flex-col items-center justify-center py-12 text-center">
							<Key className="mb-4 h-12 w-12 text-gray-400" />
							<h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
								No Keys Generated
							</h3>
							<p className="mb-4 text-gray-500 dark:text-gray-400">
								Click "Generate Key Pair" to create your RSA keys
							</p>
							<Button onClick={generateRSAKeys} disabled={isProcessing}>
								{isProcessing ? "Generating..." : "Generate Key Pair"}
							</Button>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
