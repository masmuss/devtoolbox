import { useState } from "react"

export interface ToolState<T = string> {
	input: T
	output: T
	isProcessing: boolean
	setInput: (value: T) => void
	setOutput: (value: T) => void
	setIsProcessing: (value: boolean) => void
	clearAll: () => void
}

export function useToolState<T = string>(initialValue: T = "" as T): ToolState<T> {
	const [input, setInput] = useState<T>(initialValue)
	const [output, setOutput] = useState<T>(initialValue)
	const [isProcessing, setIsProcessing] = useState(false)

	const clearAll = () => {
		setInput(initialValue)
		setOutput(initialValue)
		setIsProcessing(false)
	}

	return {
		input,
		output,
		isProcessing,
		setInput,
		setOutput,
		setIsProcessing,
		clearAll,
	}
}
