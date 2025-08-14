import { useEffect } from "react";
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
import { Key, Shield, Clock, EyeOff, Eye } from "lucide-react";
import { useToolState } from "@/lib/hooks/use-tool-state";
import { CopyButton } from "../copy-button";
import { JWTHeaderSection } from "../partials/jwt/jwt-header-section";
import { JWTPayloadSection } from "../partials/jwt/jwt-payload-section";
import { JWTSecretSection } from "../partials/jwt/jwt-secret-section";
import { JWTOutputSection } from "../partials/jwt/jwt-output-section";
import { JWTInfo } from "../partials/jwt/jwt-info";

interface JWTGeneratorState {
	header: string;
	payload: string;
	secret: string;
	algorithm: string;
	output: string;
	showSecret: boolean;
}

export default function JWTGeneratorComponent() {
	const { state, updateState, isProcessing, setIsProcessing } = useToolState<JWTGeneratorState>({
		header: '{\n  "alg": "HS256",\n  "typ": "JWT"\n}',
		payload: '{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}',
		secret: "your-256-bit-secret",
		algorithm: "HS256",
		output: "",
		showSecret: false,
	});

	const base64urlEncode = (str: string) => {
		return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
	};

	const generateSignature = async (data: string, secret: string) => {
		const encoder = new TextEncoder();
		const key = await crypto.subtle.importKey(
			"raw",
			encoder.encode(secret),
			{ name: "HMAC", hash: "SHA-256" },
			false,
			["sign"],
		);
		const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
		return base64urlEncode(String.fromCharCode(...new Uint8Array(signature)));
	};

	const generateJWT = async () => {
		try {
			setIsProcessing(true);
			const encodedHeader = base64urlEncode(state.header);
			const encodedPayload = base64urlEncode(state.payload);
			const data = `${encodedHeader}.${encodedPayload}`;

			if (state.algorithm === "HS256") {
				const signature = await generateSignature(data, state.secret);
				updateState({ output: `${data}.${signature}` });
			} else {
				const demoSignature = base64urlEncode("demo-signature-" + Date.now());
				updateState({ output: `${data}.${demoSignature}` });
			}
		} catch (error) {
			console.error("Error generating JWT:", error);
		} finally {
			setIsProcessing(false);
		}
	};

	return (
		<div className="grid gap-6 lg:grid-cols-2">
			<div className="space-y-6">
				<JWTHeaderSection
					header={state.header}
					algorithm={state.algorithm}
					onHeaderChange={(header) => updateState({ header })}
					onAlgorithmChange={(algorithm) => updateState({ algorithm })}
				/>

				<JWTPayloadSection
					payload={state.payload}
					onPayloadChange={(payload) => updateState({ payload })}
				/>

				<JWTSecretSection
					secret={state.secret}
					onSecretChange={(secret) => updateState({ secret })}
				/>
			</div>

			<div className="space-y-6">
				<JWTOutputSection
					output={state.output}
					isProcessing={isProcessing}
					onGenerate={generateJWT}
				/>

				<JWTInfo />
			</div>
		</div>
	);
}
