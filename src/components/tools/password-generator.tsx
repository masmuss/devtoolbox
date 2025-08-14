import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CopyButton } from "../copy-button";
import { useClipboard } from "@/lib/hooks/use-clipboard";

export default function PasswordGeneratorComponent() {
	const [options, setOptions] = useState({
		includeUppercase: true,
		includeLowercase: true,
		includeNumbers: true,
		includeSymbols: true,
		excludeSimilar: false,
	});
	const [password, setPassword] = useState<string>("");
	const [length, setLength] = useState<number[]>([12]);
	const { copied } = useClipboard();

	const handleOptionChange = (key: keyof typeof options) => (checked: boolean) => {
		setOptions((prev) => ({ ...prev, [key]: checked }));
	};

	const generatePassword = () => {
		let charset = "";

		if (options.includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		if (options.includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
		if (options.includeNumbers) charset += "0123456789";
		if (options.includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

		if (options.excludeSimilar) {
			charset = charset.replace(/[il1Lo0O]/g, "");
		}

		if (!charset) {
			setPassword("Please select at least one character type");
			return;
		}

		let result = "";
		for (let i = 0; i < length[0]; i++) {
			result += charset.charAt(Math.floor(Math.random() * charset.length));
		}

		setPassword(result);
	};

	return (
		<div className="grid gap-8 md:grid-cols-2">
			<Card className="border-neutral-200 dark:border-neutral-800">
				<CardHeader>
					<CardTitle className="text-black dark:text-white">Generated Password</CardTitle>
					<CardDescription className="text-neutral-600 dark:text-neutral-400">
						Your secure password will appear here
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="relative">
						<Input
							value={password}
							readOnly
							placeholder="Click 'Generate Password' to create a password"
							className="border-neutral-200 bg-neutral-50 pr-20 font-mono text-sm dark:border-neutral-800 dark:bg-neutral-900"
						/>
						<div className="absolute top-1/2 right-2 flex -translate-y-1/2 space-x-1">
							<CopyButton
								text={password}
								disabled={!password || password === "Please select at least one character type"}
								className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
							/>
							<Button
								size="sm"
								variant="ghost"
								onClick={generatePassword}
								className="h-8 w-8 p-0 hover:bg-neutral-100 dark:hover:bg-neutral-800"
							>
								<RefreshCw className="h-4 w-4" />
							</Button>
						</div>
					</div>
					<Button
						onClick={generatePassword}
						className="w-full bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
					>
						Generate Password
					</Button>
				</CardContent>
			</Card>

			{/* Options */}
			<Card className="border-neutral-200 dark:border-neutral-800">
				<CardHeader>
					<CardTitle className="text-black dark:text-white">Options</CardTitle>
					<CardDescription className="text-neutral-600 dark:text-neutral-400">
						Customize your password requirements
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Length */}
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<Label className="text-black dark:text-white">Length</Label>
							<span className="text-sm text-neutral-600 dark:text-neutral-400">
								{length[0]} characters
							</span>
						</div>
						<Slider
							value={length}
							onValueChange={setLength}
							max={128}
							min={4}
							step={1}
							className="w-full"
						/>
					</div>

					{/* Character Types */}
					<div className="space-y-4">
						<Label className="text-black dark:text-white">Include Characters</Label>

						<div className="flex items-center space-x-2">
							<Checkbox
								id="uppercase"
								checked={options.includeUppercase}
								onCheckedChange={(checked) => handleOptionChange("includeUppercase")(!!checked)}
							/>
							<Label htmlFor="uppercase" className="text-neutral-700 dark:text-neutral-300">
								Uppercase (A-Z)
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<Checkbox
								id="lowercase"
								checked={options.includeLowercase}
								onCheckedChange={(checked) => handleOptionChange("includeLowercase")(!!checked)}
							/>
							<Label htmlFor="lowercase" className="text-neutral-700 dark:text-neutral-300">
								Lowercase (a-z)
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<Checkbox
								id="numbers"
								checked={options.includeNumbers}
								onCheckedChange={(checked) => handleOptionChange("includeNumbers")(!!checked)}
							/>
							<Label htmlFor="numbers" className="text-neutral-700 dark:text-neutral-300">
								Numbers (0-9)
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<Checkbox
								id="symbols"
								checked={options.includeSymbols}
								onCheckedChange={(checked) => handleOptionChange("includeSymbols")(!!checked)}
							/>
							<Label htmlFor="symbols" className="text-neutral-700 dark:text-neutral-300">
								Symbols (!@#$%^&*)
							</Label>
						</div>

						<div className="flex items-center space-x-2">
							<Checkbox
								id="exclude-similar"
								checked={options.excludeSimilar}
								onCheckedChange={(checked) => handleOptionChange("excludeSimilar")(!!checked)}
							/>
							<Label htmlFor="exclude-similar" className="text-neutral-700 dark:text-neutral-300">
								Exclude similar characters (i, l, 1, L, o, 0, O)
							</Label>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
