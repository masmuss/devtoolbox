import { useState } from "react";

export interface ToolState<T = string> {
	input: T;
	output: T;
	isProcessing: boolean;
	setInput: (value: T) => void;
	setOutput: (value: T) => void;
	setIsProcessing: (value: boolean) => void;
	clearAll: () => void;
}

export function useToolState<T = string>(initialValue: T = "" as T): ToolState<T> {
	const [input, setInput] = useState<T>(initialValue);
	const [output, setOutput] = useState<T>(initialValue);
	const [isProcessing, setIsProcessing] = useState<boolean>(false);

	const clearAll = () => {
		setInput(initialValue);
		setOutput(initialValue);
		setIsProcessing(false);
	};

	return {
		input,
		output,
		isProcessing,
		setInput,
		setOutput,
		setIsProcessing,
		clearAll,
	};
}

export interface FlexibleToolState<T = Record<string, any>> {
	state: T;
	updateState: (updates: Partial<T>) => void;
	clearState: () => void;
	isProcessing: boolean;
	setIsProcessing: (value: boolean) => void;
}

export function useFlexibleToolState<T extends Record<string, any>>(
	initialState: T,
): FlexibleToolState<T> {
	const [state, setState] = useState<T>(initialState);
	const [isProcessing, setIsProcessing] = useState<boolean>(false);

	const updateState = (updates: Partial<T>) => {
		setState((prev) => ({ ...prev, ...updates }));
	};

	const clearState = () => {
		setState(initialState);
		setIsProcessing(false);
	};

	return {
		state,
		updateState,
		clearState,
		isProcessing,
		setIsProcessing,
	};
}
