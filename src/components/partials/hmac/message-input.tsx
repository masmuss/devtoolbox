import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Hash } from "lucide-react";

interface MessageInputProps {
	message: string;
	onMessageChange: (message: string) => void;
}

export function MessageInput({ message, onMessageChange }: MessageInputProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Hash className="h-5 w-5" />
					Message Input
				</CardTitle>
				<CardDescription>Enter the message to authenticate</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="message">Message</Label>
						<Textarea
							id="message"
							placeholder="Enter your message here..."
							value={message}
							onChange={(e) => onMessageChange(e.target.value)}
							className="min-h-[120px]"
						/>
					</div>
					<div className="text-sm text-gray-500 dark:text-gray-400">
						Message length: {message.length} characters
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
