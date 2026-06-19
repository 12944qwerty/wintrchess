import React from "react";
import { useTranslation } from "react-i18next";

import SidebarTab from "../SidebarTab";
import Separator from "@/components/common/Separator";
import Typography from "@/components/Typography";

import SidebarProps from "./SidebarProps";
import * as styles from "./Sidebar.module.css";

import iconInterfaceClose from "@assets/img/interface/close.svg";
import iconIconsAnalysis from "@assets/img/icons/analysis.png";
import iconIconsSettings from "@assets/img/icons/settings.png";

function Sidebar({ style, onClose }: SidebarProps) {
    const { t } = useTranslation("common");

    return <div
        className={styles.sidebar}
        style={style}
        onClick={event => event.stopPropagation()}
    >
        <div className={styles.titleSection}>
            <img
                className={styles.closeButton}
                src={iconInterfaceClose}
                onClick={onClose}
            />

            <Typography className={styles.title} includeIcon/>
        </div>

        <div style={{ padding: "0 10px" }}>
            <Separator style={{ margin: 0 }} />
        </div>

        <div className={styles.tabs}>
            <div className={styles.tabSection}>
                <SidebarTab
                    url="/analysis"
                    icon={iconIconsAnalysis}
                    style={{ width: "100%" }}
                >
                    {t("sidebar.analysis")}
                </SidebarTab>
            </div>

            <div className={styles.tabSection}>
                <SidebarTab
                    url="/settings"
                    icon={iconIconsSettings}
                    style={{ width: "100%" }}
                >
                    {t("settings")}
                </SidebarTab>
            </div>
        </div>
    </div>;
}

export default Sidebar;