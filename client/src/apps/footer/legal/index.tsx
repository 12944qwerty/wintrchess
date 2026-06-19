import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageWrapper from "@/components/layout/PageWrapper";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

import "@/i18n";
import "@/index.css";

const root = ReactDOM.createRoot(
    document.querySelector(".root")!
);

function App() {
    return <BrowserRouter>
        <PageWrapper>
            <Routes>
                <Route path="/privacy" element={<PrivacyPolicy/>} />
                <Route path="/terms" element={<Terms/>} />
            </Routes>
        </PageWrapper>
    </BrowserRouter>;
}

root.render(<App/>);