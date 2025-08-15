export interface CaseResults {
    lowercase: string
    uppercase: string
    titleCase: string
    sentenceCase: string
    camelCase: string
    pascalCase: string
    snakeCase: string
    kebabCase: string
    constantCase: string
    dotCase: string
    pathCase: string
    alternatingCase: string
}

export const getEmptyResults = (): CaseResults => ({
    lowercase: "",
    uppercase: "",
    titleCase: "",
    sentenceCase: "",
    camelCase: "",
    pascalCase: "",
    snakeCase: "",
    kebabCase: "",
    constantCase: "",
    dotCase: "",
    pathCase: "",
    alternatingCase: "",
})

export const toWords = (str: string): string[] => {
    return str
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_-]/g, " ")
        .replace(/[^\w\s]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 0)
        .map((word) => word.toLowerCase())
}

export const convertTextToAllCases = (text: string): CaseResults => {
    if (!text.trim()) {
        return getEmptyResults()
    }

    const words = toWords(text)

    return {
        lowercase: text.toLowerCase(),
        uppercase: text.toUpperCase(),
        titleCase: text
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        sentenceCase: text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
        camelCase: words.map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))).join(""),
        pascalCase: words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(""),
        snakeCase: words.join("_"),
        kebabCase: words.join("-"),
        constantCase: words.map((word) => word.toUpperCase()).join("_"),
        dotCase: words.join("."),
        pathCase: words.join("/"),
        alternatingCase: text
            .split("")
            .map((char, index) => (index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
            .join(""),
    }
}

export const getCaseDescription = (caseType: keyof CaseResults): string => {
    const descriptions: Record<keyof CaseResults, string> = {
        lowercase: "All characters in lowercase",
        uppercase: "All characters in uppercase",
        titleCase: "First letter of each word capitalized",
        sentenceCase: "First letter capitalized, rest lowercase",
        camelCase: "First word lowercase, subsequent words capitalized",
        pascalCase: "All words capitalized, no spaces",
        snakeCase: "Words separated by underscores",
        kebabCase: "Words separated by hyphens",
        constantCase: "All uppercase with underscores",
        dotCase: "Words separated by dots",
        pathCase: "Words separated by forward slashes",
        alternatingCase: "Alternating upper and lowercase characters",
    }
    return descriptions[caseType]
}
