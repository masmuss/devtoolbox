export interface HashType {
    value: string
    label: string
    description: string
    secure: boolean
}

export const hashTypes: HashType[] = [
    { value: "sha1", label: "SHA-1", description: "160-bit hash", secure: false },
    { value: "sha256", label: "SHA-256", description: "256-bit hash (recommended)", secure: true },
    { value: "sha384", label: "SHA-384", description: "384-bit hash", secure: true },
    { value: "sha512", label: "SHA-512", description: "512-bit hash", secure: true },
]

export const generateHash = async (input: string, hashType: string): Promise<string> => {
    if (!input.trim()) {
        throw new Error("Please enter some text to hash")
    }

    try {
        const encoder = new TextEncoder()
        const data = encoder.encode(input)

        let hashBuffer: ArrayBuffer

        switch (hashType) {
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
            default:
                hashBuffer = await crypto.subtle.digest("SHA-256", data)
        }

        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
        return hashHex
    } catch (error) {
        throw new Error("Error generating hash")
    }
}

export const getHashInfo = (hashType: string) => {
    const type = hashTypes.find((t) => t.value === hashType)
    return type || hashTypes[2]
}
