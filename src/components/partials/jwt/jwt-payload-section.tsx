import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";

interface JWTPayloadSectionProps {
	payload: string;
	onPayloadChange: (payload: string) => void;
}

export function JWTPayloadSection({ payload, onPayloadChange }: JWTPayloadSectionProps) {
	const addCurrentTime = () => {
		try {
			const currentPayload = JSON.parse(payload);
			currentPayload.iat = Math.floor(Date.now() / 1000);
			currentPayload.exp = Math.floor(Date.now() / 1000) + 3600;
			onPayloadChange(JSON.stringify(currentPayload, null, 2));
		} catch (error) {
			console.error("Invalid JSON in payload:", error);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Clock className="h-5 w-5" />
					Payload
				</CardTitle>
				<CardDescription>JWT payload containing claims and data</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="flex gap-2">
						<Button onClick={addCurrentTime} variant="outline" size="sm">
							Add Current Time
						</Button>
					</div>
					<div className="space-y-2">
						<Label htmlFor="payload">Payload JSON</Label>
						<Textarea
							id="payload"
							value={payload}
							onChange={(e) => onPayloadChange(e.target.value)}
							className="font-mono text-sm"
							rows={6}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
