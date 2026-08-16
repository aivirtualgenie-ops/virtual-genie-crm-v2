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
            "Edit call failed: company not found",
            companyId
        );

        return;

    }


    const call =
        (company.calls || []).find(
            c =>
                String(c.id) ===
                String(callId)
        );


    if (!call) {

        console.error(
            "Edit call failed: call not found",
            callId
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
                ${escapeEditCallField(
                    company.companyName
                )}
            </p>

        </div>


        <input
            class="search"
            id="callType"
            placeholder="Call Type"
            value="${escapeEditCallField(
                call.type || ""
            )}">


        <input
            class="search"
            id="callDuration"
            type="number"
            min="0"
            placeholder="Duration (minutes)"
            value="${Number(
                call.duration || 0
            )}">


        <input
            class="search"
            id="callOutcome"
            placeholder="Outcome"
            value="${escapeEditCallField(
                call.outcome || ""
            )}">


        <input
            class="search"
            id="callFollowUp"
            type="date"
            value="${call.followUp || ""}">


        <textarea
            class="search"
            id="callNotes"
            placeholder="Notes"
            style="height:150px;">${escapeEditCallField(
                call.notes || ""
            )}</textarea>


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

            Update Call

        </button>


        <button
            class="search"
            style="margin-top:20px;"
            onclick="loadCalls(${companyId})">

            ← Back

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
            "Update call failed: company not found",
            companyId
        );

        return;

    }


    const call =
        (company.calls || []).find(
            c =>
                String(c.id) ===
                String(callId)
        );


    if (!call) {

        console.error(
            "Update call failed: call not found",
            callId
        );

        return;

    }


    /* =====================================
       INITIALIZE TASKS
    ===================================== */

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


    const duration =
        Number(
            document
                .getElementById(
                    "callDuration"
                )
                .value
        ) || 0;


    const outcome =
        document
            .getElementById(
                "callOutcome"
            )
            .value
            .trim();


    const followUp =
        document
            .getElementById(
                "callFollowUp"
            )
            .value;


    const notes =
        document
            .getElementById(
                "callNotes"
            )
            .value
            .trim();


    /* =====================================
       UPDATE CALL
    ===================================== */

    call.type =
        type || "General Call";


    call.duration =
        duration;


    call.outcome =
        outcome || "-";


    call.followUp =
        followUp || "";


    call.notes =
        notes || "";


    /* =====================================
       FIND LINKED FOLLOW-UP TASK
    ===================================== */

    const linkedTask =
        company.tasks.find(
            task =>
                task.source === "call" &&
                String(
                    task.sourceCallId
                ) === String(callId)
        );


    /* =====================================
       FOLLOW-UP EXISTS
    ===================================== */

    if (followUp) {


        /* ================================
           CREATE TASK IF MISSING
        ================================= */

        if (!linkedTask) {

            const newTask = {

                id:
                    Date.now() + 1,

                title:
                    `Follow up with ${company.companyName}`,

                dueDate:
                    followUp,

                priority:
                    "Medium",

                status:
                    "Pending",

                notes:
                    [
                        outcome
                            ? `Call outcome: ${outcome}`
                            : "",

                        notes
                            ? `Call notes: ${notes}`
                            : ""

                    ]
                    .filter(Boolean)
                    .join("\n\n"),

                source:
                    "call",

                sourceCallId:
                    callId

            };


            company.tasks.push(
                newTask
            );

        }


        /* ================================
           UPDATE EXISTING TASK
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
               DO NOT change status.

               If the user already completed
               this task, editing the call should
               not reopen it.
            */

        }

    }


    /* =====================================
       FOLLOW-UP REMOVED
    ===================================== */

    else {

        company.tasks =
            company.tasks.filter(
                task =>
                    !(
                        task.source === "call" &&
                        String(
                            task.sourceCallId
                        ) === String(callId)
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


    /* =====================================
       RETURN TO CALL HISTORY
    ===================================== */

    loadCalls(companyId);

}


/* =========================================
   SAFE FORM VALUE
========================================= */

function escapeEditCallField(
    value
) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        );

}
