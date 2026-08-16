/* =========================================
   GLOBAL SETTINGS
========================================= */

const SETTINGS_KEY =
    "virtual_genie_crm_settings";


/* =========================================
   DEFAULT SETTINGS
========================================= */

const DEFAULT_SETTINGS = {

    currency:
        "INR",

    defaultTaskPriority:
        "Medium",

    defaultDealStage:
        "New Lead",

    defaultDealStatus:
        "Open",

    reminderDays:
        7,

    notificationsEnabled:
        true

};


/* =========================================
   GET SETTINGS
========================================= */

function getSettings() {

    const raw =
        localStorage.getItem(
            SETTINGS_KEY
        );


    if (!raw) {

        return {
            ...DEFAULT_SETTINGS
        };

    }


    try {

        const parsed =
            JSON.parse(raw);


        return {
            ...DEFAULT_SETTINGS,
            ...(parsed || {})
        };

    } catch (error) {

        console.error(
            "Failed to read CRM settings:",
            error
        );


        return {
            ...DEFAULT_SETTINGS
        };

    }

}


/* =========================================
   SAVE SETTINGS
========================================= */

function saveSettings(
    settings
) {

    try {

        localStorage.setItem(
            SETTINGS_KEY,
            JSON.stringify(settings)
        );

        return true;

    } catch (error) {

        console.error(
            "Failed to save CRM settings:",
            error
        );

        return false;

    }

}


/* =========================================
   LOAD SETTINGS PAGE
========================================= */

