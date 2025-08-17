interface DateDifferenceState {
	years: number;
	months: number;
	days: number;
}

export interface DateCalculatorState {
	startDate: string;
	endDate: string;
	difference: null | DateDifferenceState;
	baseDate: string;
	amount: string;
	unit: string;
	result: null | Date;
}
