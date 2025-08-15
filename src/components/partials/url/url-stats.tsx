import { Card, CardContent } from "@/components/ui/card";
import type { URLDecodingResult, URLEncodingResult } from "@/lib/utils/url-encoder";

interface URLStatsProps {
	result: URLEncodingResult | URLDecodingResult | null;
	type: "encode" | "decode";
}

export function URLStats({ result, type }: URLStatsProps) {
	if (!result || result.error) return null;

	const isEncoding = type === "encode";
	const stats = result.stats as URLEncodingResult["stats"] | URLDecodingResult["stats"];

	return (
		<Card className="border-gray-200 dark:border-gray-800">
			<CardContent className="pt-4">
				<div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
					<div className="text-center">
						<div className="font-mono text-lg text-black dark:text-white">
							{isEncoding
								? (stats as URLEncodingResult["stats"]).originalLength
								: (stats as URLDecodingResult["stats"]).decodedLength}
						</div>
						<div className="text-gray-600 dark:text-gray-400">
							{isEncoding ? "Original" : "Decoded"} Length
						</div>
					</div>

					<div className="text-center">
						<div className="font-mono text-lg text-black dark:text-white">
							{isEncoding
								? (stats as URLEncodingResult["stats"]).encodedLength
								: (stats as URLDecodingResult["stats"]).originalLength}
						</div>
						<div className="text-gray-600 dark:text-gray-400">
							{isEncoding ? "Encoded" : "Original"} Length
						</div>
					</div>

					<div className="text-center">
						<div className="font-mono text-lg text-black dark:text-white">
							{isEncoding
								? (stats as URLEncodingResult["stats"]).charactersEncoded
								: (stats as URLDecodingResult["stats"]).charactersDecoded}
						</div>
						<div className="text-gray-600 dark:text-gray-400">
							Characters {isEncoding ? "Encoded" : "Decoded"}
						</div>
					</div>

					{isEncoding && "encodingRatio" in stats && (
						<div className="text-center">
							<div className="font-mono text-lg text-black dark:text-white">
								{(stats as URLEncodingResult["stats"]).encodingRatio.toFixed(2)}x
							</div>
							<div className="text-gray-600 dark:text-gray-400">Size Ratio</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
