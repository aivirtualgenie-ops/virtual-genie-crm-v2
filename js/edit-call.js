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


    /*
       Only an ACTIVE task should populate
       the follow-up field.

       Completed tasks are historical and
       must not resurrect their old date.
    */

    const activeTask =
        company.tasks.find(
            task => {

                const status =
                    String(
                        task.status ||
                        ""
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
            value="${activeFollowUp}">


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
            .getElementById(
                "callType"
            )
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


    /*
       Compatibility mirror only.
       Active follow-up truth is the task.
    */

    call.followUp =
        followUp ||
        "";


    call.notes =
        notes ||
        "";


    /* =====================================
       FIND LINKED TASKS
    ===================================== */

    const linkedTasks =
        company.tasks.filter(
            task =>

                task.source ===
                "call"

                &&

                String(
                    task.sourceCallId
                ) ===
                String(callId)
        );


    const activeTask =
        linkedTasks.find(
            task => {

                const status =
                    String(
                        task.status ||
                        ""
                    )
                    .trim()
                    .toLowerCase();


                return (
                    status !==
                    "completed"
                );

            }
        );


    /* =====================================
       NEW / UPDATED FOLLOW-UP
    ===================================== */

    if (followUp) {

        /*
           ACTIVE TASK EXISTS
        */

        if (activeTask) {

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

        }


        /*
           NO ACTIVE TASK
           
           This includes a previous completed
           task. Never reopen completed history.
           Create a NEW pending task.
        */

        else {

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
                    buildEditCallTaskNotes(
                        call
                    ),

                source:
                    "call",

                sourceCallId:
                    call.id

            };


            const savedTask =
                addTask(
                    company.id,
                    newTask
                );


            if (!savedTask) {

                console.error(
                    "Could not create call follow-up task."
                );

                return;

            }

        }

    }


    /* =====================================
       FOLLOW-UP REMOVED
    ===================================== */

    else {

        /*
           Remove ONLY active tasks.

           Completed tasks remain historical.
        */

        company.tasks =
            company.tasks.filter(
                task => {

                    if (
                        task.source !==
                        "call"
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
                            task.status ||
                            ""
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
       SAVE COMPANY
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
   BUILD TASK NOTES
========================================= */

function buildEditCallTaskNotes(
    call
) {

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
   ESCAPE FORM VALUES
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
