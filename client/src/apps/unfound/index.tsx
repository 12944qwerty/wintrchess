import React from "react";
import ReactDOM from "react-dom/client";

import PageWrapper from "@/components/layout/PageWrapper";
import Unfound from "./pages/Unfound";

import "@/i18n";
import "@/index.css";

const root = ReactDOM.createRoot(
    document.querySelector(".root")!
);

function App() {
    return <PageWrapper>
        <Unfound/>
    </PageWrapper>;
}

root.render(<App/>);