function loadSettings() {

    const settings =
        getSettings();


    const app =
        document.getElementById(
            "app"
        );


    app.innerHTML = `

    <div class="dashboard">


        <!-- HEADER -->

        <div class="header">

            <h1>
                Global Settings
            </h1>

            <p class="subtitle">
                Configure your CRM preferences
            </p>

        </div>


        <!-- CRM PREFERENCES -->

        <div class="card">

            <h2>
                CRM Preferences
            </h2>

            <p
                style="
                    opacity:0.7;
                    margin-top:5px;
                ">

                Default settings used when
                creating new CRM records.

            </p>


            <br>


            <label>
                Currency
            </label>


            <select
                class="search"
                id="settingCurrency">

                <option
                    value="INR"
                    ${
                        settings.currency === "INR"
                            ? "selected"
                            : ""
                    }>

                    ₹ INR

                </option>


                <option
                    value="USD"
                    ${
                        settings.currency === "USD"
                            ? "selected"
                            : ""
                    }>

                    $ USD

                </option>


                <option
                    value="EUR"
                    ${
                        settings.currency === "EUR"
                            ? "selected"
                            : ""
                    }>

                    € EUR

                </option>


                <option
                    value="GBP"
                    ${
                        settings.currency === "GBP"
                            ? "selected"
                            : ""
                    }>

                    £ GBP

                </option>

            </select>


            <label>
                Default Task Priority
            </label>


            <select
                class="search"
                id="settingTaskPriority">

                <option
                    value="Low"
                    ${
                        settings.defaultTaskPriority === "Low"
                            ? "selected"
                            : ""
                    }>

                    Low

                </option>


                <option
                    value="Medium"
                    ${
                        settings.defaultTaskPriority === "Medium"
                            ? "selected"
                            : ""
                    }>

                    Medium

                </option>


                <option
                    value="High"
                    ${
                        settings.defaultTaskPriority === "High"
                            ? "selected"
                            : ""
                    }>

                    High

                </option>

            </select>


            <label>
                Default Deal Stage
            </label>


            <select
                class="search"
                id="settingDealStage">

                <option
                    value="New Lead"
                    ${
                        settings.defaultDealStage === "New Lead"
                            ? "selected"
                            : ""
                    }>

                    New Lead

                </option>


                <option
                    value="Contacted"
                    ${
                        settings.defaultDealStage === "Contacted"
                            ? "selected"
                            : ""
                    }>

                    Contacted

                </option>


                <option
                    value="Meeting Scheduled"
                    ${
                        settings.defaultDealStage === "Meeting Scheduled"
                            ? "selected"
                            : ""
                    }>

                    Meeting Scheduled

                </option>


                <option
                    value="Proposal Sent"
                    ${
                        settings.defaultDealStage === "Proposal Sent"
                            ? "selected"
                            : ""
                    }>

                    Proposal Sent

                </option>


                <option
                    value="Negotiation"
                    ${
                        settings.defaultDealStage === "Negotiation"
                            ? "selected"
                            : ""
                    }>

                    Negotiation

                </option>

            </select>


            <label>
                Default Deal Status
            </label>


            <select
                class="search"
                id="settingDealStatus">

                <option
                    value="Open"
                    ${
                        settings.defaultDealStatus === "Open"
                            ? "selected"
                            : ""
                    }>

                    Open

                </option>


                <option
                    value="Won"
                    ${
                        settings.defaultDealStatus === "Won"
                            ? "selected"
                            : ""
                    }>

                    Won

                </option>


                <option
                    value="Lost"
                    ${
                        settings.defaultDealStatus === "Lost"
                            ? "selected"
                            : ""
                    }>

                    Lost

                </option>

            </select>

        </div>


        <!-- FOLLOW-UP SETTINGS -->

        <div
            class="card"
            style="margin-top:20px;">

            <h2>
                Follow-up Settings
            </h2>

            <p
                style="
                    opacity:0.7;
                    margin-top:5px;
                ">

                Control how far ahead upcoming
                follow-ups appear.

            </p>


            <br>


            <label>
                Reminder Window
            </label>


            <select
                class="search"
                id="settingReminderDays">

                <option
                    value="1"
                    ${
                        Number(settings.reminderDays) === 1
                            ? "selected"
                            : ""
                    }>

                    1 day

                </option>


                <option
                    value="3"
                    ${
                        Number(settings.reminderDays) === 3
                            ? "selected"
                            : ""
                    }>

                    3 days

                </option>


                <option
                    value="7"
                    ${
                        Number(settings.reminderDays) === 7
                            ? "selected"
                            : ""
                    }>

                    7 days

                </option>


                <option
                    value="14"
                    ${
                        Number(settings.reminderDays) === 14
                            ? "selected"
                            : ""
                    }>

                    14 days

                </option>

            </select>


            <label
                style="
                    display:flex;
                    align-items:center;
                    gap:10px;
                    margin-top:20px;
                ">

                <input
                    type="checkbox"
                    id="settingNotifications"
                    ${
                        settings.notificationsEnabled
                            ? "checked"
                            : ""
                    }>

                Enable notifications

            </label>

        </div>


        <!-- DATA MANAGEMENT -->

        <div
            class="card"
            style="margin-top:20px;">

            <h2>
                Data Management
            </h2>

            <p
                style="
                    opacity:0.7;
                    margin-top:5px;
                ">

                Manage your locally stored CRM data.

            </p>


            <br>


            <button
                class="search"
                onclick="
                    exportCRMData()
                ">

                📤 Export CRM Data

            </button>


            <br>


            <button
                class="search"
                onclick="
                    document
                        .getElementById(
                            'crmImportFile'
                        )
                        .click()
                ">

                📥 Import CRM Data

            </button>


            <input
                type="file"
                id="crmImportFile"
                accept=".json"
                style="display:none;"
                onchange="
                    importCRMData(
                        this.files[0]
                    )
                ">


            <br>


            <button
                class="search"
                onclick="
                    resetCRMData()
                "
                style="
                    border:1px solid rgba(
                        255,
                        80,
                        80,
                        0.4
                    );
                ">

                ⚠️ Reset CRM Data

            </button>

        </div>


        <!-- ABOUT -->

        <div
            class="card"
            style="margin-top:20px;">

            <h2>
                About
            </h2>

            <br>


            <p>
                <strong>
                    Virtual Genie CRM
                </strong>
            </p>


            <p>
                Business Operating System
            </p>


            <p
                style="
                    opacity:0.6;
                    margin-top:10px;
                ">

                Version 1.0

            </p>

        </div>


        <!-- SAVE -->

        <button
            class="fab"
            style="
                position:static;
                width:100%;
                height:60px;
                border-radius:18px;
                margin-top:20px;
            "
            onclick="
                saveGlobalSettings()
            ">

            Save Settings

        </button>


        <!-- BACK -->

        <button
            class="search"
            style="margin-top:20px;"
            onclick="
                location.hash=''
            ">

            ← Back to Dashboard

        </button>


        ${bottomNav("settings")}


    </div>

    `;

}


