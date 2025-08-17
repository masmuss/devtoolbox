import { useState, useEffect } from "react";
import { CopyButton } from "@/components/copy-button";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import { getCurrentTimestamp } from "@/lib/utils/unix-timestamp";
import ToolSection from "@/components/tool-section";

export function CurrentTimeDisplay() {
	const [currentTime, setCurrentTime] = useState(getCurrentTimestamp());

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(getCurrentTimestamp());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<ToolSection
			icon={Clock}
			title="Current Timestamp"
			description="Live current time in various formats"
		>
			<div className="grid gap-4">
				<div className="grid gap-3">
					<div className="flex items-center justify-between">
						<Label className="text-sm font-medium">Unix (seconds)</Label>
						<CopyButton text={currentTime.seconds.toString()} />
					</div>
					<div className="bg-muted rounded border p-3 font-mono text-sm">{currentTime.seconds}</div>
				</div>

				<div className="grid gap-3">
					<div className="flex items-center justify-between">
						<Label className="text-sm font-medium">Unix (milliseconds)</Label>
						<CopyButton text={currentTime.milliseconds.toString()} />
					</div>
					<div className="bg-muted rounded border p-3 font-mono text-sm">
						{currentTime.milliseconds}
					</div>
				</div>

				<div className="grid gap-3">
					<div className="flex items-center justify-between">
						<Label className="text-sm font-medium">ISO 8601</Label>
						<CopyButton text={currentTime.iso8601} />
					</div>
					<div className="bg-muted rounded border p-3 font-mono text-sm">{currentTime.iso8601}</div>
				</div>

				<div className="grid gap-3">
					<div className="flex items-center justify-between">
						<Label className="text-sm font-medium">Human Readable</Label>
						<CopyButton text={currentTime.human} />
					</div>
					<div className="bg-muted rounded border p-3 text-sm">{currentTime.human}</div>
				</div>
			</div>
		</ToolSection>
	);
}
