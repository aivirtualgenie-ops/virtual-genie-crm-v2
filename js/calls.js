/* =========================================
   COMPANY CALL HISTORY
========================================= */

function loadCalls(companyId) {

    const company = getCompany(companyId);

    const app = document.getElementById("app");


    /* =====================================
       COMPANY CHECK
    ===================================== */

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


    /* =====================================
       INITIALIZE CALLS
    ===================================== */

    if (!company.calls) {

        company.calls = [];

        updateCompany(company);

    }


    let callCards = "";


    /* =====================================
       NO CALLS
    ===================================== */

    if (company.calls.length === 0) {

        callCards = `

        <div class="call-empty-state">

            <div class="call-empty-icon">
                ☎
            </div>

            <h2>
                No calls yet
            </h2>

            <p>
                Start building the conversation history
                for ${company.companyName}.
            </p>

            <button
                class="call-empty-button"
                onclick="loadAddCall(${company.id})">

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

        company.calls.forEach(call => {

            callCards += `

            <div class="card">

                <h3>
                    ${call.type || "Call"}
                </h3>

                <p>
                    <strong>Date:</strong>
                    ${call.date || "-"}
                </p>

                <p>
                    <strong>Time:</strong>
                    ${call.time || "-"}
                </p>

                <p>
                    <strong>Duration:</strong>
                    ${call.duration || 0} min
                </p>

                <p>
                    <strong>Outcome:</strong>
                    ${call.outcome || "-"}
                </p>

                <p>
                    <strong>Next Follow-up:</strong>
                    ${call.followUp || "-"}
                </p>

                <br>

                <p>
                    ${call.notes || "No notes."}
                </p>

                <br>

                <button
                    class="search"
                    onclick="loadEditCall(
                        ${companyId},
                        ${call.id}
                    )">

                    ✏️ Edit

                </button>

                <br>
                <br>

                <button
                    class="search"
                    onclick="deleteCallConfirm(
                        ${companyId},
                        ${call.id}
                    )">

                    🗑 Delete

                </button>

            </div>

            `;

        });

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
                    ${company.companyName}
                </p>

            </div>

        </div>

        ${callCards}


        <!-- BACK -->

        <button
            class="search"
            style="margin-top:20px;"
            onclick="loadCompany(${company.id})">

            ← Back to Company

        </button>


        <!-- ADD CALL -->

        <button
            class="fab"
            onclick="loadAddCall(${company.id})">

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
            onclick="saveCall(${companyId})">

            Save Call

        </button>


        <button
            class="search"
            style="margin-top:20px;"
            onclick="loadCalls(${companyId})">

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
            "Save call failed: company not found",
            companyId
        );

        return;

    }


    /* =====================================
       INITIALIZE ARRAYS
    ===================================== */

    if (!company.calls) {

        company.calls = [];

    }


    if (!company.tasks) {

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
            .value;


    const notes =
        document
            .getElementById("callNotes")
            .value
            .trim();


    /* =====================================
       CREATE CALL ID
    ===================================== */

    const callId =
        Date.now();


    /* =====================================
       CREATE CALL
    ===================================== */

    const call = {

        id:
            callId,

        date:
            new Date().toISOString(),

        time:
            new Date().toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            ),

        type:
            type || "General Call",

        duration:
            Number(durationValue) || 0,

        outcome:
            outcome || "-",

        followUp:
            followUp || "",

        notes:
            notes || ""

    };


    /* =====================================
       SAVE CALL
    ===================================== */

    company.calls.unshift(call);


    /* =====================================
       CREATE FOLLOW-UP TASK
    ===================================== */

    if (followUp) {

        createCallFollowUpTask(
            company,
            call
        );

    }


    /* =====================================
       SAVE COMPANY
    ===================================== */

    const saved =
        updateCompany(company);


    if (!saved) {

        console.error(
            "Save call failed"
        );

        return;

    }


    /* =====================================
       RETURN TO CALL HISTORY
    ===================================== */

    loadCalls(companyId);

}


/* =========================================
   CREATE CALL FOLLOW-UP TASK
========================================= */

function createCallFollowUpTask(
    company,
    call
) {

    if (!company.tasks) {

        company.tasks = [];

    }


    const followUpTask = {

        id:
            Date.now() + 1,

        title:
            `Follow up with ${company.companyName}`,

        dueDate:
            call.followUp,

        priority:
            "Medium",

        status:
            "Pending",

        notes:
            [
                call.outcome
                    ? `Call outcome: ${call.outcome}`
                    : "",

                call.notes
                    ? `Call notes: ${call.notes}`
                    : ""

            ]
            .filter(Boolean)
            .join("\n\n"),

        source:
            "call",

        sourceCallId:
            call.id

    };


    company.tasks.push(
        followUpTask
    );

}


/* =========================================
   EDIT CALL
========================================= */

function loadEditCall(
    companyId,
    callId
) {

    const company =
        getCompany(companyId);


    if (!company) {

        console.error(
            "Edit call failed: company not found"
        );

        return;

    }


    const call =
        (company.calls || []).find(
            item =>
                String(item.id) ===
                String(callId)
        );


    if (!call) {

        console.error(
            "Edit call failed: call not found"
        );

        return;

    }


    const app =
        document.getElementById("app");


    app.innerHTML = `

    <div class="dashboard">

        <div class="header">

            <h1>
                Edit Call
            </h1>

            <p class="subtitle">
                Update your conversation record
            </p>

        </div>


        <input
            class="search"
            id="callType"
            placeholder="Call Type"
            value="${escapeCallField(call.type || "")}">


        <input
            class="search"
            id="callDuration"
            type="number"
            min="0"
            placeholder="Duration (minutes)"
            value="${Number(call.duration || 0)}">


        <input
            class="search"
            id="callOutcome"
            placeholder="Outcome"
            value="${escapeCallField(call.outcome || "")}">


        <input
            class="search"
            id="callFollowUp"
            type="date"
            value="${call.followUp || ""}">


        <textarea
            class="search"
            id="callNotes"
            placeholder="Notes"
            style="height:150px;">${escapeCallField(call.notes || "")}</textarea>


        <button
            class="fab"
            style="
                position:static;
                width:100%;
                height:60px;
                border-radius:18px;
            "
            onclick="
                updateCall(
                    ${companyId},
                    ${callId}
                )
            ">

            Save Changes

        </button>


        <button
            class="search"
            style="margin-top:20px;"
            onclick="loadCalls(${companyId})">

            ← Back to Call History

        </button>


        ${bottomNav("companies")}

    </div>

    `;

}


/* =========================================
   UPDATE CALL
========================================= */

function updateCall(
    companyId,
    callId
) {

    const company =
        getCompany(companyId);


    if (!company) {

        console.error(
            "Update call failed: company not found"
        );

        return;

    }


    const call =
        (company.calls || []).find(
            item =>
                String(item.id) ===
                String(callId)
        );


    if (!call) {

        console.error(
            "Update call failed: call not found"
        );

        return;

    }


    if (!company.tasks) {

        company.tasks = [];

    }


    /* =====================================
       READ UPDATED FORM
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
            .value;


    const notes =
        document
            .getElementById("callNotes")
            .value
            .trim();


    /* =====================================
       UPDATE CALL
    ===================================== */

    call.type =
        type || "General Call";

    call.duration =
        Number(durationValue) || 0;

    call.outcome =
        outcome || "-";

    call.followUp =
        followUp || "";

    call.notes =
        notes || "";


    /* =====================================
       FIND LINKED TASK
    ===================================== */

    const linkedTask =
        company.tasks.find(
            task =>
                task.source === "call" &&
                String(task.sourceCallId) ===
                String(callId)
        );


    /* =====================================
       CASE 1:
       FOLLOW-UP EXISTS
    ===================================== */

    if (followUp) {


        /* ================================
           NO TASK → CREATE ONE
        ================================= */

        if (!linkedTask) {

            createCallFollowUpTask(
                company,
                call
            );

        }


        /* ================================
           TASK EXISTS → UPDATE IT
        ================================= */

        else {

            linkedTask.title =
                `Follow up with ${company.companyName}`;

            linkedTask.dueDate =
                followUp;

            linkedTask.notes =
                [
                    outcome
                        ? `Call outcome: ${outcome}`
                        : "",

                    notes
                        ? `Call notes: ${notes}`
                        : ""

                ]
                .filter(Boolean)
                .join("\n\n");


            /*
               IMPORTANT:

               We intentionally DO NOT change
               linkedTask.status here.

               If the task was already completed,
               editing the call should not reopen it.
            */

        }

    }


    /* =====================================
       CASE 2:
       FOLLOW-UP REMOVED
    ===================================== */

    else {

        company.tasks =
            company.tasks.filter(
                task =>
                    !(
                        task.source === "call" &&
                        String(task.sourceCallId) ===
                        String(callId)
                    )
            );

    }


    /* =====================================
       SAVE COMPANY
    ===================================== */

    const saved =
        updateCompany(company);


    if (!saved) {

        console.error(
            "Update call failed"
        );

        return;

    }


    loadCalls(companyId);

}


/* =========================================
   DELETE CALL
========================================= */

function deleteCallConfirm(
    companyId,
    callId
) {

    const confirmDelete =
        confirm("Delete this call?");


    if (!confirmDelete) {

        return;

    }


    const company =
        getCompany(companyId);


    if (!company) {

        console.error(
            "Delete call failed: company not found",
            companyId
        );

        return;

    }


    /* =====================================
       DELETE CALL
    ===================================== */

    company.calls =
        (company.calls || []).filter(
            call =>
                String(call.id) !==
                String(callId)
        );


    /* =====================================
       DELETE LINKED FOLLOW-UP TASK
    ===================================== */

    company.tasks =
        (company.tasks || []).filter(
            task =>
                !(
                    task.source === "call" &&
                    String(task.sourceCallId) ===
                    String(callId)
                )
        );


    /* =====================================
       SAVE
    ===================================== */

    const saved =
        updateCompany(company);


    if (!saved) {

        console.error(
            "Delete call failed"
        );

        return;

    }


    loadCalls(companyId);

}


/* =========================================
   SAFE FORM VALUE
========================================= */

function escapeCallField(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

       }
