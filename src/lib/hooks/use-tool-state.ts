import { useState } from "react";

export interface ToolState<T = Record<string, any>> {
	state: T;
	updateState: (updates: Partial<T>) => void;
	clearState: () => void;
	isProcessing: boolean;
	setIsProcessing: (value: boolean) => void;
}

export function useToolState<T extends Record<string, any>>(initialState: T): ToolState<T> {
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
