/* =========================================
   COMPANY CALL HISTORY
========================================= */

function loadCalls(companyId) {

    const company = getCompany(companyId);
    const app = document.getElementById("app");

    if (!company) {

        app.innerHTML = `
        <div class="dashboard">
            <div class="card">
                <h2>Company not found</h2>
                <br>
                <button
                    class="search"
                    onclick="location.hash='companies'">
                    ← Back
                </button>
            </div>
            ${bottomNav("companies")}
        </div>
        `;

        return;
    }

    const calls =
        Array.isArray(company.calls)
            ? company.calls
            : [];

    let callCards = "";


    /* =====================================
       NO CALLS
    ===================================== */

    if (calls.length === 0) {

        callCards = `

        <div class="call-empty-state">

            <div class="call-empty-icon">
                ☎
            </div>

            <h2>
                No calls yet
            </h2>

            <p>
                Start building the conversation
                history for
                ${escapeCallField(
                    company.companyName
                )}.
            </p>

            <button
                class="call-empty-button"
                onclick="
                    loadAddCall(
                        ${company.id}
                    )
                ">

                <span>+</span>

                Log First Call

            </button>

        </div>

        `;

    }


    /* =====================================
       CALL CARDS
    ===================================== */

    else {

        calls.forEach(
            call => {

                const tasks =
                    Array.isArray(company.tasks)
                        ? company.tasks
                        : [];


                const activeFollowUpTask =
                    tasks
                        .filter(
                            task => {

                                const status =
                                    String(
                                        task.status || ""
                                    )
                                    .trim()
                                    .toLowerCase();

                                return (
                                    task.source === "call" &&
                                    String(
                                        task.sourceCallId
                                    ) ===
                                    String(call.id) &&
                                    status !== "completed" &&
                                    task.dueDate
                                );

                            }
                        )
                        .sort(
                            (a, b) => {

                                return (
                                    new Date(
                                        a.dueDate
                                    ).getTime()

                                    -

                                    new Date(
                                        b.dueDate
                                    ).getTime()
                                );

                            }
                        )[0];


                const activeFollowUp =
                    activeFollowUpTask
                        ? activeFollowUpTask.dueDate
                        : "";


                callCards += `

                <div class="card">

                    <h3>
                        ${escapeCallField(
                            call.type ||
                            "Call"
                        )}
                    </h3>

                    <p>
                        <strong>Date:</strong>
                        ${escapeCallField(
                            call.date || "-"
                        )}
                    </p>

                    <p>
                        <strong>Time:</strong>
                        ${escapeCallField(
                            call.time || "-"
                        )}
                    </p>

                    <p>
                        <strong>Duration:</strong>
                        ${Number(
                            call.duration || 0
                        )} min
                    </p>

                    <p>
                        <strong>Outcome:</strong>
                        ${escapeCallField(
                            call.outcome || "-"
                        )}
                    </p>

                    <p>
                        <strong>Next Follow-up:</strong>
                        ${activeFollowUp || "-"}
                    </p>

                    <br>

                    <p>
                        ${escapeCallField(
                            call.notes ||
                            "No notes."
                        )}
                    </p>

                    <br>

                    <button
                        class="search"
                        onclick="
                            loadEditCall(
                                ${companyId},
                                ${call.id}
                            )
                        ">

                        ✏️ Edit

                    </button>

                    <br>
                    <br>

                    <button
                        class="search"
                        onclick="
                            deleteCallConfirm(
                                ${companyId},
                                ${call.id}
                            )
                        ">

                        🗑 Delete

                    </button>

                </div>

                `;

            }
        );

    }


    /* =====================================
       PAGE
    ===================================== */

    app.innerHTML = `

    <div class="dashboard">

        <div class="call-history-header">

            <div class="call-history-icon">
                ☎
            </div>

            <div class="call-history-heading">

                <p class="call-history-label">
                    COMMUNICATION
                </p>

                <h1>
                    Call History
                </h1>

                <p class="call-history-company">
                    ${escapeCallField(
                        company.companyName
                    )}
                </p>

            </div>

        </div>

        ${callCards}

        <button
            class="search"
            style="margin-top:20px;"
            onclick="
                loadCompany(
                    ${company.id}
                )
            ">

            ← Back to Company

        </button>

        <button
            class="fab"
            onclick="
                loadAddCall(
                    ${company.id}
                )
            ">

            +

        </button>

        ${bottomNav("companies")}

    </div>

    `;

}


/* =========================================
   ADD CALL
========================================= */

