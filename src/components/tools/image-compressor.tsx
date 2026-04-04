import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Image as ImageIcon, Upload, FileImage, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface FileData {
	file: File;
	previewUrl: string;
	size: number;
	name: string;
	type: string;
}

interface CompressedData {
	blob: Blob;
	previewUrl: string;
	size: number;
}

export default function ImageCompressor() {
	const [originalFile, setOriginalFile] = useState<FileData | null>(null);
	const [compressedResult, setCompressedResult] = useState<CompressedData | null>(null);

	const [quality, setQuality] = useState<number>(0.7);
	const [maxWidth, setMaxWidth] = useState<number>(1920);
	const [isCompressing, setIsCompressing] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);

	// Handle File Selection
	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];

			if (!file.type.startsWith("image/")) {
				toast.error("Please select a valid image file");
				return;
			}

			// Clean up previous blob URLs
			if (originalFile?.previewUrl) URL.revokeObjectURL(originalFile.previewUrl);
			if (compressedResult?.previewUrl) URL.revokeObjectURL(compressedResult.previewUrl);

			setOriginalFile({
				file,
				previewUrl: URL.createObjectURL(file),
				size: file.size,
				name: file.name,
				type: file.type,
			});

			setCompressedResult(null);
			// Reset params smoothly for each new file
			setQuality(0.7);

			toast.info("Image loaded. Adjust settings to compress.");
		}
	};

	// Clean up URLs on unmount
	useEffect(() => {
		return () => {
			if (originalFile?.previewUrl) URL.revokeObjectURL(originalFile.previewUrl);
			if (compressedResult?.previewUrl) URL.revokeObjectURL(compressedResult.previewUrl);
		};
	}, [originalFile, compressedResult]);

	// Compression Logic
	useEffect(() => {
		if (!originalFile) return;

		const compressImage = async () => {
			setIsCompressing(true);
			try {
				const img = new Image();
				img.src = originalFile.previewUrl;

				await new Promise((resolve, reject) => {
					img.onload = resolve;
					img.onerror = reject;
				});

				const canvas = document.createElement("canvas");
				let { width, height } = img;

				// Calculate new dimensions while maintaining aspect ratio
				if (width > maxWidth) {
					height = (height * maxWidth) / width;
					width = maxWidth;
				}

				canvas.width = width;
				canvas.height = height;

				const ctx = canvas.getContext("2d");
				if (!ctx) throw new Error("Could not get canvas context");

				// Draw and resize
				ctx.drawImage(img, 0, 0, width, height);

				// Convert to Blob with new quality
				// Default to JPEG/WEBP if the original was NOT PNG/GIF, otherwise fallback to webp
				// PNG doesn't support 'quality' param during toBlob easily, standardizing output to webp usually produces best results
				const mimeType = originalFile.type === "image/png" ? "image/webp" : "image/jpeg";

				canvas.toBlob(
					(blob) => {
						if (blob) {
							if (compressedResult?.previewUrl) URL.revokeObjectURL(compressedResult.previewUrl);
							setCompressedResult({
								blob,
								previewUrl: URL.createObjectURL(blob),
								size: blob.size,
							});
						}
						setIsCompressing(false);
					},
					mimeType,
					quality,
				);
			} catch (error) {
				console.error("Compression failed:", error);
				toast.error("Failed to compress image");
				setIsCompressing(false);
			}
		};

		// Debounce slightly to prevent lag dragging the slider
		const timer = setTimeout(() => {
			compressImage();
		}, 300);

		return () => clearTimeout(timer);
	}, [originalFile, quality, maxWidth]);

	const formatBytes = (bytes: number, decimals = 2) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
	};

	const performDownload = () => {
		if (!compressedResult || !originalFile) return;

		const link = document.createElement("a");
		link.href = compressedResult.previewUrl;

		// Setup clean filename
		const originalNameWithoutExt =
			originalFile.name.substring(0, originalFile.name.lastIndexOf(".")) || originalFile.name;
		const isPng = originalFile.type === "image/png";
		const newExt = isPng ? "webp" : "jpg"; // Based on our encoder target type up above

		link.download = `${originalNameWithoutExt}-compressed.${newExt}`;

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		toast.success("Image downloaded!");
	};

	const calculateSavings = () => {
		if (!originalFile || !compressedResult) return 0;
		const diff = originalFile.size - compressedResult.size;
		return Math.max(0, (diff / originalFile.size) * 100);
	};

	return (
		<div className="grid gap-6 space-y-0 md:grid-cols-12">
			{/* Controls & Input */}
			<div className="flex h-fit flex-col gap-6 md:col-span-5 lg:col-span-4">
				<Card className="border-border/50">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Upload className="text-primary h-5 w-5" />
							Upload Image
						</CardTitle>
						<CardDescription>Select an image to compress locally</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{!originalFile ? (
							<div
								className="bg-muted/20 hover:bg-muted/40 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 text-center transition-colors"
								onClick={() => fileInputRef.current?.click()}
							>
								<ImageIcon className="text-muted-foreground h-10 w-10 opacity-50" />
								<div className="space-y-1">
									<p className="text-sm font-semibold">Click to upload image</p>
									<p className="text-muted-foreground text-xs">JPEG, PNG, WEBP (Max 10MB approx)</p>
								</div>
							</div>
						) : (
							<div className="bg-muted/20 flex items-center justify-between rounded-lg border p-3">
								<div className="flex items-center gap-3 overflow-hidden">
									<FileImage className="text-primary h-8 w-8 shrink-0" />
									<div className="truncate">
										<p className="truncate text-sm font-medium">{originalFile.name}</p>
										<p className="text-muted-foreground text-xs">
											{formatBytes(originalFile.size)}
										</p>
									</div>
								</div>
								<Button
									size="icon"
									variant="destructive"
									className="h-8 w-8 shrink-0"
									onClick={() => {
										setOriginalFile(null);
										setCompressedResult(null);
									}}
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						)}
						<input
							type="file"
							ref={fileInputRef}
							accept="image/jpeg, image/png, image/webp"
							className="hidden"
							onChange={handleFileSelect}
						/>
					</CardContent>
				</Card>

				<Card
					className={`border-border/50 ${!originalFile ? "pointer-events-none opacity-50" : ""}`}
				>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Save className="text-primary h-5 w-5" />
							Settings
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-3">
							<div className="flex items-center justify-between text-sm">
								<span className="font-medium">Compression Quality</span>
								<span className="text-muted-foreground">{Math.round(quality * 100)}%</span>
							</div>
							<Slider
								value={[quality * 100]}
								min={1}
								max={100}
								step={1}
								onValueChange={(vals) => setQuality(vals[0] / 100)}
							/>
							<p className="text-muted-foreground text-xs">Lower quality = smaller file size</p>
						</div>

						<div className="space-y-3 pt-2">
							<div className="flex items-center justify-between text-sm">
								<span className="font-medium">Max Width Limit</span>
								<span className="text-muted-foreground">{maxWidth}px</span>
							</div>
							<Slider
								value={[maxWidth]}
								min={500}
								max={3840}
								step={100}
								onValueChange={(vals) => setMaxWidth(vals[0])}
							/>
							<p className="text-muted-foreground text-xs">
								Images wider than this will be downscaled
							</p>
						</div>

						<Button
							className="mt-4 w-full gap-2"
							onClick={performDownload}
							disabled={!compressedResult || isCompressing}
						>
							<Download className="h-4 w-4" />
							Download Output
						</Button>
					</CardContent>
				</Card>
			</div>

			{/* Views */}
			<div className="h-fit md:col-span-7 lg:col-span-8">
				<Card className="border-border/50 flex h-full min-h-[400px] flex-col">
					<CardHeader className="pb-4">
						<div className="flex items-center justify-between">
							<CardTitle className="text-xl">Preview & Statistics</CardTitle>
							{compressedResult && !isCompressing && (
								<Badge
									variant="secondary"
									className="border-green-500/20 bg-green-500/10 px-3 text-green-600 dark:text-green-400"
								>
									Saved {calculateSavings().toFixed(1)}%
								</Badge>
							)}
						</div>
					</CardHeader>
					<CardContent className="flex flex-1 flex-col">
						{!originalFile ? (
							<div className="text-muted-foreground bg-muted/10 flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed p-12">
								<ImageIcon className="mb-4 h-16 w-16 opacity-20" />
								<p>Upload an image to see live preview.</p>
								<p className="mt-2 text-center text-sm opacity-70">
									Processing happens 100% offline in your browser.
								</p>
							</div>
						) : (
							<div className="flex flex-1 flex-col space-y-6">
								{/* Stats boxes */}
								<div className="grid h-fit grid-cols-2 gap-4">
									<div className="bg-muted/20 border-border/50 space-y-1 rounded-xl border p-4">
										<p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
											Original
										</p>
										<p className="text-2xl font-bold">{formatBytes(originalFile.size)}</p>
									</div>
									<div className="bg-primary/5 border-primary/20 relative space-y-1 overflow-hidden rounded-xl border p-4">
										{isCompressing && (
											<div className="bg-background/50 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
												<div className="border-primary h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
											</div>
										)}
										<p className="text-primary text-xs font-semibold tracking-wider uppercase">
											Compressed
										</p>
										<p className="text-2xl font-bold">
											{compressedResult ? formatBytes(compressedResult.size) : "..."}
										</p>
									</div>
								</div>

								{/* Image Render */}
								<div className="group patterned-bg relative flex min-h-[300px] flex-1 items-center justify-center overflow-hidden rounded-lg border bg-[#dedede] dark:bg-[#121212]">
									{/* Quick CSS pattern for transparency check */}
									<style>{`
										.patterned-bg {
											background-image: 
												linear-gradient(45deg, rgba(128,128,128,0.1) 25%, transparent 25%), 
												linear-gradient(-45deg, rgba(128,128,128,0.1) 25%, transparent 25%),
												linear-gradient(45deg, transparent 75%, rgba(128,128,128,0.1) 75%),
												linear-gradient(-45deg, transparent 75%, rgba(128,128,128,0.1) 75%);
											background-size: 20px 20px;
											background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
										}
									`}</style>

									{isCompressing || !compressedResult ? (
										<img
											src={originalFile.previewUrl}
											className="h-full w-full object-contain blur-sm filter transition-all"
											alt="Loading preview"
										/>
									) : (
										// Using key={previewUrl} enforces rerender on blob generation to prevent ghost caching
										<img
											key={compressedResult.previewUrl}
											src={compressedResult.previewUrl}
											className="h-full max-h-[500px] w-full object-contain"
											alt="Compressed preview"
										/>
									)}
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
