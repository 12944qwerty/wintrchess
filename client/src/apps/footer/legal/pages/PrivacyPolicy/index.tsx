import React from "react";

import Separator from "@/components/common/Separator";

import * as styles from "../../index.module.css";

import iconLogo from "@assets/img/logo.svg";

function PrivacyPolicy() {
    return <div className={styles.wrapper}>
        <div className={styles.content}>
            <h1 className={styles.title}>
                <img
                    src={iconLogo}
                    height={45}
                    draggable={false}
                />

                Privacy Policy
            </h1>

            <Separator/>

            <h2 style={{ margin: 0 }}>
                1. Glossary
            </h2>

            <span>
                1.1 "The Service", "The Website", "We", "Our", "Us" - the wintrchess.com website
                and any service that we provide that you use therein.
                Also the entity that collects information from you.
            </span>

            <span>
                1.2 "The User", "You", "Your" - The entity from whom we are collecting and or processing information.
            </span>

            <h2 style={{ margin: 0 }}>
                Data we collect
            </h2>

            <h3 style={{ margin: 0 }}>
                2. General
            </h3>

            <span>
                2.1 IP Addresses are collected to establish a connection between
                the User and the Website. In order to uphold security practices, we may
                also collect the following information from you when you visit the Website:

                <ul>
                    <li>Information about your web browser</li>
                    <li>Information about your device</li>
                    <li>Website usage data</li>
                </ul>

                2.2 For more information on what data we collect in this regard,
                you can refer to the{" "}

                <a href="https://www.cloudflare.com/en-gb/privacypolicy/">
                    Cloudflare, Inc. Privacy Policy
                </a>

                , since we use Cloudflare as a security service. Cloudflare is based in the
                United States, so by using the Website you agree to have your data processed
                in this country.
            </span>

            <span>
                2.3 We use local storage to save information across different sessions, including:

                <ul>
                    <li>The settings you chose on the settings page.</li>
                    <li>The preferred language that you selected.</li>
                </ul>

                This information is used to improve your experience on the Website, and stays
                on your device.
            </span>

            <h3 style={{ margin: 0 }}>
                3. Game Analysis
            </h3>

            <span>
                3.1 We do not use cookies or accounts to access Chess game analysis and move
                classifications; the Service is available anonymously. We do not store the
                PGN (Portable Game Notation) file you submit, or the resulting analysis, on
                our servers - it is processed in memory to generate your game report and
                discarded immediately once the response is returned to you.
            </span>

            <span>
                3.2 When you analyse a game on the Website, we momentarily process any
                information that you have explicitly provided to us, in order to generate
                your analysis. Depending on the PGN file provided, this may include:

                <ul>
                    <li>Player names and ratings</li>
                    <li>Tournament and event information</li>
                    <li>Time control, variant, results and other game metadata</li>
                </ul>

                3.3 None of this information is retained once your analysis request has been
                processed.
            </span>

            <span>
                3.4 When you search for games on your Chess.com or Lichess account, the username
                that you provided will be collected by those respective services. Chess.com
                and Lichess are based in the United States and France respectively, so by
                searching for games on your account, you agree to having your data processed
                in these countries.
            </span>

            <a href="https://www.chess.com/legal/privacy">
                Chess.com Privacy Policy
            </a>

            <a href="https://lichess.org/privacy">
                Lichess.org Privacy Policy
            </a>

            <span>
                3.5 We use local storage to save particular analysis related information across
                different sessions. This includes:

                <ul>
                    <li>
                        The last game source you selected with the game selector.
                        This may be PGN, Chess.com etc.
                    </li>

                    <li>
                        The last inputs you gave for each game source in the game selector.
                        For example, this may be your username in the "Select game from Chess.com"
                        field, or the last PGN you provided to the "Select game from PGN" field.
                    </li>
                </ul>
            </span>

            <h2 style={{ margin: 0 }}>
                4. Children's Privacy
            </h2>

            <span>
                We do not knowingly collect personal information from persons under the
                age of 13. If you think that we have done so, please contact us.
            </span>

            <h2 style={{ margin: 0 }}>
                5. Your Data Rights
            </h2>

            <span>
                In accordance with the GDPR, you have the right to:
            </span>

            <ul>
                <li>
                    Request for a copy of the personal information we hold about you.
                </li>

                <li>
                    Request for the personal information we hold about you to be erased.
                </li>

                <li>
                    Request for the personal information we hold about you to be rectified,
                    should you find it inaccurate, incomplete or obsolete.
                </li>
            </ul>

            <h2 style={{ margin: 0 }}>
                6. Revisions
            </h2>

            <span>
                Changes to this privacy policy will be announced on the website page.
            </span>

            <span>
                Last revision to this privacy policy: 18th June 2026
            </span>

            <h2 style={{ margin: 0 }}>
                7. Contact Us
            </h2>

            <span>
                If you have questions regarding this policy, or would like to exercise
                your data rights, you can contact us at:
            </span>

            <b>
                {process.env.EMAIL_ACCOUNT}
            </b>
        </div>
    </div>;
}

export default PrivacyPolicy;
