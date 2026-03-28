import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Download } from "lucide-react";
import { toast } from "sonner";

export default function QrCodeGenerator() {
	const [text, setText] = useState("https://astro.build");
	const [bgColor, setBgColor] = useState("#ffffff");
	const [fgColor, setFgColor] = useState("#000000");
	const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("Q");
	const [includeMargin, setIncludeMargin] = useState(true);

	const qrRef = useRef<HTMLDivElement>(null);

	const downloadQR = () => {
		const canvas = qrRef.current?.querySelector("canvas");
		if (canvas) {
			const pngUrl = canvas.toDataURL("image/png");
			const downloadLink = document.createElement("a");
			downloadLink.href = pngUrl;
			downloadLink.download = "qrcode.png";
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
			toast.success("QR Code downloaded successfully!");
		} else {
			toast.error("Could not download QR Code.");
		}
	};

	return (
		<div className="grid gap-6 md:grid-cols-12">
			{/* Input Controls */}
			<Card className="h-fit md:col-span-7">
				<CardHeader>
					<CardTitle>Configuration</CardTitle>
					<CardDescription>Customize your QR Code properties</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-3">
						<Label htmlFor="text">Content (URL, text, WiFi, etc.)</Label>
						<Textarea
							id="text"
							placeholder="Enter text or URL here..."
							value={text}
							onChange={(e) => setText(e.target.value)}
							className="min-h-[120px]"
						/>
					</div>

					<div className="grid gap-6 sm:grid-cols-2">
						<div className="space-y-3">
							<Label htmlFor="level">Error Correction Level</Label>
							<select
								id="level"
								value={level}
								onChange={(e) => setLevel(e.target.value as "L" | "M" | "Q" | "H")}
								className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
							>
								<option value="L">Low (7%)</option>
								<option value="M">Medium (15%)</option>
								<option value="Q">Quartile (25%)</option>
								<option value="H">High (30%)</option>
							</select>
						</div>
					</div>

					<div className="grid gap-6 sm:grid-cols-2">
						<div className="space-y-3">
							<Label htmlFor="fgColor">Foreground Color</Label>
							<div className="flex gap-2">
								<input
									id="fgColor"
									type="color"
									value={fgColor}
									onChange={(e) => setFgColor(e.target.value)}
									className="h-10 w-12 cursor-pointer rounded border p-1"
								/>
								<input
									type="text"
									value={fgColor}
									onChange={(e) => setFgColor(e.target.value)}
									className="border-input bg-background ring-offset-background flex h-10 w-full rounded-md border px-3 py-2 text-sm uppercase"
								/>
							</div>
						</div>

						<div className="space-y-3">
							<Label htmlFor="bgColor">Background Color</Label>
							<div className="flex gap-2">
								<input
									id="bgColor"
									type="color"
									value={bgColor}
									onChange={(e) => setBgColor(e.target.value)}
									className="h-10 w-12 cursor-pointer rounded border p-1"
								/>
								<input
									type="text"
									value={bgColor}
									onChange={(e) => setBgColor(e.target.value)}
									className="border-input bg-background ring-offset-background flex h-10 w-full rounded-md border px-3 py-2 text-sm uppercase"
								/>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-between space-x-2 pt-2">
						<Label htmlFor="margin" className="cursor-pointer">
							Include Safe Margin
						</Label>
						<Switch id="margin" checked={includeMargin} onCheckedChange={setIncludeMargin} />
					</div>
				</CardContent>
			</Card>

			{/* Preview */}
			<Card className="h-fit md:col-span-5">
				<CardHeader>
					<CardTitle>Preview</CardTitle>
					<CardDescription>Live preview of your QR code</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col items-center justify-center space-y-4">
					<div
						ref={qrRef}
						className="flex items-center justify-center rounded-lg border bg-white p-4 will-change-transform"
						style={{ minHeight: "300px" }}
					>
						{text ? (
							<QRCodeCanvas
								value={text}
								size={256}
								bgColor={bgColor}
								fgColor={fgColor}
								level={level}
								includeMargin={includeMargin}
							/>
						) : (
							<p className="text-muted-foreground text-sm">Enter some text to generate QR code</p>
						)}
					</div>
				</CardContent>
				<CardFooter>
					<Button onClick={downloadQR} className="w-full" disabled={!text}>
						<Download className="mr-2 h-4 w-4" />
						Download PNG
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
