import { useToolState } from "@/lib/hooks/use-tool-state";
import { generateDiff, generateWordDiff, calculateSimilarity } from "@/lib/utils/text-diff";
import { useMemo } from "react";
import { DiffInput } from "../partials/text-diff/diff-input";
import { DiffStatsDisplay } from "../partials/text-diff/diff-stats";
import { DiffViewer } from "../partials/text-diff/diff-viewer";

interface DiffInputProps {
	originalText: string;
	modifiedText: string;
}

export default function TextDiffCheckerComponent() {
	const { state, updateState } = useToolState<DiffInputProps>({
		originalText: "",
		modifiedText: "",
	});

	const diffResult = useMemo(() => {
		if (!state.originalText.trim() && !state.modifiedText.trim()) {
			return null;
		}
		try {
			return generateDiff(state.originalText, state.modifiedText);
		} catch (error) {
			console.error("[v0] Error generating diff:", error);
			return null;
		}
	}, [state.originalText, state.modifiedText]);

	const wordDiff = useMemo(() => {
		if (!state.originalText.trim() && !state.modifiedText.trim()) {
			return "";
		}
		try {
			return generateWordDiff(state.originalText, state.modifiedText);
		} catch (error) {
			console.error("[v0] Error generating word diff:", error);
			return "";
		}
	}, [state.originalText, state.modifiedText]);

	const similarity = useMemo(() => {
		try {
			return calculateSimilarity(state.originalText, state.modifiedText);
		} catch (error) {
			console.error("[v0] Error calculating similarity:", error);
			return 0;
		}
	}, [state.originalText, state.modifiedText]);

	return (
		<div className="space-y-6">
			<DiffInput
				originalText={state.originalText}
				modifiedText={state.modifiedText}
				onOriginalChange={(text) => updateState({ originalText: text })}
				onModifiedChange={(text) => updateState({ modifiedText: text })}
			/>

			{diffResult && (
				<>
					<DiffStatsDisplay stats={diffResult.stats} similarity={similarity} />
					<DiffViewer diffLines={diffResult.lines} wordDiff={wordDiff} />
				</>
			)}
		</div>
	);
}
