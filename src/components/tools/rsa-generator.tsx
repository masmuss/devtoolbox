import { KeyConfiguration } from "../partials/rsa/key-configuration";
import { KeyDisplay } from "../partials/rsa/key-display";
import { useToolState } from "@/lib/hooks/use-tool-state.ts";

interface RSAState {
	keySize: string;
	publicKey: string;
	privateKey: string;
	showPrivateKey: boolean;
	isProcessing: boolean;
}

export default function RSAGeneratorComponent() {
	const { state, updateState, clearState } = useToolState<RSAState>({
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
