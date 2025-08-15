import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Key } from "lucide-react";
import { KeyDisplayCard } from "./key-display-card";

interface KeyDisplayProps {
	publicKey: string;
	privateKey: string;
	showPrivateKey: boolean;
	keySize: string;
	onTogglePrivateKey: () => void;
	onGenerate: () => void;
	isProcessing: boolean;
}

export function KeyDisplay(props: KeyDisplayProps) {
	const {
		publicKey,
		privateKey,
		showPrivateKey,
		keySize,
		onTogglePrivateKey,
		onGenerate,
		isProcessing,
	} = props;

	if (!publicKey) {
		return (
			<Card className="border-dashed">
				<CardContent className="flex flex-col items-center justify-center py-12 text-center">
					<Key className="mb-4 h-12 w-12 text-neutral-400" />
					<h3 className="mb-2 text-lg font-medium text-neutral-900 dark:text-white">
						No Keys Generated
					</h3>
					<p className="mb-4 text-neutral-500 dark:text-neutral-400">
						Click "Generate Key Pair" to create your RSA keys
					</p>
					<Button onClick={onGenerate} disabled={isProcessing}>
						{isProcessing ? "Generating..." : "Generate Key Pair"}
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-4">
			<KeyDisplayCard type="public" value={publicKey} keySize={keySize} />
			<KeyDisplayCard
				type="private"
				value={privateKey}
				keySize={keySize}
				showPrivateKey={showPrivateKey}
				onTogglePrivateKey={onTogglePrivateKey}
			/>
		</div>
	);
}
