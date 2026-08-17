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


    if (
        !Array.isArray(
            company.tasks
        )
    ) {

        company.tasks = [];

    }


    /* =====================================
       FIND ACTIVE FOLLOW-UP
    ===================================== */

    const activeTask =
        company.tasks.find(
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
                    String(callId) &&
                    status !== "completed" &&
                    task.dueDate
                );

            }
        );


    const activeFollowUp =
        activeTask
            ? activeTask.dueDate
            : "";


    const app =
        document.getElementById(
            "app"
        );


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
                activeFollowUp
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
            .getElementById("callType")
            .value
            .trim();


    const duration =
        Number(
            document
                .getElementById("callDuration")
                .value
        ) || 0;


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
       UPDATE CALL
    ===================================== */

    call.type =
        type ||
        "General Call";


    call.duration =
        duration;


    call.outcome =
        outcome ||
        "-";


    call.notes =
        notes ||
        "";


    /*
       Compatibility mirror only.
       Active follow-up truth is the Task.
    */

    call.followUp =
        followUp ||
        "";


    /* =====================================
       FIND ACTIVE TASK
    ===================================== */

    const activeTask =
        company.tasks.find(
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
                    String(callId) &&
                    status !== "completed"
                );

            }
        );


    /* =====================================
       FOLLOW-UP PROVIDED
    ===================================== */

    if (followUp) {

        if (activeTask) {

            /*
               Update existing active task.
            */

            activeTask.title =
                `Follow up with ${
                    company.companyName
                }`;


            activeTask.dueDate =
                followUp;


            activeTask.notes =
                buildEditCallTaskNotes(
                    call
                );

        } else {

            /*
               Previous task may be completed.

               Create a NEW pending task.

               IMPORTANT:
               Push directly into this same
               company object and save once.
            */

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
                    buildEditCallTaskNotes(
                        call
                    ),

                source:
                    "call",

                sourceCallId:
                    call.id

            });

        }

    }


    /* =====================================
       FOLLOW-UP REMOVED
    ===================================== */

    else {

        /*
           Remove ONLY active linked tasks.

           Completed historical tasks remain.
        */

        company.tasks =
            company.tasks.filter(
                task => {

                    if (
                        task.source !== "call"
                    ) {

                        return true;

                    }


                    if (
                        String(
                            task.sourceCallId
                        ) !==
                        String(callId)
                    ) {

                        return true;

                    }


                    const status =
                        String(
                            task.status || ""
                        )
                        .trim()
                        .toLowerCase();


                    return (
                        status ===
                        "completed"
                    );

                }
            );

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
            "Update call failed"
        );

        return;

    }


    loadCalls(
        companyId
    );

}


/* =========================================
   TASK NOTES
========================================= */

function buildEditCallTaskNotes(call) {

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
   ESCAPE
========================================= */

function escapeEditCallField(value) {

    return String(
        value ?? ""
    )
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

                                }
