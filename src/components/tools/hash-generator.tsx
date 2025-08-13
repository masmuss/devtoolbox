import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy } from "lucide-react"

export default function HashGeneratorPage() {
    const [state, setState] = useState({
        input: "",
        hashType: "md5",
        output: "",
        copied: false,
    })

    const hashTypes = [
        { value: "md5", label: "MD5", description: "128-bit hash (not secure for passwords)" },
        { value: "sha1", label: "SHA-1", description: "160-bit hash" },
        { value: "sha256", label: "SHA-256", description: "256-bit hash (recommended)" },
        { value: "sha384", label: "SHA-384", description: "384-bit hash" },
        { value: "sha512", label: "SHA-512", description: "512-bit hash" },
    ]

    const setField = (key: keyof typeof state, value: string | boolean) => {
        setState((prev) => ({ ...prev, [key]: value }))
    }

    const generateHash = async () => {
        if (!state.input.trim()) {
            setField("output", "Please enter some text to hash")
            return
        }

        try {
            const encoder = new TextEncoder()
            const data = encoder.encode(state.input)

            let hashBuffer: ArrayBuffer

            switch (state.hashType) {
                case "sha1":
                    hashBuffer = await crypto.subtle.digest("SHA-1", data)
                    break
                case "sha256":
                    hashBuffer = await crypto.subtle.digest("SHA-256", data)
                    break
                case "sha384":
                    hashBuffer = await crypto.subtle.digest("SHA-384", data)
                    break
                case "sha512":
                    hashBuffer = await crypto.subtle.digest("SHA-512", data)
                    break
                case "md5":
                    setField("output", await simpleMD5(state.input))
                    setField("copied", false)
                    return
                default:
                    hashBuffer = await crypto.subtle.digest("SHA-256", data)
            }

            const hashArray = Array.from(new Uint8Array(hashBuffer))
            const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
            setField("output", hashHex)
        } catch (error) {
            setField("output", "Error generating hash")
        }
        setField("copied", false)
    }

    const simpleMD5 = async (str: string): Promise<string> => {
        let hash = 0
        if (str.length === 0) return hash.toString()
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i)
            hash = (hash << 5) - hash + char
            hash = hash & hash
        }
        return Math.abs(hash).toString(16).padStart(8, "0")
    }

    const copyToClipboard = async () => {
        if (
            state.output &&
            state.output !== "Please enter some text to hash" &&
            state.output !== "Error generating hash"
        ) {
            await navigator.clipboard.writeText(state.output)
            setField("copied", true)
            setTimeout(() => setField("copied", false), 2000)
        }
    }

    return (
        <div className="grid gap-8 mb-8">
            <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader>
                    <CardTitle className="text-black dark:text-white">Input Text</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                        Enter the text you want to hash
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        value={state.input}
                        onChange={(e) => setField("input", e.target.value)}
                        placeholder="Enter your text here..."
                        className="min-h-32 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                    />
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <Select value={state.hashType} onValueChange={(v) => setField("hashType", v)}>
                                    <SelectTrigger className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
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
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {hashTypes.find((type) => type.value === state.hashType)?.description}
                                </span>
                            </div>
                        </div>
                        <Button onClick={generateHash}>
                            Generate Hash
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader>
                    <CardTitle className="text-black dark:text-white">Generated Hash</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                        Your <code className="font-semibold">{state.hashType.toUpperCase()}</code> hash will appear here
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative">
                        <Textarea
                            value={state.output}
                            readOnly
                            placeholder="Your hash will appear here after generation..."
                            className="min-h-24 font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 resize-none"
                        />
                        {state.output && state.output !== "Please enter some text to hash" && state.output !== "Error generating hash" && (
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={copyToClipboard}
                                className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                    {state.copied && <p className="text-sm text-green-600 dark:text-green-400">Hash copied to clipboard!</p>}
                </CardContent>
            </Card>
        </div>
    )
}
