import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, RefreshCw, ArrowUpDown } from "lucide-react"
import { Label } from "../ui/label"

export default function URLEncoderPage() {
    const [state, setState] = useState({
        encodeInput: "",
        encodeOutput: "",
        decodeInput: "",
        decodeOutput: "",
        encodeCopied: false,
        decodeCopied: false,
    })

    const setField = (key: keyof typeof state, value: string | boolean) => {
        setState((prev) => ({ ...prev, [key]: value }))
    }

    const encodeURL = () => {
        try {
            const encoded = encodeURIComponent(state.encodeInput)
            setField("encodeOutput", encoded)
            setField("encodeCopied", false)
        } catch (error) {
            setField("encodeOutput", "Error: Invalid input for encoding")
        }
    }

    const decodeURL = () => {
        try {
            const decoded = decodeURIComponent(state.decodeInput)
            setField("decodeOutput", decoded)
            setField("decodeCopied", false)
        } catch (error) {
            setField("decodeOutput", "Error: Invalid URL encoding")
        }
    }

    const copyEncoded = async () => {
        if (state.encodeOutput && !state.encodeOutput.startsWith("Error:")) {
            await navigator.clipboard.writeText(state.encodeOutput)
            setField("encodeCopied", true)
            setTimeout(() => setField("encodeCopied", false), 2000)
        }
    }

    const copyDecoded = async () => {
        if (state.decodeOutput && !state.decodeOutput.startsWith("Error:")) {
            await navigator.clipboard.writeText(state.decodeOutput)
            setField("decodeCopied", true)
            setTimeout(() => setField("decodeCopied", false), 2000)
        }
    }

    const clearEncode = () => {
        setField("encodeInput", "")
        setField("encodeOutput", "")
        setField("encodeCopied", false)
    }

    const clearDecode = () => {
        setField("decodeInput", "")
        setField("decodeOutput", "")
        setField("decodeCopied", false)
    }

    const swapEncodeDecode = () => {
        setState((prev) => ({
            encodeInput: prev.decodeInput,
            encodeOutput: prev.decodeOutput,
            decodeInput: prev.encodeInput,
            decodeOutput: prev.encodeOutput,
            encodeCopied: false,
            decodeCopied: false,
        }))
    }

    const exampleURLs = [
        "https://example.com/search?q=hello world&category=tech",
        "https://api.example.com/users?name=John Doe&email=john@example.com",
        "Special characters: !@#$%^&*()+={}[]|\\:;\"'<>,.?/~`",
        "Unicode: 你好世界 🌍 café naïve résumé",
        "Spaces and symbols: This is a test & more!",
    ]

    const exampleEncoded = [
        "https%3A//example.com/search%3Fq%3Dhello%20world%26category%3Dtech",
        "https%3A//api.example.com/users%3Fname%3DJohn%20Doe%26email%3Djohn%40example.com",
        "Special%20characters%3A%20!%40%23%24%25%5E%26*()%2B%3D%7B%7D%5B%5D%7C%5C%3A%3B%22'%3C%3E%2C.%3F/~%60",
    ]

    return (
        <Tabs defaultValue="encode" className="space-y-8">
            <div className="flex justify-center">
                <TabsList className="grid w-full max-w-md grid-cols-2 bg-gray-100 dark:bg-gray-900">
                    <TabsTrigger value="encode" className="data-[state=active]:bg-white dark:data-[state=active]:bg-black">
                        Encode
                    </TabsTrigger>
                    <TabsTrigger value="decode" className="data-[state=active]:bg-white dark:data-[state=active]:bg-black">
                        Decode
                    </TabsTrigger>
                </TabsList>
            </div>

            {/* Encode Tab */}
            <TabsContent value="encode" className="space-y-8">
                <Card className="border-gray-200 dark:border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-black dark:text-white">URL Encode</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                            Convert special characters to percent-encoded format
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Input (Plain Text/URL)</Label>
                            <Textarea
                                value={state.encodeInput}
                                onChange={(e) => setField("encodeInput", e.target.value)}
                                placeholder="Enter text or URL to encode..."
                                className="min-h-24 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Button
                                onClick={encodeURL}
                                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                            >
                                Encode URL
                            </Button>
                            <Button
                                onClick={clearEncode}
                                variant="outline"
                                className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 bg-transparent"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Clear
                            </Button>
                            <Button
                                onClick={swapEncodeDecode}
                                variant="outline"
                                className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 bg-transparent"
                            >
                                <ArrowUpDown className="h-4 w-4 mr-2" />
                                Swap with Decode
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <Label>Output (Encoded)</Label>
                            <div className="relative">
                                <Textarea
                                    value={state.encodeOutput}
                                    readOnly
                                    placeholder="Encoded URL will appear here..."
                                    className="min-h-24 font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 resize-none"
                                />
                                {state.encodeOutput && !state.encodeOutput.startsWith("Error:") && (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={copyEncoded}
                                        className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                            {state.encodeCopied && <p className="text-sm text-green-600 dark:text-green-400">Copied to clipboard!</p>}
                        </div>

                        {/* Examples for encoding */}
                        <div className="space-y-2">
                            <Label>Try these examples:</Label>
                            <div className="grid gap-2">
                                {exampleURLs.map((url, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setField("encodeInput", url)}
                                        className="justify-start text-left h-auto p-3 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                                    >
                                        <span className="truncate text-xs">{url}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Decode Tab */}
            <TabsContent value="decode" className="space-y-8">
                <Card className="border-gray-200 dark:border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-black dark:text-white">URL Decode</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                            Convert percent-encoded characters back to readable format
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-black dark:text-white">Input (Encoded URL)</Label>
                            <Textarea
                                value={state.decodeInput}
                                onChange={(e) => setField("decodeInput", e.target.value)}
                                placeholder="Enter encoded URL to decode..."
                                className="min-h-24 font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Button
                                onClick={decodeURL}
                                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                            >
                                Decode URL
                            </Button>
                            <Button
                                onClick={clearDecode}
                                variant="outline"
                                className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 bg-transparent"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Clear
                            </Button>
                            <Button
                                onClick={swapEncodeDecode}
                                variant="outline"
                                className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 bg-transparent"
                            >
                                <ArrowUpDown className="h-4 w-4 mr-2" />
                                Swap with Encode
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-black dark:text-white">Output (Decoded)</Label>
                            <div className="relative">
                                <Textarea
                                    value={state.decodeOutput}
                                    readOnly
                                    placeholder="Decoded URL will appear here..."
                                    className="min-h-24 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 resize-none"
                                />
                                {state.decodeOutput && !state.decodeOutput.startsWith("Error:") && (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={copyDecoded}
                                        className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                            {state.decodeCopied && <p className="text-sm text-green-600 dark:text-green-400">Copied to clipboard!</p>}
                        </div>

                        {/* Examples for decoding */}
                        <div className="space-y-2">
                            <Label>Try these examples:</Label>
                            <div className="grid gap-2">
                                {exampleEncoded.map((url, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setField("decodeInput", url)}
                                        className="justify-start text-left h-auto p-3 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                                    >
                                        <span className="truncate text-xs font-mono">{url}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
