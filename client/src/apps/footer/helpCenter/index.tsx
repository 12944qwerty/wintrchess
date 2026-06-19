import React from "react";
import ReactDOM from "react-dom/client";

import PageWrapper from "@/components/layout/PageWrapper";
import HelpCenter from "./pages/HelpCenter";

import "@/i18n";
import "@/index.css";

const root = ReactDOM.createRoot(
    document.querySelector(".root")!
);

function App() {
    return <PageWrapper>
        <HelpCenter/>
    </PageWrapper>;
}

root.render(<App/>);