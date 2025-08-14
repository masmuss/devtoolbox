import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface AlgorithmSelectorProps {
	algorithm: string;
	onAlgorithmChange: (algorithm: string) => void;
}

export function AlgorithmSelector({ algorithm, onAlgorithmChange }: AlgorithmSelectorProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Algorithm</CardTitle>
				<CardDescription>Choose the hash algorithm</CardDescription>
			</CardHeader>
			<CardContent>
				<Select value={algorithm} onValueChange={onAlgorithmChange}>
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
	);
}
