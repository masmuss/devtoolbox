import { useToolState } from "@/lib/hooks/use-tool-state";
import { MessageInput } from "../partials/hmac/message-input";
import { SecretKeyInput } from "../partials/hmac/secret-key-input";
import { AlgorithmSelector } from "../partials/hmac/algorithm-selector";
import { HMACOutput } from "../partials/hmac/hmac-output";
import { HMACInfo } from "../partials/hmac/hmac-info";

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
			<div className="space-y-6">
				<MessageInput
					message={state.message}
					onMessageChange={(message) => updateState({ message })}
				/>

				<SecretKeyInput
					secretKey={state.secretKey}
					onSecretKeyChange={(secretKey) => updateState({ secretKey })}
					onGenerateRandomKey={generateRandomKey}
				/>

				<AlgorithmSelector
					algorithm={state.algorithm}
					onAlgorithmChange={(algorithm) => updateState({ algorithm })}
				/>
			</div>

			{/* Output Section */}
			<div className="space-y-6">
				<HMACOutput
					output={state.output}
					algorithm={state.algorithm}
					isProcessing={isProcessing}
					onGenerate={generateHMAC}
					onClear={clearState}
				/>

				<HMACInfo />
			</div>
		</div>
	);
}
