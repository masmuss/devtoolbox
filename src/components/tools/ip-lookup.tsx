import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, MapPin, Search, Network, Clock, ExternalLink, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface IpData {
	query: string;
	status: string;
	message?: string;
	continent?: string;
	country: string;
	countryCode: string;
	regionName: string;
	city: string;
	zip: string;
	lat: number;
	lon: number;
	timezone: string;
	offset?: number;
	currency?: string;
	isp: string;
	org: string;
	as: string;
}

// Convert country code to emoji flag
const getFlagEmoji = (countryCode: string) => {
	if (!countryCode) return "🌍";
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt(0));
	return String.fromCodePoint(...codePoints);
};

export default function IpLookup() {
	const [ipAddress, setIpAddress] = useState("");
	const [data, setData] = useState<IpData | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [initialIpLoad, setInitialIpLoad] = useState(true);

	// Fetch user's own IP on mount
	useEffect(() => {
		const fetchOwnIp = async () => {
			try {
				// We use HTTP because ip-api free tier does not support HTTPS
				// If your app is deployed to HTTPS, this fetch will be blocked by Mixed Content policy.
				const response = await fetch(
					"http://ip-api.com/json/?fields=status,message,continent,country,countryCode,region,regionName,city,zip,lat,lon,timezone,offset,currency,isp,org,as,query",
				);
				const result = await response.json();
				if (result.status === "success") {
					setData(result);
				}
			} catch (error) {
				console.error("Failed to fetch initial IP data:", error);
			} finally {
				setInitialIpLoad(false);
			}
		};

		fetchOwnIp();
	}, []);

	const lookupIp = async (ipToSearch: string) => {
		if (!ipToSearch.trim()) {
			toast.error("Please enter a valid IP address");
			return;
		}

		setIsLoading(true);
		setData(null);

		try {
			const response = await fetch(
				`http://ip-api.com/json/${encodeURIComponent(ipToSearch.trim())}?fields=status,message,continent,country,countryCode,region,regionName,city,zip,lat,lon,timezone,offset,currency,isp,org,as,query`,
			);
			const result = await response.json();

			if (result.status === "fail") {
				toast.error(result.message || "Failed to lookup IP Address");
			} else if (result.status === "success") {
				setData(result);
				toast.success("IP data retrieved successfully");
			}
		} catch {
			toast.error(
				"Network error: Could not reach the IP API. (If you are on HTTPS, ip-api HTTP will be blocked)",
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSearch = () => lookupIp(ipAddress);

	return (
		<div className="grid gap-6 md:grid-cols-12">
			{/* Input Section */}
			<Card className="border-border/50 h-fit md:col-span-4 lg:col-span-4">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Search className="text-primary h-5 w-5" />
						IP Lookup
					</CardTitle>
					<CardDescription>Enter any IPv4 or IPv6 address</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Input
							placeholder="e.g. 8.8.8.8"
							value={ipAddress}
							onChange={(e) => setIpAddress(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") handleSearch();
							}}
						/>
						<div className="flex gap-2">
							<Button
								className="w-full"
								onClick={handleSearch}
								disabled={isLoading || !ipAddress.trim()}
							>
								{isLoading ? "Searching..." : "Lookup IP"}
							</Button>
						</div>
					</div>

					<div className="flex items-start gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 p-3 text-xs text-blue-500">
						<Globe className="mt-0.5 h-4 w-4 shrink-0" />
						<p>
							Powered by <strong>ip-api.com</strong>. Free tier limitation: operates strictly over
							HTTP network protocols.
						</p>
					</div>

					{typeof window !== "undefined" && window.location.protocol === "https:" && (
						<div className="flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-500">
							<AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
							<p>
								Warning: You are accessing this site via HTTPS. Browser Mixed Content rules may
								block the HTTP request to ip-api.
							</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Results Section */}
			<Card className="border-border/50 h-fit md:col-span-8 lg:col-span-8">
				<CardHeader className="border-border/50 border-b pb-4">
					<div className="flex items-center justify-between">
						<div>
							<CardTitle className="text-xl">Network Information</CardTitle>
							<CardDescription>Geolocation and ISP details</CardDescription>
						</div>
					</div>
				</CardHeader>

				<CardContent>
					{initialIpLoad && !data ? (
						<div className="flex flex-col items-center justify-center py-12">
							<div className="border-primary mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
							<p className="text-muted-foreground animate-pulse">Detecting your IP address...</p>
						</div>
					) : isLoading ? (
						<div className="flex flex-col items-center justify-center py-12">
							<div className="border-primary mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
							<p className="text-muted-foreground animate-pulse">Querying database...</p>
						</div>
					) : !data ? (
						<div className="text-muted-foreground flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-12">
							<Globe className="mb-3 h-12 w-12 opacity-20" />
							<p>Enter an IP address to see geolocation data.</p>
						</div>
					) : (
						<div className="space-y-6">
							{/* Large IP Header */}
							<div className="flex items-center gap-4">
								<span className="overflow-hidden text-4xl" title={data.country}>
									{getFlagEmoji(data.countryCode)}
								</span>
								<div>
									<h2 className="text-3xl font-bold tracking-tight">{data.query}</h2>
									<p className="text-muted-foreground mt-1 flex items-center gap-1">
										<MapPin className="h-4 w-4" />
										{data.city ? `${data.city}, ` : ""}
										{data.regionName ? `${data.regionName}, ` : ""}
										{data.country}
									</p>
								</div>
							</div>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								{/* Location Data */}
								<div className="bg-muted/30 space-y-3 rounded-xl border p-4">
									<h3 className="text-foreground/80 mb-4 flex items-center gap-2 text-sm font-semibold">
										<Globe className="h-4 w-4" /> Location Details
									</h3>

									<div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
										<span className="text-muted-foreground">Country</span>
										<span className="font-medium">
											{data.country} ({data.countryCode})
										</span>

										<span className="text-muted-foreground">Region</span>
										<span className="font-medium">{data.regionName}</span>

										<span className="text-muted-foreground">City</span>
										<span className="font-medium">
											{data.city} {data.zip ? `(${data.zip})` : ""}
										</span>

										<span className="text-muted-foreground">Continent</span>
										<span className="font-medium">{data.continent || "N/A"}</span>

										<span className="text-muted-foreground">Coordinates</span>
										<a
											href={`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lon}`}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-1 font-medium text-blue-500 hover:underline"
										>
											{data.lat}, {data.lon} <ExternalLink className="h-3 w-3" />
										</a>
									</div>
								</div>

								{/* Connection Data */}
								<div className="bg-muted/30 space-y-3 rounded-xl border p-4">
									<h3 className="text-foreground/80 mb-4 flex items-center gap-2 text-sm font-semibold">
										<Network className="h-4 w-4" /> Connection Provider
									</h3>

									<div className="grid grid-cols-[100px_1fr] gap-2 text-sm">
										<span className="text-muted-foreground">ISP</span>
										<span className="font-medium">{data.isp}</span>

										<span className="text-muted-foreground">Org</span>
										<span className="font-medium">{data.org}</span>

										<span className="text-muted-foreground">ASN</span>
										<span className="font-medium">{data.as}</span>
									</div>
								</div>

								{/* Time & Other Specs */}
								<div className="bg-muted/30 space-y-3 rounded-xl border p-4 md:col-span-2">
									<h3 className="text-foreground/80 mb-4 flex items-center gap-2 text-sm font-semibold">
										<Clock className="h-4 w-4" /> Local Time details
									</h3>

									<div className="grid grid-cols-2 gap-4 text-sm lg:grid-cols-3">
										<div>
											<span className="text-muted-foreground mb-1 block text-xs">Timezone</span>
											<span className="font-medium">{data.timezone}</span>
										</div>
										<div>
											<span className="text-muted-foreground mb-1 block text-xs">UTC Offset</span>
											{/* Offset comes in seconds from UTC if requested via fields, or we just rely on JS string */}
											<span className="font-medium">
												{data.offset !== undefined
													? `UTC ${data.offset > 0 ? "+" : ""}${data.offset / 3600}`
													: "N/A"}
											</span>
										</div>
										<div>
											<span className="text-muted-foreground mb-1 block text-xs">
												Expected Currency
											</span>
											<span className="font-medium">{data.currency || "N/A"}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
