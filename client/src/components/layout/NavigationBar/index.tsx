import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";

import Typography from "@/components/Typography";
import Button from "@/components/common/Button";
import BlurBackground from "@/components/layout/BlurBackground";
import Sidebar from "@/components/layout/sidebar/Sidebar";

import HoverDropdown from "./HoverDropdown";
import * as styles from "./NavigationBar.module.css";

import iconInterfaceMenu from "@assets/img/interface/menu.svg";
import iconIconsAnalysis from "@assets/img/icons/analysis.png";
import iconKofi from "@assets/img/kofi.svg";
import iconIconsSettings from "@assets/img/icons/settings.png";

function NavigationBar() {
    const { t } = useTranslation("common");

    const [ sidebarOpen, setSidebarOpen ] = useState(false);

    return <div className={styles.wrapper}>
        <div className={styles.section}>
            <div className={styles.section}>
                <img
                    className={styles.menuButton}
                    src={iconInterfaceMenu}
                    height={35}
                    onClick={() => setSidebarOpen(true)}
                />

                <Typography
                    textClassName={styles.typographyText}
                    includeIcon
                />
            </div>

            <div className={styles.tabs}>
                <HoverDropdown
                    icon={iconIconsAnalysis}
                    url="/analysis"
                >
                    {t("sidebar.analysis")}
                </HoverDropdown>
            </div>
        </div>

        <div className={styles.section}>
            <a href="https://ko-fi.com/wintrcat" target="_blank">
                <Button
                    className={styles.support}
                    icon={iconKofi}
                    tooltipId="navigation-bar-support"
                />
            </a>

            <Tooltip
                id="navigation-bar-support"
                content={t("navigationBar.tooltips.support")}
                delayShow={500}
            />

            <a href="/settings">
                <Button
                    className={styles.settings}
                    icon={iconIconsSettings}
                    iconSize="28px"
                />
            </a>
        </div>

        {sidebarOpen && <BlurBackground
            style={{ zIndex: 1000 }}
            onClick={() => setSidebarOpen(false)}
        />}

        <Sidebar
            style={{
                zIndex: 1001,
                transition: "left 0.3s ease",
                left: sidebarOpen ? "0" : "-320px"
            }}
            onClose={() => setSidebarOpen(false)}
        />
    </div>;
}

export default NavigationBar;
