export interface Base64Results {
    encoded: string
    decoded: string
    fileBase64: string
}

export const getEmptyBase64Results = (): Base64Results => ({
    encoded: "",
    decoded: "",
    fileBase64: "",
})

export const encodeToBase64 = (text: string): string => {
    try {
        return btoa(decodeURI(encodeURIComponent(text)))
    } catch (error) {
        throw new Error("Error encoding text. Please check your input.")
    }
}

export const decodeFromBase64 = (base64: string): string => {
    try {
        return decodeURIComponent(escape(atob(base64)))
    } catch (error) {
        throw new Error("Error decoding Base64. Please check your input.")
    }
}

export const isValidBase64 = (str: string): boolean => {
    try {
        return btoa(atob(str)) === str
    } catch (err) {
        return false
    }
}

export const formatBase64 = (base64: string, lineLength = 64): string => {
    return base64.match(new RegExp(`.{1,${lineLength}}`, "g"))?.join("\n") || base64
}

export const getFileSize = (base64: string): string => {
    const bytes = (base64.length * 3) / 4
    if (bytes < 1024) return `${bytes.toFixed(0)} bytes`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const result = e.target?.result as string
            const base64 = result.split(",")[1] // Remove data URL prefix
            resolve(base64)
        }
        reader.onerror = () => reject(new Error("Failed to read file"))
        reader.readAsDataURL(file)
    })
}

export const getBase64Stats = (base64: string) => {
    return {
        length: base64.length,
        size: getFileSize(base64),
        isValid: isValidBase64(base64.replace(/\s/g, "")),
    }
}
