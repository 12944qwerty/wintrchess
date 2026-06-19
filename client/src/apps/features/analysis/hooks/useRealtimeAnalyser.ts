import { StatusCodes } from "http-status-codes";

import useSettingsStore from "@/stores/SettingsStore";
import useAnalysisBoardStore from "@analysis/stores/AnalysisBoardStore";
import useAnalysisProgressStore from "@analysis/stores/AnalysisProgressStore";
import { analyseNode } from "@analysis/lib/reporter";

function useRealtimeAnalyser() {
    const settings = useSettingsStore(state => state.settings.analysis);

    const {
        currentStateTreeNode,
        dispatchCurrentNodeUpdate
    } = useAnalysisBoardStore();

    const setRealtimeClassifyError = useAnalysisProgressStore(
        state => state.setRealtimeClassifyError
    );

    function cancelAnalyse(errorString?: string) {
        setRealtimeClassifyError(errorString);
    }

    async function considerRealtimeAnalyse() {
        if (!currentStateTreeNode.parent) return;

        // If there is not enough data for a centipawn comparison
        const parentState = currentStateTreeNode.parent.state;

        if (parentState.engineLines.length == 0) {
            if (!currentStateTreeNode.state.classification) return;

            return cancelAnalyse("classifiedMoveCard.insufficientLines");
        }

        const analyseNodeResult = await analyseNode(currentStateTreeNode, {
            includeBrilliant: settings.classifications.included.brilliant,
            includeTheory: settings.classifications.included.theory
        });

        if (analyseNodeResult.status != StatusCodes.OK || !analyseNodeResult.node)
            return cancelAnalyse("classifiedMoveCard.unknownError");

        // Apply classification and deactivate classifier
        const currentState = currentStateTreeNode.state;
        const analysedState = analyseNodeResult.node.state;

        currentState.classification = analysedState.classification;
        currentState.accuracy = analysedState.accuracy;
        currentState.opening = analysedState.opening;

        if (!analysedState.classification)
            return cancelAnalyse("classifiedMoveCard.unknownError");

        cancelAnalyse();
        dispatchCurrentNodeUpdate();
    }

    return considerRealtimeAnalyse;
}

export default useRealtimeAnalyser;