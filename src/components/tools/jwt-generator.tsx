import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, Key, Shield, Clock, EyeOff, Eye } from "lucide-react"
import { useToolState } from "@/lib/hooks/use-tool-state"
import { CopyButton } from "../copy-button"

export default function JWTGeneratorComponent() {
    const { input, output, setInput, setOutput, isProcessing, setIsProcessing } = useToolState<string>("")

    const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}')
    const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}')
    const [secret, setSecret] = useState("your-256-bit-secret")
    const [algorithm, setAlgorithm] = useState("HS256")
    const [showSecret, setShowSecret] = useState(false)

    useEffect(() => {
        try {
            const headerObj = JSON.parse(header)
            if (headerObj.alg !== algorithm) {
                headerObj.alg = algorithm
                setHeader(JSON.stringify(headerObj, null, 2))
            }
        } catch {
            // If header is not valid JSON, do not update
        }
    }, [algorithm])

    const handleHeaderChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHeader(e.target.value)
        try {
            const headerObj = JSON.parse(e.target.value)
            if (headerObj.alg && headerObj.alg !== algorithm) {
                setAlgorithm(headerObj.alg)
            }
        } catch {
        }
    }

    const base64urlEncode = (str: string) => {
        return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
    }

    const generateSignature = async (data: string, secret: string) => {
        const encoder = new TextEncoder()
        const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, [
            "sign",
        ])
        const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data))
        return base64urlEncode(String.fromCharCode(...new Uint8Array(signature)))
    }

    const generateJWT = async () => {
        try {
            setIsProcessing(true)
            const encodedHeader = base64urlEncode(header)
            const encodedPayload = base64urlEncode(payload)
            const data = `${encodedHeader}.${encodedPayload}`

            if (algorithm === "HS256") {
                const signature = await generateSignature(data, secret)
                setOutput(`${data}.${signature}`)
            } else {
                const demoSignature = base64urlEncode("demo-signature-" + Date.now())
                setOutput(`${data}.${demoSignature}`)
            }
        } catch (error) {
            console.error("Error generating JWT:", error)
        } finally {
            setIsProcessing(false)
        }
    }

    const addCurrentTime = () => {
        const currentPayload = JSON.parse(payload)
        currentPayload.iat = Math.floor(Date.now() / 1000)
        currentPayload.exp = Math.floor(Date.now() / 1000) + 3600
        setPayload(JSON.stringify(currentPayload, null, 2))
    }

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {/* Input Section */}
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Header
                        </CardTitle>
                        <CardDescription>JWT header containing algorithm and token type</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="algorithm">Algorithm</Label>
                                <Select value={algorithm} onValueChange={setAlgorithm}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="HS256">HS256</SelectItem>
                                        <SelectItem value="HS384">HS384</SelectItem>
                                        <SelectItem value="HS512">HS512</SelectItem>
                                        <SelectItem value="RS256">RS256</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="header">Header JSON</Label>
                                <Textarea
                                    id="header"
                                    value={header}
                                    onChange={handleHeaderChange}
                                    className="font-mono text-sm"
                                    rows={4}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Payload
                        </CardTitle>
                        <CardDescription>JWT payload containing claims and data</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <Button onClick={addCurrentTime} variant="outline" size="sm">
                                    Add Current Time
                                </Button>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="payload">Payload JSON</Label>
                                <Textarea
                                    id="payload"
                                    value={payload}
                                    onChange={(e) => setPayload(e.target.value)}
                                    className="font-mono text-sm"
                                    rows={6}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Key className="h-5 w-5" />
                            Secret Key
                        </CardTitle>
                        <CardDescription>Secret key for HMAC algorithms</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="secret">Secret</Label>
                            <div className="relative">
                                <Input
                                    id="secret"
                                    type={showSecret ? "text" : "password"}
                                    value={secret}
                                    onChange={(e) => setSecret(e.target.value)}
                                    className="font-mono pr-10"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowSecret(!showSecret)}
                                >
                                    {showSecret ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Output Section */}
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Generated JWT Token</CardTitle>
                        <CardDescription>Your encoded JSON Web Token</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Button onClick={generateJWT} className="w-full" disabled={isProcessing}>
                                {isProcessing ? "Generating..." : "Generate JWT Token"}
                            </Button>

                            {output && (
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>JWT Token</Label>
                                        <CopyButton text={output} />
                                    </div>
                                    <Textarea value={output} readOnly className="font-mono text-sm break-all" rows={6} />
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>About JWT</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                        <p>
                            <strong>JSON Web Tokens (JWT)</strong> are a compact, URL-safe means of representing claims between
                            two parties.
                        </p>
                        <div>
                            <strong>Structure:</strong>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                                <li>
                                    <strong>Header:</strong> Contains algorithm and token type
                                </li>
                                <li>
                                    <strong>Payload:</strong> Contains claims and data
                                </li>
                                <li>
                                    <strong>Signature:</strong> Verifies token integrity
                                </li>
                            </ul>
                        </div>
                        <div>
                            <strong>Common Claims:</strong>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                                <li>
                                    <code>iss</code> - Issuer
                                </li>
                                <li>
                                    <code>sub</code> - Subject
                                </li>
                                <li>
                                    <code>aud</code> - Audience
                                </li>
                                <li>
                                    <code>exp</code> - Expiration time
                                </li>
                                <li>
                                    <code>iat</code> - Issued at
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
