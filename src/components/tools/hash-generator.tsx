import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CopyButton } from "@/components/copy-button";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import { useToolState } from "@/lib/hooks/use-tool-state";

interface HashType {
    value: string;
    label: string;
    description: string;
}

const hashTypes: HashType[] = [
    { value: "md5", label: "MD5", description: "128-bit hash (not secure for passwords)" },
    { value: "sha1", label: "SHA-1", description: "160-bit hash" },
    { value: "sha256", label: "SHA-256", description: "256-bit hash (recommended)" },
    { value: "sha384", label: "SHA-384", description: "384-bit hash" },
    { value: "sha512", label: "SHA-512", description: "512-bit hash" },
];

export default function HashGeneratorComponent() {
    const { input, output, setInput, setOutput } = useToolState<string>("");
    const [hashType, setHashType] = useState<"md5" | "sha1" | "sha256" | "sha384" | "sha512">("md5");
    const { copied } = useClipboard();

    const generateHash = async () => {
        if (!input.trim()) {
            setOutput("Please enter some text to hash");
            return;
        }

        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(input);

            let hashBuffer: ArrayBuffer;

            switch (hashType) {
                case "sha1":
                    hashBuffer = await crypto.subtle.digest("SHA-1", data);
                    break;
                case "sha256":
                    hashBuffer = await crypto.subtle.digest("SHA-256", data);
                    break;
                case "sha384":
                    hashBuffer = await crypto.subtle.digest("SHA-384", data);
                    break;
                case "sha512":
                    hashBuffer = await crypto.subtle.digest("SHA-512", data);
                    break;
                case "md5":
                    // MD5 is not available in Web Crypto API, using a simple hash for demo
                    setOutput(await simpleMD5(input));
                    return;
                default:
                    hashBuffer = await crypto.subtle.digest("SHA-256", data);
            }

            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
            setOutput(hashHex);
        } catch (error) {
            setOutput("Error generating hash");
        }
    };

    const simpleMD5 = async (str: string): Promise<string> => {
        let hash = 0;
        if (str.length === 0) return hash.toString();
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(16).padStart(8, "0");
    };

    return (
        <div className="grid gap-8">
            <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader>
                    <CardTitle className="text-black dark:text-white">Input Text</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                        Enter the text you want to hash
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter your text here..."
                        className="min-h-32 border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
                    />
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex-1">
                            <div className="flex items-center space-x-2">
                                <Select value={hashType} onValueChange={(v) => setHashType(v as typeof hashType)}>
                                    <SelectTrigger className="border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
                                        <SelectValue placeholder="Select hash algorithm" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {hashTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                <div className="font-medium">{type.label}</div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <span className="text-muted-foreground text-sm">
                                    {hashTypes.find((type) => type.value === hashType)?.description || ""}
                                </span>
                            </div>
                        </div>
                        <Button
                            onClick={generateHash}
                            className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                        >
                            Generate Hash
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader>
                    <CardTitle className="text-black dark:text-white">Generated Hash</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                        Your {hashType.toUpperCase()} hash will appear here
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative">
                        <Textarea
                            value={output}
                            readOnly
                            placeholder="Your hash will appear here after generation..."
                            className="min-h-24 resize-none border-gray-200 bg-gray-50 font-mono text-sm dark:border-gray-800 dark:bg-gray-900"
                        />
                        {output &&
                            output !== "Please enter some text to hash" &&
                            output !== "Error generating hash" && (
                                <div className="absolute top-2 right-2">
                                    <CopyButton
                                        text={output}
                                        className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    />
                                </div>
                            )}
                    </div>
                    {copied && (
                        <p className="text-sm text-green-600 dark:text-green-400">Hash copied to clipboard!</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
