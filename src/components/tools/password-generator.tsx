import { useToolState } from "@/lib/hooks/use-tool-state.ts";
import {
	generateSecurePassword,
	type PasswordGeneratorState,
} from "@/lib/utils/password-generator.ts";
import { PasswordOutput } from "@/components/partials/password/password-output.tsx";
import { PasswordOptionsComponent } from "@/components/partials/password/password-options.tsx";

export default function PasswordGeneratorComponent() {
	const { state, updateState } = useToolState<PasswordGeneratorState>({
		password: "",
		length: 12,
		options: {
			includeUppercase: true,
			includeLowercase: true,
			includeNumbers: true,
			includeSymbols: true,
			excludeSimilar: false,
		},
	});

	const handleGenerate = () => {
		const newPassword = generateSecurePassword(state.length, state.options);
		updateState({ password: newPassword });
	};

	const handleLengthChange = (length: number) => {
		updateState({ length });
	};

	const handleOptionChange = (key: keyof typeof state.options, value: boolean) => {
		updateState({
			options: {
				...state.options,
				[key]: value,
			},
		});
	};

	return (
		<div className="grid gap-8 md:grid-cols-2">
			<PasswordOutput password={state.password} onGenerate={handleGenerate} />

			<PasswordOptionsComponent
				length={state.length}
				options={state.options}
				onLengthChange={handleLengthChange}
				onOptionChange={handleOptionChange}
			/>
		</div>
	);
}
