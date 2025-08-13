import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, RefreshCw } from "lucide-react"

export default function SlugGeneratorPage() {
    const [state, setState] = useState({
        input: "",
        output: "",
        separator: "-",
        lowercase: true,
        removeSpecialChars: true,
        maxLength: "",
        copied: false,
    })

    const setField = (key: keyof typeof state, value: string | boolean) => {
        setState((prev) => ({ ...prev, [key]: value }))
    }

    const generateSlug = (text: string) => {
        let slug = text

        if (state.lowercase) {
            slug = slug.toLowerCase()
        }

        if (state.removeSpecialChars) {
            slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            slug = slug.replace(/[^a-zA-Z0-9\s\-_]/g, "")
        }

        slug = slug.replace(/[\s\-_]+/g, state.separator)

        slug = slug.replace(new RegExp(`^${state.separator}+|${state.separator}+$`, "g"), "")

        if (state.maxLength && Number.parseInt(state.maxLength) > 0) {
            slug = slug.substring(0, Number.parseInt(state.maxLength))
            slug = slug.replace(new RegExp(`${state.separator}+$`), "")
        }

        return slug
    }

    useEffect(() => {
        if (state.input.trim()) {
            setField("output", generateSlug(state.input))
        } else {
            setField("output", "")
        }
        setField("copied", false)
    }, [state.input, state.separator, state.lowercase, state.removeSpecialChars, state.maxLength])

    const copyToClipboard = async () => {
        if (state.output) {
            await navigator.clipboard.writeText(state.output)
            setField("copied", true)
            setTimeout(() => setField("copied", false), 2000)
        }
    }

    const clearAll = () => {
        setState({
            input: "",
            output: "",
            separator: "-",
            lowercase: true,
            removeSpecialChars: true,
            maxLength: "",
            copied: false,
        })
    }

    const exampleTexts = [
        "Hello World! This is a Test",
        "How to Build a React App in 2024",
        "The Quick Brown Fox Jumps Over the Lazy Dog",
        "Understanding JavaScript Promises & Async/Await",
        "10 Tips for Better Web Development",
    ]

    const loadExample = (text: string) => {
        setField("input", text)
    }

    return (
        <div className="grid gap-8 mb-8">
            {/* Input Section */}
            <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader>
                    <CardTitle className="text-black dark:text-white">Input Text</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                        Enter the text you want to convert to a slug
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Textarea
                        value={state.input}
                        onChange={(e) => setField("input", e.target.value)}
                        placeholder="Enter your text here..."
                        className="min-h-24 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                    />

                    {/* Example buttons */}
                    <div className="space-y-2">
                        <Label className="text-sm text-gray-600 dark:text-gray-400">Try these examples:</Label>
                        <div className="flex flex-wrap gap-2">
                            {exampleTexts.map((text, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => loadExample(text)}
                                    className="text-xs border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                                >
                                    {text.length > 30 ? text.substring(0, 30) + "..." : text}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            onClick={clearAll}
                            variant="default"
                        >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Clear
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Options */}
            <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader>
                    <CardTitle className="text-black dark:text-white">Options</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                        Customize how your slug is generated
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Separator */}
                        <div className="space-y-2">
                            <Label className="text-black dark:text-white">Separator</Label>
                            <Select value={state.separator} onValueChange={(v) => setField("separator", v)}>
                                <SelectTrigger className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="-">Hyphen (-)</SelectItem>
                                    <SelectItem value="_">Underscore (_)</SelectItem>
                                    <SelectItem value=".">Dot (.)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Max Length */}
                        <div className="space-y-2">
                            <Label className="text-black dark:text-white">Max Length (optional)</Label>
                            <Input
                                type="number"
                                value={state.maxLength}
                                onChange={(e) => setField("maxLength", e.target.value)}
                                placeholder="No limit"
                                min="1"
                                max="200"
                                className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="lowercase" checked={state.lowercase} onCheckedChange={(checked) => setField("lowercase", !!checked)} />
                            <Label htmlFor="lowercase" className="text-gray-700 dark:text-gray-300">
                                Convert to lowercase
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="remove-special" checked={state.removeSpecialChars} onCheckedChange={(checked) => setField("removeSpecialChars", !!checked)} />
                            <Label htmlFor="remove-special" className="text-gray-700 dark:text-gray-300">
                                Remove special characters and accents
                            </Label>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Output Section */}
            <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader>
                    <CardTitle className="text-black dark:text-white">Generated Slug</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                        Your URL-friendly slug will appear here automatically
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative">
                        <Input
                            value={state.output}
                            readOnly
                            placeholder="Your slug will appear here..."
                            className="pr-12 font-mono text-sm bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                        />
                        {state.output && (
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={copyToClipboard}
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                    {state.copied && <p className="text-sm text-green-600 dark:text-green-400">Slug copied to clipboard!</p>}

                    {/* Preview URL */}
                    {state.output && (
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <Label className="text-sm text-gray-600 dark:text-gray-400">Preview URL:</Label>
                            <p className="font-mono text-sm text-gray-800 dark:text-gray-200 break-all">
                                https://example.com/blog/{state.output}
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