function loadAddCall(companyId) {

    const app =
        document.getElementById("app");

    app.innerHTML = `

    <div class="dashboard">

        <div class="header">

            <h1>
                Log Call
            </h1>

            <p class="subtitle">
                Record your conversation
            </p>

        </div>

        <input
            class="search"
            id="callType"
            placeholder="Call Type">

        <input
            class="search"
            id="callDuration"
            type="number"
            min="0"
            placeholder="Duration (minutes)">

        <input
            class="search"
            id="callOutcome"
            placeholder="Outcome">

        <input
            class="search"
            id="callFollowUp"
            type="date">

        <textarea
            class="search"
            id="callNotes"
            placeholder="Notes"
            style="height:150px;"></textarea>

        <button
            class="fab"
            style="
                position:static;
                width:100%;
                height:60px;
                border-radius:18px;
            "
            onclick="
                saveCall(
                    ${companyId}
                )
            ">

            Save Call

        </button>

        <button
            class="search"
            style="margin-top:20px;"
            onclick="
                loadCalls(
                    ${companyId}
                )
            ">

            ← Back to Call History

        </button>

        ${bottomNav("companies")}

    </div>

    `;

}


/* =========================================
   SAVE CALL
========================================= */

function saveCall(companyId) {

    const company =
        getCompany(companyId);

    if (!company) {

        console.error(
            "Save call failed: company not found"
        );

        return;

    }


    if (!Array.isArray(company.calls)) {

        company.calls = [];

    }


    if (!Array.isArray(company.tasks)) {

        company.tasks = [];

    }


    /* =====================================
       READ FORM
    ===================================== */

    const type =
        document
            .getElementById("callType")
            .value
            .trim();


    const durationValue =
        document
            .getElementById("callDuration")
            .value;


    const outcome =
        document
            .getElementById("callOutcome")
            .value
            .trim();


    const followUp =
        document
            .getElementById("callFollowUp")
            .value
            .trim();


    const notes =
        document
            .getElementById("callNotes")
            .value
            .trim();


    /* =====================================
       CREATE CALL

       storage.js does not provide addCall().
       Generate the ID here and persist the
       complete company once.
    ===================================== */

    const now =
        new Date();


    const call = {

        id:
            generateId(),

        date:
            now.toISOString(),

        time:
            now.toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            ),

        type:
            type ||
            "General Call",

        duration:
            Number(
                durationValue
            ) || 0,

        outcome:
            outcome ||
            "-",

        followUp:
            followUp ||
            "",

        notes:
            notes ||
            ""

    };


    company.calls.push(
        call
    );


    /* =====================================
       CREATE FOLLOW-UP TASK

       Add directly to the same company
       object so we save call + task
       atomically.
    ===================================== */

    if (followUp) {

        company.tasks.push({

            id:
                generateId(),

            title:
                `Follow up with ${
                    company.companyName
                }`,

            dueDate:
                followUp,

            priority:
                "Medium",

            status:
                "Pending",

            notes:
                buildCallTaskNotes(
                    call
                ),

            source:
                "call",

            sourceCallId:
                call.id

        });

    }


    /* =====================================
       SAVE ONCE
    ===================================== */

    const saved =
        updateCompany(
            company
        );


    if (!saved) {

        console.error(
            "Save call failed"
        );

        return;

    }


    loadCalls(
        companyId
    );

}


/* =========================================
   BUILD CALL TASK NOTES
========================================= */

function buildCallTaskNotes(call) {

    return [

        call.outcome
            ? `Call outcome: ${call.outcome}`
            : "",

        call.notes
            ? `Call notes: ${call.notes}`
            : ""

    ]
    .filter(Boolean)
    .join("\n\n");

}


/* =========================================
   DELETE CALL
========================================= */

function deleteCallConfirm(
    companyId,
    callId
) {

    const confirmDelete =
        confirm(
            "Delete this call?"
        );


    if (!confirmDelete) {

        return;

    }


    const company =
        getCompany(companyId);


    if (!company) {

        console.error(
            "Delete call failed: company not found"
        );

        return;

    }


    company.calls =
        (
            company.calls ||
            []
        ).filter(
            call =>
                String(
                    call.id
                ) !==
                String(callId)
        );


    /*
       Delete all tasks linked to this call.
    */

    company.tasks =
        (
            company.tasks ||
            []
        ).filter(
            task =>
                !(
                    task.source === "call" &&
                    String(
                        task.sourceCallId
                    ) ===
                    String(callId)
                )
        );


    const saved =
        updateCompany(
            company
        );


    if (!saved) {

        console.error(
            "Delete call failed"
        );

        return;

    }


    loadCalls(
        companyId
    );

}


/* =========================================
   ESCAPE
========================================= */

function escapeCallField(value) {

    return String(
        value ?? ""
    )
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

}
