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
       INITIALIZE
    ===================================== */

    if (!Array.isArray(company.tasks)) {

        company.tasks = [];

        updateCompany(company);

    }


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
            new Date(dateString);

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
            new Date(dateString);

        if (
            isNaN(
                date.getTime()
            )
        ) {

            return dateString;

        }

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

    }


    /* =====================================
       COUNT TASKS
    ===================================== */

    company.tasks.forEach(
        task => {

        if (
            task.status ===
            "Completed"
        ) {

            completed++;

            return;

        }


        pending++;


        if (task.dueDate) {

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

        }

    });


    /* =====================================
       BUILD TASK CARDS
    ===================================== */

    let taskCards = "";


    if (
        company.tasks.length === 0
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

        company.tasks.forEach(
            task => {

            let statusIcon =
                "🟡";

            let statusText =
                task.status ||
                "Pending";

            let statusClass =
                "upcoming";


            /* =============================
               COMPLETED
            ============================= */

            if (
                task.status ===
                "Completed"
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

            let priorityIcon =
                "⚪";


            if (
                task.priority ===
                "High"
            ) {

                priorityIcon =
                    "🔴";

            } else if (
                task.priority ===
                "Medium"
            ) {

                priorityIcon =
                    "🟡";

            } else if (
                task.priority ===
                "Low"
            ) {

                priorityIcon =
                    "🟢";

            }


            /* =============================
               CALL LINK
            ============================= */

            const callLabel =
                task.source === "call"
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

                    ${
                        task.title ||
                        "Untitled Task"
                    }

                </h3>


                <p>

                    <strong>
                        Status:
                    </strong>

                    ${statusText}

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

                    ${
                        task.priority ||
                        "Medium"
                    }

                </p>


                ${callLabel}


                <br>


                <p>
                    ${
                        task.notes ||
                        "No notes."
                    }
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
                ${company.companyName}
            </p>

        </div>


        <!-- TASK SUMMARY -->

        <div class="card">

            <p>
                <strong>
                    Total Tasks:
                </strong>

                ${company.tasks.length}

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
        getCompany(companyId);


    if (!company) {

        alert(
            "Company not found."
        );

        return;

    }


    const task =
        (company.tasks || []).find(
            item =>
                String(item.id) ===
                String(taskId)
        );


    if (!task) {

        alert(
            "Task not found."
        );

        return;

    }


    /* =====================================
       CALL-GENERATED TASK
       CLEAR LINKED CALL FOLLOW-UP
    ===================================== */

    if (
        task.source === "call" &&
        task.sourceCallId
    ) {

        const linkedCall =
            (company.calls || []).find(
                call =>
                    String(call.id) ===
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
       DELETE TASK
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
