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


    const calls =
        Array.isArray(company.calls)
            ? company.calls
            : [];


    const call =
        calls.find(
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


    /*
       The follow-up input is populated from
       the linked task when one exists.

       The task is now the authoritative
       source for the active follow-up date.
    */

    const tasks =
        Array.isArray(company.tasks)
            ? company.tasks
            : [];


    const linkedTask =
        tasks.find(
            task =>
                task.source === "call" &&
                String(
                    task.sourceCallId
                ) === String(callId)
        );


    const followUp =
        linkedTask &&
        String(
            linkedTask.status || ""
        )
        .trim()
        .toLowerCase() !== "completed"

            ?

        linkedTask.dueDate || ""

            :

        "";


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
            value="${escapeEditCallField(
                followUp
            )}">


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
            onclick="
                loadCalls(
                    ${companyId}
                )
            ">

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


    const calls =
        Array.isArray(company.calls)
            ? company.calls
            : [];


    const call =
        calls.find(
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
       INITIALIZE COLLECTIONS
    ===================================== */

    if (
        !Array.isArray(
            company.tasks
        )
    ) {

        company.tasks = [];

    }


    /* =====================================
       READ FORM
    ===================================== */

    const type =
        document
            .getElementById(
                "callType"
            )
            .value
            .trim();


    const durationRaw =
        document
            .getElementById(
                "callDuration"
            )
            .value
            .trim();


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
            .value
            .trim();


    const notes =
        document
            .getElementById(
                "callNotes"
            )
            .value
            .trim();


    /* =====================================
       VALIDATE DURATION
    ===================================== */

    const duration =
        durationRaw === ""
            ? 0
            : Number(
                durationRaw
            );


    if (
        !Number.isFinite(
            duration
        ) ||
        duration < 0
    ) {

        alert(
            "Duration must be 0 or greater."
        );

        return;

    }


    /* =====================================
       UPDATE CALL FIELDS
    ===================================== */

    call.type =
        type || "General Call";


    call.duration =
        duration;


    call.outcome =
        outcome || "-";


    call.notes =
        notes || "";


    /*
       Keep call.followUp as a compatibility
       mirror for existing call records.

       Active CRM systems should read the
       linked task as the source of truth.
    */

    call.followUp =
        followUp || "";


    /* =====================================
       FIND LINKED TASK
    ===================================== */

    let linkedTask =
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
           CREATE LINKED TASK
        ================================= */

        if (!linkedTask) {

            /*
               IMPORTANT:

               Do not create the ID here.

               addTask() / storage.js owns
               task ID generation.
            */

            const newTask = {

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
                    buildCallFollowUpNotes(
                        outcome,
                        notes
                    ),

                source:
                    "call",

                sourceCallId:
                    callId

            };


            const savedTask =
                addTask(
                    companyId,
                    newTask
                );


            if (!savedTask) {

                console.error(
                    "Could not create call follow-up task."
                );

                return;

            }


            linkedTask =
                savedTask;

        }


        /* ================================
           UPDATE EXISTING TASK
        ================================= */

        else {

            linkedTask.title =
                `Follow up with ${
                    company.companyName
                }`;


            linkedTask.dueDate =
                followUp;


            linkedTask.notes =
                buildCallFollowUpNotes(
                    outcome,
                    notes
                );


            /*
               IMPORTANT:

               Do not automatically reopen a
               completed task.

               If the task is currently
               completed, leave its status
               unchanged.
            */

            updateCompany(
                company
            );

        }

    }


    /* =====================================
       FOLLOW-UP REMOVED
    ===================================== */

    else {

        /*
           Remove the active linked task.

           Since the user explicitly removed
           the follow-up from the call, there
           should no longer be an active
           call-follow-up task.
        */

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
       
       For an existing linked task,
       addTask() was already persisted above.
       We still save the call changes here.
    ===================================== */

    const saved =
        updateCompany(
            company
        );


    if (!saved) {

        console.error(
            "Update call failed"
        );

        return;

    }


    /* =====================================
       RETURN TO CALL HISTORY
    ===================================== */

    loadCalls(
        companyId
    );

}


/* =========================================
   BUILD FOLLOW-UP NOTES
========================================= */

function buildCallFollowUpNotes(
    outcome,
    notes
) {

    return [

        outcome
            ? `Call outcome: ${outcome}`
            : "",

        notes
            ? `Call notes: ${notes}`
            : ""

    ]
    .filter(Boolean)
    .join("\n\n");

}


/* =========================================
   SAFE FORM VALUE
========================================= */

function escapeEditCallField(
    value
) {

    return String(
        value ?? ""
    )
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
