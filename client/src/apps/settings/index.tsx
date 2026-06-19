import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PageWrapper from "@/components/layout/PageWrapper";
import Settings from "./pages/Settings";

const BoardAndPiecesSection = lazy(
    () => import("./components/categories/BoardAndPieces")
);

const BugReportingSection = lazy(
    () => import("./components/categories/BugReporting")
);

import "@/i18n";
import "@/index.css";

import * as styles from "./index.module.css";

const root = ReactDOM.createRoot(
    document.querySelector(".root")!
);

function App() {
    return <PageWrapper contentClassName={styles.content}>
        <BrowserRouter>
            <Routes>
                <Route path="/settings" element={<Settings/>}>
                    <Route index element={<Navigate to="/settings/theme"/>} />

                    <Route path="/settings/theme" element={<BoardAndPiecesSection/>} />
                    <Route path="/settings/bugs" element={<BugReportingSection/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </PageWrapper>;
}

root.render(<App/>);