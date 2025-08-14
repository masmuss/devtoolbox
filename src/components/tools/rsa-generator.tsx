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
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Separator } from "@radix-ui/react-select";
import { KeyConfiguration } from "../partials/rsa/key-configuration";
import { KeyDisplay } from "../partials/rsa/key-display";

interface RSAState {
	keySize: string;
	publicKey: string;
	privateKey: string;
	showPrivateKey: boolean;
	isProcessing: boolean;
}

export default function RSAGeneratorComponent() {
	const [state, setState] = useState<RSAState>({
		keySize: "2048",
		publicKey: "",
		privateKey: "",
		showPrivateKey: false,
		isProcessing: false,
	});

	const updateState = (updates: Partial<RSAState>) => setState((prev) => ({ ...prev, ...updates }));
	const clearState = () =>
		setState({
			keySize: "2048",
			publicKey: "",
			privateKey: "",
			showPrivateKey: false,
			isProcessing: false,
		});

	const generateRSAKeys = async () => {
		updateState({ isProcessing: true });
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
			updateState({ publicKey: publicKeyPem, privateKey: privateKeyPem, showPrivateKey: false });
		} catch (error) {
			console.error("Error generating RSA keys:", error);
			alert("Error generating RSA keys. Please try again.");
		} finally {
			updateState({ isProcessing: false });
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
				<KeyConfiguration
					keySize={state.keySize}
					onKeySizeChange={(size) => updateState({ keySize: size })}
					onGenerate={generateRSAKeys}
					onClear={clearState}
					isProcessing={state.isProcessing}
					hasKeys={!!(state.publicKey && state.privateKey)}
				/>
			</div>
			<div className="lg:col-span-2">
				<KeyDisplay
					publicKey={state.publicKey}
					privateKey={state.privateKey}
					showPrivateKey={state.showPrivateKey}
					keySize={state.keySize}
					onTogglePrivateKey={() => updateState({ showPrivateKey: !state.showPrivateKey })}
					onGenerate={generateRSAKeys}
					isProcessing={state.isProcessing}
				/>
			</div>
		</div>
	);
}
