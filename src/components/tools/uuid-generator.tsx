import { useState, useCallback, useEffect } from "react";
import { v1 as uuidv1, v4 as uuidv4, NIL as NIL_UUID } from "uuid";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Trash2, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

type UuidVersion = "v1" | "v4" | "nil";

export default function UuidGenerator() {
	const [version, setVersion] = useState<UuidVersion>("v4");
	const [quantity, setQuantity] = useState<number>(1);
	const [uppercase, setUppercase] = useState<boolean>(false);
	const [noHyphens, setNoHyphens] = useState<boolean>(false);
	const [braces, setBraces] = useState<boolean>(false);
	const [uuids, setUuids] = useState<string[]>([]);
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

	const generateUuids = useCallback(() => {
		const newUuids: string[] = [];
		const amt = Math.min(Math.max(1, quantity), 1000); // cap to 1000
		for (let i = 0; i < amt; i++) {
			let id = "";
			if (version === "v1") id = uuidv1();
			else if (version === "v4") id = uuidv4();
			else if (version === "nil") id = NIL_UUID;

			if (noHyphens) id = id.replace(/-/g, "");
			if (uppercase) id = id.toUpperCase();
			if (braces) id = `{${id}}`;

			newUuids.push(id);
		}
		setUuids(newUuids);
		setCopiedIndex(null);
	}, [version, quantity, uppercase, noHyphens, braces]);

	useEffect(() => {
		generateUuids();
	}, [generateUuids]);

	const copyToClipboard = (text: string, index: number | null = null) => {
		navigator.clipboard.writeText(text);
		if (index !== null) {
			setCopiedIndex(index);
			setTimeout(() => {
				if (copiedIndex === index) setCopiedIndex(null);
			}, 2000);
		}
		toast.success(index !== null ? "Copied to clipboard!" : `${uuids.length} UUIDs copied!`);
	};

	return (
		<div className="grid gap-6 md:grid-cols-12">
			{/* Controls */}
			<Card className="h-fit md:col-span-4">
				<CardHeader>
					<CardTitle>Configuration</CardTitle>
					<CardDescription>Customize how your UUIDs are generated</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-3">
						<Label htmlFor="version">UUID Version</Label>
						<select
							id="version"
							value={version}
							onChange={(e) => setVersion(e.target.value as UuidVersion)}
							className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
						>
							<option value="v4">Version 4 (Random)</option>
							<option value="v1">Version 1 (Time-based)</option>
							<option value="nil">Nil UUID (Empty)</option>
						</select>
					</div>

					<div className="space-y-3">
						<Label htmlFor="quantity">Quantity (1 - 1000)</Label>
						<Input
							id="quantity"
							type="number"
							min={1}
							max={1000}
							value={quantity}
							onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
						/>
					</div>

					<div className="space-y-4 pt-2">
						<div className="flex items-center justify-between space-x-2">
							<Label htmlFor="uppercase" className="cursor-pointer">
								Uppercase letters
							</Label>
							<Switch id="uppercase" checked={uppercase} onCheckedChange={setUppercase} />
						</div>

						<div className="flex items-center justify-between space-x-2">
							<Label htmlFor="no-hyphens" className="cursor-pointer">
								Remove hyphens
							</Label>
							<Switch id="no-hyphens" checked={noHyphens} onCheckedChange={setNoHyphens} />
						</div>

						<div className="flex items-center justify-between space-x-2">
							<Label htmlFor="braces" className="cursor-pointer">
								Wrap in braces {"{}"}
							</Label>
							<Switch id="braces" checked={braces} onCheckedChange={setBraces} />
						</div>
					</div>

					<Button onClick={generateUuids} className="w-full">
						<RefreshCw className="mr-2 h-4 w-4" />
						Generate New UUIDs
					</Button>
				</CardContent>
			</Card>

			{/* Output */}
			<Card className="h-fit md:col-span-8">
				<CardHeader className="flex flex-row items-center justify-between pb-4">
					<div className="space-y-1">
						<CardTitle>Generated UUIDs</CardTitle>
						<CardDescription>{uuids.length} UUID(s) generated</CardDescription>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm" onClick={() => copyToClipboard(uuids.join("\n"))}>
							<Copy className="mr-2 h-4 w-4" />
							Copy All
						</Button>
						<Button variant="outline" size="sm" onClick={() => setUuids([])}>
							<Trash2 className="mr-2 h-4 w-4" />
							Clear
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					<div className="bg-muted/50 rounded-md border p-4">
						{uuids.length === 0 ? (
							<p className="text-muted-foreground py-8 text-center text-sm">
								No UUIDs generated. Click generate to create some.
							</p>
						) : (
							<div className="max-h-[500px] space-y-2 overflow-y-auto pr-2 font-mono text-sm">
								{uuids.map((id, index) => (
									<div
										key={id}
										className="group bg-background hover:bg-muted flex items-center justify-between rounded p-2 transition-colors"
									>
										<span className="truncate">{id}</span>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
											onClick={() => copyToClipboard(id, index)}
											aria-label="Copy UUID"
										>
											{copiedIndex === index ? (
												<Check className="h-4 w-4 text-green-500" />
											) : (
												<Copy className="h-4 w-4" />
											)}
										</Button>
									</div>
								))}
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
