import { Check, Copy, RefreshCw } from "lucide-preact";
import type { JSX } from "preact";
import { useState } from "preact/hooks";

export default function PasswordGenerator() {
	type OptionKey = "uppercase" | "lowercase" | "numbers" | "symbols";
	type Options = Record<OptionKey, boolean>;
	type Chars = Record<OptionKey, string>;

	const [password, setPassword] = useState<string>("");
	const [length, setLength] = useState<number>(16);
	const [options, setOptions] = useState<Options>({
		uppercase: true,
		lowercase: true,
		numbers: true,
		symbols: true,
	});
	const [copied, setCopied] = useState<boolean>(false);

	const generatePassword = () => {
		const chars: Chars = {
			uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
			lowercase: "abcdefghijklmnopqrstuvwxyz",
			numbers: "0123456789",
			symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
		};

		let availableChars = "";
		(Object.keys(options) as OptionKey[]).forEach((key: OptionKey): void => {
			if (options[key]) {
				availableChars += chars[key];
			}
		});

		if (!availableChars) {
			setPassword("Please select at least one option");
			return;
		}

		let result = "";
		for (let i = 0; i < length; i++) {
			result += availableChars.charAt(Math.floor(Math.random() * availableChars.length));
		}

		setPassword(result);
	};

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(password);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	const handleOptionChange = (option: OptionKey) => {
		setOptions((prev) => ({
			...prev,
			[option]: !prev[option],
		}));
	};

	return (
		<div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-sm">
			<div className="space-y-6">
				<div>
					<label htmlFor="password-length" className="mb-2 block text-sm font-medium text-gray-700">
						Password Length: {length}
					</label>
					<input
						id="password-length"
						type="range"
						min="4"
						max="50"
						value={length}
						onChange={(e: JSX.TargetedEvent<HTMLInputElement, Event>) =>
							setLength(Number(e.currentTarget.value))
						}
						className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
					/>
					<div className="mt-1 flex justify-between text-xs text-gray-500">
						<span>4</span>
						<span>50</span>
					</div>
				</div>

				<div>
					<span className="mb-3 block text-sm font-medium text-gray-700">Character Types</span>
					<div className="grid grid-cols-2 gap-3">
						{Object.entries(options).map(([key, value]) => (
							<label key={key} className="flex items-center">
								<input
									type="checkbox"
									checked={value}
									onChange={() => handleOptionChange(key as OptionKey)}
									className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<span className="ml-2 text-sm text-gray-700 capitalize">
									{key === "uppercase"
										? "Uppercase (A-Z)"
										: key === "lowercase"
											? "Lowercase (a-z)"
											: key === "numbers"
												? "Numbers (0-9)"
												: "Symbols (!@#$...)"}
								</span>
							</label>
						))}
					</div>
				</div>

				<button
					type={"button"}
					onClick={generatePassword}
					className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					<RefreshCw className="h-4 w-4" />
					<span>Generate Password</span>
				</button>

				{password && (
					<div>
						<label
							htmlFor="generated-password"
							className="mb-2 block text-sm font-medium text-gray-700"
						>
							Generated Password
						</label>
						<div className="relative">
							<input
								id="generated-password"
								type="text"
								value={password}
								readOnly
								className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 font-mono text-sm"
							/>
							<button
								type={"button"}
								onClick={copyToClipboard}
								className="absolute top-1/2 right-2 -translate-y-1/2 transform p-1 text-gray-500 hover:text-gray-700"
								title="Copy to clipboard"
							>
								{copied ? (
									<Check className="h-4 w-4 text-green-600" />
								) : (
									<Copy className="h-4 w-4" />
								)}
							</button>
						</div>
						{copied && <p className="mt-1 text-sm text-green-600">Copied to clipboard!</p>}
					</div>
				)}

				{password && password !== "Please select at least one option" && (
					<div>
						<span className="mb-2 block text-sm font-medium text-gray-700">Password Strength</span>
						<div className="flex space-x-1">
							{[1, 2, 3, 4].map((level) => {
								const strength = Math.min(
									4,
									Math.floor(length / 8) + Object.values(options).filter(Boolean).length - 1,
								);
								return (
									<div
										key={level}
										className={`h-2 flex-1 rounded ${
											level <= strength
												? level <= 2
													? "bg-red-400"
													: level <= 3
														? "bg-yellow-400"
														: "bg-green-400"
												: "bg-gray-200"
										}`}
									/>
								);
							})}
						</div>
						<p className="mt-1 text-xs text-gray-500">
							{length < 8
								? "Weak"
								: length < 12
									? "Medium"
									: length < 16
										? "Strong"
										: "Very Strong"}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
