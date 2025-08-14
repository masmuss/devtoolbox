import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Key, Hash } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { useToolState } from "@/lib/hooks/use-tool-state";

interface HMACState {
	message: string;
	secretKey: string;
	algorithm: string;
	output: string;
}

export default function HMACGeneratorComponent() {
	const { state, updateState, clearState, isProcessing, setIsProcessing } = useToolState<HMACState>(
		{
			message: "",
			secretKey: "",
			algorithm: "SHA-256",
			output: "",
		},
	);

	const generateHMAC = async () => {
		if (!state.message || !state.secretKey) {
			alert("Please provide both message and secret key");
			return;
		}

		setIsProcessing(true);
		try {
			const encoder = new TextEncoder();
			const keyData = encoder.encode(state.secretKey);
			const messageData = encoder.encode(state.message);

			const algoMap: { [key: string]: string } = {
				"SHA-1": "SHA-1",
				"SHA-256": "SHA-256",
				"SHA-384": "SHA-384",
				"SHA-512": "SHA-512",
			};

			const key = await crypto.subtle.importKey(
				"raw",
				keyData,
				{ name: "HMAC", hash: algoMap[state.algorithm] },
				false,
				["sign"],
			);

			const signature = await crypto.subtle.sign("HMAC", key, messageData);
			const hashArray = Array.from(new Uint8Array(signature));
			const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

			updateState({ output: hashHex });
		} catch (error) {
			console.error("Error generating HMAC:", error);
			alert("Error generating HMAC. Please check your inputs.");
		} finally {
			setIsProcessing(false);
		}
	};

	const generateRandomKey = () => {
		const array = new Uint8Array(32);
		crypto.getRandomValues(array);
		const randomKey = Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
		updateState({ secretKey: randomKey });
	};

	return (
		<div className="grid gap-6 lg:grid-cols-2">
			{/* Input Section */}
			<div className="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Hash className="h-5 w-5" />
							Message Input
						</CardTitle>
						<CardDescription>Enter the message to authenticate</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<div className="space-y-2">
								<Label htmlFor="message">Message</Label>
								<Textarea
									id="message"
									placeholder="Enter your message here..."
									value={state.message}
									onChange={(e) => updateState({ message: e.target.value })}
									className="min-h-[120px]"
								/>
							</div>
							<div className="text-sm text-gray-500 dark:text-gray-400">
								Message length: {state.message.length} characters
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Key className="h-5 w-5" />
							Secret Key
						</CardTitle>
						<CardDescription>Secret key for HMAC generation</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							<div className="space-y-2">
								<Label htmlFor="secretKey">Secret Key</Label>
								<Input
									id="secretKey"
									type="password"
									placeholder="Enter your secret key..."
									value={state.secretKey}
									onChange={(e) => updateState({ secretKey: e.target.value })}
									className="font-mono"
								/>
							</div>
							<Button onClick={generateRandomKey} variant="outline" size="sm">
								Generate Random Key
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Algorithm</CardTitle>
						<CardDescription>Choose the hash algorithm</CardDescription>
					</CardHeader>
					<CardContent>
						<Select
							value={state.algorithm}
							onValueChange={(val) => updateState({ algorithm: val })}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="SHA-1">HMAC-SHA1</SelectItem>
								<SelectItem value="SHA-256">HMAC-SHA256</SelectItem>
								<SelectItem value="SHA-384">HMAC-SHA384</SelectItem>
								<SelectItem value="SHA-512">HMAC-SHA512</SelectItem>
							</SelectContent>
						</Select>
					</CardContent>
				</Card>
			</div>

			{/* Output Section */}
			<div className="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>HMAC Result</CardTitle>
						<CardDescription>Generated authentication code</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							<div className="flex gap-2">
								<Button onClick={generateHMAC} disabled={isProcessing} className="flex-1">
									{isProcessing ? "Generating..." : "Generate HMAC"}
								</Button>
								<Button onClick={clearState} variant="outline">
									Clear
								</Button>
							</div>

							{state.output && (
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<Label>HMAC ({state.algorithm})</Label>
										<CopyButton text={state.output} />
									</div>
									<Textarea
										value={state.output}
										readOnly
										className="font-mono text-sm break-all"
										rows={3}
									/>
									<div className="text-sm text-gray-500 dark:text-gray-400">
										Length: {state.output.length} characters
									</div>
								</div>
							)}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>About HMAC</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
						<p>
							<strong>HMAC (Hash-based Message Authentication Code)</strong> is a mechanism for
							message authentication using cryptographic hash functions.
						</p>
						<div>
							<strong>Key Features:</strong>
							<ul className="mt-1 list-inside list-disc space-y-1">
								<li>Provides both data integrity and authenticity</li>
								<li>Uses a secret key with a hash function</li>
								<li>Resistant to length extension attacks</li>
								<li>Widely used in APIs and security protocols</li>
							</ul>
						</div>
						<div>
							<strong>Common Uses:</strong>
							<ul className="mt-1 list-inside list-disc space-y-1">
								<li>API authentication (AWS, GitHub, etc.)</li>
								<li>JWT token signing</li>
								<li>Message integrity verification</li>
								<li>Password-based authentication</li>
							</ul>
						</div>
						<div>
							<strong>Security Note:</strong> Keep your secret key secure and use SHA-256 or higher
							for production use.
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