/* =========================================
   SAVE GLOBAL SETTINGS
========================================= */

function saveGlobalSettings() {

    const settings = {

        currency:
            document
                .getElementById(
                    "settingCurrency"
                )
                .value,


        defaultTaskPriority:
            document
                .getElementById(
                    "settingTaskPriority"
                )
                .value,


        defaultDealStage:
            document
                .getElementById(
                    "settingDealStage"
                )
                .value,


        defaultDealStatus:
            document
                .getElementById(
                    "settingDealStatus"
                )
                .value,


        reminderDays:
            Number(
                document
                    .getElementById(
                        "settingReminderDays"
                    )
                    .value
            ),


        notificationsEnabled:
            document
                .getElementById(
                    "settingNotifications"
                )
                .checked

    };


    const saved =
        saveSettings(
            settings
        );


    if (!saved) {

        alert(
            "Could not save settings."
        );

        return;

    }


    alert(
        "Settings saved."
    );

}


/* =========================================
   EXPORT CRM
========================================= */

function exportCRMData() {

    const data = {

        companies:
            getCompanies(),

        settings:
            getSettings(),

        exportedAt:
            new Date().toISOString(),

        version:
            "1.0"

    };


    const blob =
        new Blob(
            [
                JSON.stringify(
                    data,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        "virtual-genie-crm-backup.json";


    document
        .body
        .appendChild(
            link
        );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );

}


/* =========================================
   IMPORT CRM
========================================= */

function importCRMData(
    file
) {

    if (!file) {

        return;

    }


    const confirmed =
        confirm(
            "Importing will replace the current CRM data. Continue?"
        );


    if (!confirmed) {

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        function(event) {

        try {

            const data =
                JSON.parse(
                    event.target.result
                );


            if (
                !data ||
                !Array.isArray(
                    data.companies
                )
            ) {

                alert(
                    "Invalid CRM backup file."
                );

                return;

            }


            /*
               Validate the top-level structure
               before replacing current data.
            */

            const companies =
                data.companies.map(
                    company => {

                    if (
                        !company ||
                        typeof company !==
                        "object"
                    ) {

                        throw new Error(
                            "Invalid company record."
                        );

                    }


                    if (
                        !Array.isArray(
                            company.deals
                        )
                    ) {

                        company.deals = [];

                    }


                    if (
                        !Array.isArray(
                            company.tasks
                        )
                    ) {

                        company.tasks = [];

                    }


                    if (
                        !Array.isArray(
                            company.calls
                        )
                    ) {

                        company.calls = [];

                    }


                    if (
                        !Array.isArray(
                            company.products
                        )
                    ) {

                        company.products = [];

                    }


                    return company;

                });


            if (
                !saveCompanies(
                    companies
                )
            ) {

                throw new Error(
                    "Could not save imported companies."
                );

            }


            if (
                data.settings &&
                typeof data.settings ===
                "object"
            ) {

                saveSettings(
                    {
                        ...DEFAULT_SETTINGS,
                        ...data.settings
                    }
                );

            }


            alert(
                "CRM data imported successfully."
            );


            loadSettings();


        } catch (error) {

            console.error(
                "CRM import failed:",
                error
            );


            alert(
                "Could not import CRM data."
            );

        }

    };


    reader.readAsText(
        file
    );

}


/* =========================================
   RESET CRM
========================================= */

function resetCRMData() {

    const firstConfirm =
        confirm(
            "This will permanently delete all CRM companies, deals, calls, tasks and products. Continue?"
        );


    if (!firstConfirm) {

        return;

    }


    const secondConfirm =
        confirm(
            "Are you absolutely sure? This cannot be undone unless you have an exported backup."
        );


    if (!secondConfirm) {

        return;

    }


    localStorage.removeItem(
        "virtual_genie_crm"
    );


    alert(
        "CRM data has been reset."
    );


    location.hash =
        "";

                      }
