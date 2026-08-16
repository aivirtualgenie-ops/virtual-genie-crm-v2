/* =========================================
   COMPANY CALL HISTORY
========================================= */


/* =========================================
   LOAD CALLS
========================================= */

function loadCalls(companyId) {

    const company =
        getCompany(companyId);

    const app =
        document.getElementById("app");


    /* =====================================
       COMPANY CHECK
    ===================================== */

    if (!company) {

        app.innerHTML = `

        <div class="dashboard">

            <div class="card">

                <h2>
                    Company not found
                </h2>

                <br>

                <button
                    class="search"
                    onclick="
                        location.hash='companies'
                    ">

                    ← Back

                </button>

            </div>

            ${bottomNav("companies")}

        </div>

        `;

        return;

    }


    /* =====================================
       READ CALLS
    ===================================== */

    const calls =
        Array.isArray(company.calls)
            ? company.calls
            : [];


    let callCards = "";


    /* =====================================
       NO CALLS
    ===================================== */

    if (
        calls.length === 0
    ) {

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

                <span>
                    +
                </span>

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
                Array.isArray(
                    company.tasks
                )
                    ? company.tasks
                    : [];


            const linkedTasks =
                tasks.filter(
                    task =>

                        task.source ===
                        "call"

                        &&

                        String(
                            task.sourceCallId
                        ) ===
                        String(
                            call.id
                        )
                );


            /*
               Active follow-up is the earliest
               non-completed linked task.

               Completed tasks remain historical
               and are ignored here.
            */

            const activeFollowUpTask =
                linkedTasks
                    .filter(
                        task =>

                            String(
                                task.status ||
                                ""
                            )
                            .trim()
                            .toLowerCase()
                            !==
                            "completed"

                            &&

                            task.dueDate
                    )
                    .sort(
                        (a, b) => {

                            const dateA =
                                new Date(
                                    a.dueDate
                                ).getTime();


                            const dateB =
                                new Date(
                                    b.dueDate
                                ).getTime();


                            return dateA - dateB;

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
                    <strong>
                        Date:
                    </strong>

                    ${escapeCallField(
                        call.date ||
                        "-"
                    )}
                </p>

                <p>
                    <strong>
                        Time:
                    </strong>

                    ${escapeCallField(
                        call.time ||
                        "-"
                    )}
                </p>

                <p>
                    <strong>
                        Duration:
                    </strong>

                    ${Number(
                        call.duration ||
                        0
                    )} min
                </p>

                <p>
                    <strong>
                        Outcome:
                    </strong>

                    ${escapeCallField(
                        call.outcome ||
                        "-"
                    )}
                </p>

                <p>
                    <strong>
                        Next Follow-up:
                    </strong>

                    ${
                        activeFollowUp ||
                        "-"
                    }
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

function loadAddCall(
    companyId
) {

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

function saveCall(
    companyId
) {

    const company =
        getCompany(companyId);


    if (!company) {

        console.error(
            "Save call failed: company not found"
        );

        return;

    }


    /* =====================================
       INITIALIZE COLLECTIONS
    ===================================== */

    if (
        !Array.isArray(
            company.calls
        )
    ) {

        company.calls = [];

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


    const durationValue =
        document
            .getElementById(
                "callDuration"
            )
            .value;


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
       CREATE CALL
       Storage owns the call ID through
       addCall().
    ===================================== */

    const call = {

        date:
            new Date().toISOString(),

        time:
            new Date().toLocaleTimeString(
                "en-IN",
                {
                    hour:
                        "2-digit",

                    minute:
                        "2-digit"
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


    /* =====================================
       SAVE CALL
    ===================================== */

    const savedCall =
        addCall(
            companyId,
            call
        );


    if (!savedCall) {

        console.error(
            "Save call failed"
        );

        return;

    }


    /*
       addCall() may return the saved
       call with its storage-owned ID.

       Re-read the company so the task
       relationship uses the persisted ID.
    */

    const updatedCompany =
        getCompany(
            companyId
        );


    if (!updatedCompany) {

        console.error(
            "Could not reload company after call."
        );

        return;

    }


    const persistedCall =
        (
            updatedCompany.calls ||
            []
        ).find(
            item =>
                String(item.id) ===
                String(
                    savedCall.id
                )
        );


    /* =====================================
       CREATE FOLLOW-UP TASK
    ===================================== */

    if (
        followUp &&
        persistedCall
    ) {

        createCallFollowUpTask(
            updatedCompany,
            persistedCall
        );


        updateCompany(
            updatedCompany
        );

    }


    /* =====================================
       RETURN
    ===================================== */

    loadCalls(
        companyId
    );

}


/* =========================================
   CREATE CALL FOLLOW-UP TASK
========================================= */

function createCallFollowUpTask(
    company,
    call
) {

    if (
        !Array.isArray(
            company.tasks
        )
    ) {

        company.tasks = [];

    }


    /*
       Do not create a task if an active
       follow-up already exists for this call.
    */

    const existingActiveTask =
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
                    task.source ===
                    "call"

                    &&

                    String(
                        task.sourceCallId
                    ) ===
                    String(
                        call.id
                    )

                    &&

                    status !==
                    "completed"
                );

            }
        );


    if (
        existingActiveTask
    ) {

        existingActiveTask.dueDate =
            call.followUp;


        existingActiveTask.title =
            `Follow up with ${
                company.companyName
            }`;


        existingActiveTask.notes =
            buildCallTaskNotes(
                call
            );


        return existingActiveTask;

    }


    /*
       Storage owns task ID generation.
       addTask() is responsible for
       persistence.
    */

    const task = {

        title:
            `Follow up with ${
                company.companyName
            }`,

        dueDate:
            call.followUp,

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

    };


    /*
       addTask() persists the task.

       We pass the company ID because the
       storage layer owns task persistence.
    */

    const savedTask =
        addTask(
            company.id,
            task
        );


    return savedTask || null;

}


/* =========================================
   BUILD CALL TASK NOTES
========================================= */

function buildCallTaskNotes(
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
        (
            company.calls ||
            []
        ).find(
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


    const tasks =
        Array.isArray(
            company.tasks
        )
            ? company.tasks
            : [];


    /*
       Only an ACTIVE linked task should
       populate the follow-up field.

       A completed historical task should
       not resurrect its date.
    */

    const activeTask =
        tasks.find(
            task => {

                const status =
                    String(
                        task.status ||
                        ""
                    )
                    .trim()
                    .toLowerCase();


                return (
                    task.source ===
                    "call"

                    &&

                    String(
                        task.sourceCallId
                    ) ===
                    String(
                        callId
                    )

                    &&

                    status !==
                    "completed"

                    &&

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
                Update your conversation record
            </p>

        </div>


        <input
            class="search"
            id="callType"
            placeholder="Call Type"
            value="${escapeCallField(
                call.type ||
                ""
            )}">


        <input
            class="search"
            id="callDuration"
            type="number"
            min="0"
            placeholder="Duration (minutes)"
            value="${Number(
                call.duration ||
                0
            )}">


        <input
            class="search"
            id="callOutcome"
            placeholder="Outcome"
            value="${escapeCallField(
                call.outcome ||
                ""
            )}">


        <input
            class="search"
            id="callFollowUp"
            type="date"
            value="${escapeCallField(
                activeFollowUp
            )}">


        <textarea
            class="search"
            id="callNotes"
            placeholder="Notes"
            style="height:150px;">${escapeCallField(
                call.notes ||
                ""
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

            Save Changes

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
   UPDATE CALL
========================================= */

function updateCall(
    companyId,
    callId
) {

    const company =
        getCompany(
            companyId
        );


    if (!company) {

        console.error(
            "Update call failed: company not found"
        );

        return;

    }


    const call =
        (
            company.calls ||
            []
        ).find(
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


    const durationValue =
        document
            .getElementById(
                "callDuration"
            )
            .value;


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
       UPDATE CALL FIELDS
    ===================================== */

    call.type =
        type ||
        "General Call";


    call.duration =
        Number(
            durationValue
        ) || 0;


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
       FOLLOW-UP PROVIDED
    ===================================== */

    if (followUp) {


        /* ================================
           ACTIVE TASK EXISTS
        ================================= */

        if (activeTask) {

            activeTask.title =
                `Follow up with ${
                    company.companyName
                }`;


            activeTask.dueDate =
                followUp;


            activeTask.notes =
                buildCallTaskNotes(
                    call
                );

        }


        /* ================================
           NO ACTIVE TASK
           
           This includes the situation where
           an older task was completed.
           
           Create a NEW task rather than
           reopening historical data.
        ================================= */

        else {

            /*
               addTask() owns the task ID and
               persistence.
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
                    buildCallTaskNotes(
                        call
                    ),

                source:
                    "call",

                sourceCallId:
                    call.id

            };


            addTask(
                company.id,
                newTask
            );

        }

    }


    /* =====================================
       FOLLOW-UP REMOVED
    ===================================== */

    else {

        /*
           Remove ONLY active call-follow-up
           tasks.

           Completed historical tasks remain.
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
        getCompany(
            companyId
        );


    if (!company) {

        console.error(
            "Delete call failed: company not found"
        );

        return;

    }


    /* =====================================
       DELETE CALL
    ===================================== */

    company.calls =
        (
            company.calls ||
            []
        ).filter(
            call =>
                String(
                    call.id
                ) !==
                String(
                    callId
                )
        );


    /* =====================================
       DELETE LINKED TASKS
       
       Deleting the call deletes its
       associated follow-up history too.
    ===================================== */

    company.tasks =
        (
            company.tasks ||
            []
        ).filter(
            task =>
                !(
                    task.source ===
                    "call"

                    &&

                    String(
                        task.sourceCallId
                    ) ===
                    String(
                        callId
                    )
                )
        );


    /* =====================================
       SAVE
    ===================================== */

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
   SAFE FORM VALUE
========================================= */

function escapeCallField(
    value
) {

    return String(
        value ??
        ""
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
