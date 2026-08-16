/* =========================================
   COMPANY TASKS
========================================= */

function loadTasks(companyId) {

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
       READ TASKS
       
       Do not mutate storage just because
       the page is opened.
    ===================================== */

    const tasks =
        Array.isArray(
            company.tasks
        )
            ? company.tasks
            : [];


    let completed = 0;

    let pending = 0;

    let overdue = 0;


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    /* =====================================
       DATE HELPER
    ===================================== */

    function getTaskDate(
        dateString
    ) {

        if (!dateString) {

            return null;

        }


        const date =
            new Date(
                dateString
            );


        if (
            isNaN(
                date.getTime()
            )
        ) {

            return null;

        }


        date.setHours(
            0,
            0,
            0,
            0
        );


        return date;

    }


    /* =====================================
       FORMAT DATE
    ===================================== */

    function formatDate(
        dateString
    ) {

        if (!dateString) {

            return "-";

        }


        const date =
            new Date(
                dateString
            );


        if (
            isNaN(
                date.getTime()
            )
        ) {

            return "-";

        }


        return date.toLocaleDateString(
            "en-IN",
            {
                day:
                    "numeric",

                month:
                    "short",

                year:
                    "numeric"

            }
        );

    }


    /* =====================================
       ESCAPE HTML
    ===================================== */

    function escapeTaskText(
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
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

    }


    /* =====================================
       STATUS HELPER
    ===================================== */

    function isCompleted(
        task
    ) {

        return (
            String(
                task.status ||
                ""
            )
            .trim()
            .toLowerCase()
            === "completed"
        );

    }


    /* =====================================
       COUNT TASKS
    ===================================== */

    tasks.forEach(
        task => {

        if (
            isCompleted(
                task
            )
        ) {

            completed++;

            return;

        }


        pending++;


        if (
            !task.dueDate
        ) {

            return;

        }


        const dueDate =
            getTaskDate(
                task.dueDate
            );


        if (
            dueDate &&
            dueDate < today
        ) {

            overdue++;

        }

    });


    /* =====================================
       BUILD TASK CARDS
    ===================================== */

    let taskCards =
        "";


    if (
        tasks.length === 0
    ) {

        taskCards = `

        <div class="card">

            <h3>
                No Tasks Yet
            </h3>

            <p>
                Create your first follow-up task.
            </p>

        </div>

        `;

    } else {

        tasks.forEach(
            task => {

            const completedTask =
                isCompleted(
                    task
                );


            let statusIcon =
                "🟡";


            let statusText =
                "Pending";


            let statusClass =
                "upcoming";


            /* =============================
               COMPLETED
            ============================= */

            if (
                completedTask
            ) {

                statusIcon =
                    "✅";

                statusText =
                    "Completed";

                statusClass =
                    "completed";

            }


            /* =============================
               PENDING
            ============================= */

            else if (
                task.dueDate
            ) {

                const dueDate =
                    getTaskDate(
                        task.dueDate
                    );


                if (
                    dueDate &&
                    dueDate < today
                ) {

                    statusIcon =
                        "🔴";

                    statusText =
                        "Overdue";

                    statusClass =
                        "overdue";

                } else if (
                    dueDate &&
                    dueDate.getTime() ===
                    today.getTime()
                ) {

                    statusIcon =
                        "🟢";

                    statusText =
                        "Due Today";

                    statusClass =
                        "today";

                } else {

                    statusIcon =
                        "🟡";

                    statusText =
                        "Upcoming";

                    statusClass =
                        "upcoming";

                }

            }


            /* =============================
               PRIORITY
            ============================= */

            const priority =
                task.priority ||
                "Medium";


            let priorityIcon =
                "⚪";


            if (
                priority === "High"
            ) {

                priorityIcon =
                    "🔴";

            } else if (
                priority === "Medium"
            ) {

                priorityIcon =
                    "🟡";

            } else if (
                priority === "Low"
            ) {

                priorityIcon =
                    "🟢";

            }


            /* =============================
               CALL LINK
            ============================= */

            const isCallTask =
                task.source === "call";


            const callLabel =
                isCallTask
                    ? `

                    <p>

                        <strong>
                            Source:
                        </strong>

                        📞 Call Follow-up

                    </p>

                    `
                    : "";


            /* =============================
               SAFE VALUES
            ============================= */

            const title =
                escapeTaskText(
                    task.title ||
                    "Untitled Task"
                );


            const safeStatus =
                escapeTaskText(
                    statusText
                );


            const safePriority =
                escapeTaskText(
                    priority
                );


            const notes =
                escapeTaskText(
                    task.notes ||
                    "No notes."
                );


            /* =============================
               TASK CARD
            ============================= */

            taskCards += `

            <div
                class="
                    card
                    ${statusClass}
                "
                style="
                    margin-top:20px;
                ">

                <h3>

                    ${statusIcon}

                    ${title}

                </h3>


                <p>

                    <strong>
                        Status:
                    </strong>

                    ${safeStatus}

                </p>


                <p>

                    <strong>
                        Due:
                    </strong>

                    ${formatDate(
                        task.dueDate
                    )}

                </p>


                <p>

                    <strong>
                        Priority:
                    </strong>

                    ${priorityIcon}

                    ${safePriority}

                </p>


                ${callLabel}


                <br>


                <p>
                    ${notes}
                </p>


                <br>


                <button
                    class="search"
                    onclick="
                        loadEditTask(
                            ${company.id},
                            ${task.id}
                        )
                    ">

                    ✏️ Edit

                </button>


                <br>
                <br>


                <button
                    class="search"
                    onclick="
                        deleteTaskConfirm(
                            ${company.id},
                            ${task.id}
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

        <div class="header">

            <h1>
                Tasks
            </h1>

            <p class="subtitle">
                ${escapeTaskText(
                    company.companyName
                )}
            </p>

        </div>


        <!-- TASK SUMMARY -->

        <div class="card">

            <p>

                <strong>
                    Total Tasks:
                </strong>

                ${tasks.length}

            </p>


            <p>

                <strong>
                    Pending:
                </strong>

                ${pending}

            </p>


            <p>

                <strong>
                    Completed:
                </strong>

                ${completed}

            </p>


            <p>

                <strong>
                    Overdue:
                </strong>

                ${overdue}

            </p>

        </div>


        ${taskCards}


        <!-- ADD TASK -->

        <button
            class="fab"
            onclick="
                loadAddTask(
                    ${company.id}
                )
            ">

            +

        </button>


        <!-- BACK -->

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


        ${bottomNav("companies")}

    </div>

    `;

}


/* =========================================
   DELETE TASK
========================================= */

function deleteTaskConfirm(
    companyId,
    taskId
) {

    const confirmed =
        confirm(
            "Delete this task?"
        );


    if (!confirmed) {

        return;

    }


    const company =
        getCompany(
            companyId
        );


    if (!company) {

        alert(
            "Company not found."
        );

        return;

    }


    const tasks =
        Array.isArray(
            company.tasks
        )
            ? company.tasks
            : [];


    const task =
        tasks.find(
            item =>
                String(
                    item.id
                ) ===
                String(
                    taskId
                )
        );


    if (!task) {

        alert(
            "Task not found."
        );

        return;

    }


    /* =====================================
       CALL-GENERATED TASK
       
       Clear the legacy mirror on the call,
       but the task itself remains the
       authoritative follow-up record.
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

            linkedCall.followUp =
                "";

        }

    }


    /* =====================================
       DELETE THROUGH STORAGE
    ===================================== */

    const deleted =
        deleteTask(
            companyId,
            taskId
        );


    if (!deleted) {

        alert(
            "Could not delete task."
        );

        return;

    }


    /* =====================================
       RELOAD
    ===================================== */

    loadTasks(
        companyId
    );

            }
