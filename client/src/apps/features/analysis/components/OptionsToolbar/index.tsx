import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";
import { useShallow } from "zustand/react/shallow";
import { cloneDeep, omit } from "lodash-es";

import { defaultAnalysedGame } from "shared/constants/utils";
import AnalysisStatus from "@analysis/constants/AnalysisStatus";
import useAnalysisProgressStore from "../../stores/AnalysisProgressStore";
import { useAnalysisGameStore } from "@analysis/stores/AnalysisGameStore";
import useAnalysisBoardStore from "@analysis/stores/AnalysisBoardStore";
import useRealtimeEngineStore from "@analysis/stores/RealtimeEngineStore";
import Button from "@/components/common/Button";
import SettingsDialog from "../SettingsDialog";
import ShareDialog from "../ShareDialog";

import * as styles from "./OptionsToolbar.module.css";

import iconBack from "@assets/img/interface/back.svg";
import iconFlip from "@assets/img/interface/flip.svg";
import iconSettings from "@assets/img/interface/settings.svg";
import iconShare from "@assets/img/interface/share.svg";

function OptionsToolbar() {
    const { t } = useTranslation(["analysis", "common"]);

    const [ searchParams, setSearchParams ] = useSearchParams();

    const {
        evaluationController,
        setAnalysisStatus,
        setAnalysisError
    } = useAnalysisProgressStore(
        useShallow(state => ({
            evaluationController: state.evaluationController,
            setAnalysisStatus: state.setAnalysisStatus,
            setAnalysisError: state.setAnalysisError
        }))
    );

    const {
        analysisGame,
        setAnalysisGame,
        gameAnalysisOpen,
        setGameAnalysisOpen
    } = useAnalysisGameStore();

    const {
        currentStateTreeNode,
        setCurrentStateTreeNode,
        boardFlipped,
        setBoardFlipped
    } = useAnalysisBoardStore();

    const setDisplayedEngineLines = useRealtimeEngineStore(
        state => state.setDisplayedEngineLines
    );

    const [ settingsOpen, setSettingsOpen ] = useState(false);
    const [ shareOpen, setShareOpen ] = useState(false);

    function back() {
        setSearchParams(omit(
            Object.fromEntries(searchParams.entries()),
            ["game"]
        ));

        // Abort any ongoing evaluations or analyses
        evaluationController?.abort();

        setAnalysisStatus(AnalysisStatus.INACTIVE);
        setAnalysisError();

        // Reset analysis game & evaluation bar
        const freshAnalysisGame = cloneDeep(defaultAnalysedGame);

        setGameAnalysisOpen(false);
        setAnalysisGame(freshAnalysisGame);
        setCurrentStateTreeNode(freshAnalysisGame.stateTree);
        setDisplayedEngineLines([]);
    }

    return <>
        <div className={styles.wrapper}>
            {gameAnalysisOpen && <Button
                icon={iconBack}
                iconSize={"40px"}
                className={styles.backButton}
                tooltipId={"options-toolbar-back"}
                onClick={back}
            />}

            <Tooltip
                id="options-toolbar-back"
                content={t("back", { ns: "common" })}
                delayShow={500}
            />

            <Button
                className={styles.optionButton}
                icon={iconFlip}
                iconSize={"40px"}
                tooltipId={"options-toolbar-flip"}
                onClick={() => setBoardFlipped(!boardFlipped)}
            />

            <Tooltip
                id="options-toolbar-flip"
                content={t("optionsToolbar.flipBoard")}
                delayShow={500}
            />

            <Button
                className={styles.optionButton}
                icon={iconSettings}
                iconSize={"35px"}
                tooltipId={"options-toolbar-settings"}
                onClick={() => setSettingsOpen(true)}
            />

            <Tooltip
                id="options-toolbar-settings"
                content={t("settings", { ns: "common" })}
                delayShow={500}
            />

            <Button
                className={styles.optionButton}
                icon={iconShare}
                iconSize={"35px"}
                tooltipId={"options-toolbar-share"}
                onClick={() => setShareOpen(true)}
            />

            <Tooltip
                id="options-toolbar-share"
                content={t("optionsToolbar.share")}
                delayShow={500}
            />
        </div>

        {settingsOpen && <SettingsDialog
            onClose={() => setSettingsOpen(false)}
        />}

        {shareOpen && <ShareDialog
            game={analysisGame}
            currentNode={currentStateTreeNode}
            onClose={() => setShareOpen(false)}
        />}
    </>;
}

export default OptionsToolbar;
