/* =========================================
   EDIT TASK
========================================= */

function loadEditTask(
    companyId,
    taskId
) {

    const company =
        getCompany(companyId);


    if (!company) {

        console.error(
            "Edit task failed: company not found",
            companyId
        );

        return;

    }


    const tasks =
        Array.isArray(company.tasks)
            ? company.tasks
            : [];


    const task =
        tasks.find(
            t =>
                String(t.id) ===
                String(taskId)
        );


    if (!task) {

        console.error(
            "Edit task failed: task not found",
            taskId
        );

        return;

    }


    const app =
        document.getElementById("app");


    const completed =
        String(
            task.status || ""
        )
        .trim()
        .toLowerCase()
        === "completed";


    app.innerHTML = `

    <div class="dashboard">


        <div class="header">

            <h1>
                Edit Task
            </h1>

            <p class="subtitle">
                ${escapeTaskField(
                    company.companyName
                )}
            </p>

        </div>


        <input
            class="search"
            id="taskTitle"
            placeholder="Task Title"
            value="${escapeTaskField(
                task.title || ""
            )}">


        <input
            class="search"
            id="taskDueDate"
            type="date"
            value="${escapeTaskField(
                task.dueDate || ""
            )}">


        <select
            class="search"
            id="taskPriority">

            <option
                value="Low"
                ${
                    task.priority === "Low"
                        ? "selected"
                        : ""
                }>

                Low

            </option>


            <option
                value="Medium"
                ${
                    task.priority === "Medium"
                        ? "selected"
                        : ""
                }>

                Medium

            </option>


            <option
                value="High"
                ${
                    task.priority === "High"
                        ? "selected"
                        : ""
                }>

                High

            </option>

        </select>


        <select
            class="search"
            id="taskStatus">

            <option
                value="Pending"
                ${
                    !completed
                        ? "selected"
                        : ""
                }>

                Pending

            </option>


            <option
                value="Completed"
                ${
                    completed
                        ? "selected"
                        : ""
                }>

                Completed

            </option>

        </select>


        <textarea
            class="search"
            id="taskNotes"
            style="height:150px;"
            placeholder="Notes">${escapeTaskField(
                task.notes || ""
            )}</textarea>


        ${
            task.source === "call"
                ? `
                <div
                    class="card"
                    style="
                        margin-top:20px;
                        padding:15px;
                    ">

                    <strong>
                        📞 Call Follow-up
                    </strong>

                    <p
                        style="
                            margin-top:8px;
                            opacity:0.7;
                        ">

                        This task is linked to a call.
                        Its due date controls the
                        active call follow-up.

                    </p>

                </div>
                `
                : ""
        }


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
                updateTask(
                    ${companyId},
                    ${taskId}
                )
            ">

            Update Task

        </button>


        <button
            class="search"
            style="margin-top:20px;"
            onclick="
                loadTasks(
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
   UPDATE TASK
========================================= */

function updateTask(
    companyId,
    taskId
) {

    const company =
        getCompany(companyId);


    if (!company) {

        console.error(
            "Update task failed: company not found",
            companyId
        );

        return;

    }


    const tasks =
        Array.isArray(company.tasks)
            ? company.tasks
            : [];


    const task =
        tasks.find(
            t =>
                String(t.id) ===
                String(taskId)
        );


    if (!task) {

        console.error(
            "Update task failed: task not found",
            taskId
        );

        return;

    }


    /* =====================================
       READ FORM
    ===================================== */

    const title =
        document
            .getElementById(
                "taskTitle"
            )
            .value
            .trim();


    const dueDate =
        document
            .getElementById(
                "taskDueDate"
            )
            .value
            .trim();


    const priority =
        document
            .getElementById(
                "taskPriority"
            )
            .value;


    const status =
        document
            .getElementById(
                "taskStatus"
            )
            .value;


    const notes =
        document
            .getElementById(
                "taskNotes"
            )
            .value
            .trim();


    /* =====================================
       VALIDATION
    ===================================== */

    if (!title) {

        alert(
            "Task title is required."
        );

        return;

    }


    if (
        ![
            "Low",
            "Medium",
            "High"
        ].includes(
            priority
        )
    ) {

        alert(
            "Invalid task priority."
        );

        return;

    }


    if (
        ![
            "Pending",
            "Completed"
        ].includes(
            status
        )
    ) {

        alert(
            "Invalid task status."
        );

        return;

    }


    /* =====================================
       UPDATE TASK
    ===================================== */

    task.title =
        title;


    task.dueDate =
        dueDate;


    task.priority =
        priority;


    task.status =
        status;


    task.notes =
        notes;


    /* =====================================
       CALL-LINKED TASK SYNC
    ===================================== */

    if (
        task.source === "call" &&
        task.sourceCallId
    ) {

        const calls =
            Array.isArray(
                company.calls
            )
                ? company.calls
                : [];


        const linkedCall =
            calls.find(
                call =>
                    String(
                        call.id
                    ) ===
                    String(
                        task.sourceCallId
                    )
            );


        if (linkedCall) {

            /*
               The task is the authoritative
               source of active follow-up data.

               Keep call.followUp only as a
               compatibility mirror.
            */

            if (
                status === "Completed"
            ) {

                linkedCall.followUp =
                    "";

            } else {

                linkedCall.followUp =
                    dueDate || "";

            }

        }

    }


    /* =====================================
       SAVE
    ===================================== */

    const saved =
        updateCompany(
            company
        );


    if (!saved) {

        alert(
            "Could not update task."
        );

        return;

    }


    /* =====================================
       RETURN
    ===================================== */

    loadTasks(
        companyId
    );

}


/* =========================================
   ESCAPE FORM VALUES
========================================= */

function escapeTaskField(
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
