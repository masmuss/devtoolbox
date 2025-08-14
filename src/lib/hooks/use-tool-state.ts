import { useState } from "react";

export interface ToolState<T = string> {
	input: T;
	output: T;
	setInput: (value: T) => void;
	setOutput: (value: T) => void;
	clearAll: () => void;
}

export function useToolState<T = string>(initialValue: T): ToolState<T> {
	const [input, setInput] = useState<T>(initialValue);
	const [output, setOutput] = useState<T>(initialValue);

	const clearAll = () => {
		setInput(initialValue);
		setOutput(initialValue);
	};

	return {
		input,
		output,
		setInput,
		setOutput,
		clearAll,
	};
}
