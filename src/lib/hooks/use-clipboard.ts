import { useState } from "react";

export function useClipboard() {
	const [copied, setCopied] = useState<boolean>(false);

	const copyToClipboard = async (text: string) => {
		if (!text) return false;

		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 3000);
			return true;
		} catch (error) {
			console.error("Failed to copy to clipboard:", error);
			return false;
		}
	};

	return { copied, copyToClipboard };
}
