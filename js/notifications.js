/* =========================================
   NOTIFICATIONS
========================================= */

function loadNotifications() {

    const companies =
        getCompanies();

    const app =
        document.getElementById("app");


    let notifications = [];


    /* =====================================
       TODAY
    ===================================== */

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

    function getDateOnly(
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
       DATE DIFFERENCE
    ===================================== */

    function getDifference(
        dateString
    ) {

        const date =
            getDateOnly(
                dateString
            );


        if (!date) {

            return null;

        }


        return Math.round(
            (
                date.getTime() -
                today.getTime()
            ) /
            (
                1000 *
                60 *
                60 *
                24
            )
        );

    }


    /* =====================================
       ADD NOTIFICATION
    ===================================== */

    function addNotification(
        type,
        company,
        details,
        priority,
        companyId,
        difference,
        source,
        taskId,
        dueDate
    ) {

        notifications.push({

            type,

            company,

            details,

            priority,

            companyId,

            difference,

            source,

            taskId,

            dueDate

        });

    }


    /* =====================================
       PROCESS COMPANIES
       
       IMPORTANT:
       Tasks are the ONLY source of
       actionable notification data.
    ===================================== */

    companies.forEach(
        company => {


        const companyId =
            company.id;


        const tasks =
            Array.isArray(
                company.tasks
            )
                ? company.tasks
                : [];


        tasks.forEach(
            task => {


            /* =============================
               COMPLETED / INVALID
            ============================= */

            if (
                String(
                    task.status || ""
                )
                .trim()
                .toLowerCase()
                === "completed"
            ) {

                return;

            }


            if (
                !task.dueDate
            ) {

                return;

            }


            const difference =
                getDifference(
                    task.dueDate
                );


            if (
                difference === null
            ) {

                return;

            }


            /*
               Notifications only show
               overdue, today and the next
               7 days.
            */

            if (
                difference > 7
            ) {

                return;

            }


            /* =============================
               TASK TYPE
            ============================= */

            const isCallFollowUp =
                task.source === "call";


            const taskTitle =
                task.title ||
                (
                    isCallFollowUp
                        ? "Follow up after call"
                        : "Untitled Task"
                );


            /* =============================
               NOTIFICATION TYPE
            ============================= */

            let type;


            if (
                difference < 0
            ) {

                type =
                    isCallFollowUp
                        ? "Overdue Call Follow-up"
                        : "Overdue Task";


            } else if (
                difference === 0
            ) {

                type =
                    isCallFollowUp
                        ? "Call Follow-up Today"
                        : "Task Due Today";


            } else {

                type =
                    isCallFollowUp
                        ? "Upcoming Call Follow-up"
                        : "Upcoming Task";

            }


            /* =============================
               PRIORITY
            ============================= */

            const priority =
                task.priority ||
                "Medium";


            /* =============================
               SOURCE
            ============================= */

            const source =
                isCallFollowUp
                    ? "call-followup"
                    : "task";


            /* =============================
               ADD
            ============================= */

            addNotification(

                type,

                company.companyName ||
                    "Unnamed Company",

                taskTitle,

                priority,

                companyId,

                difference,

                source,

                task.id,

                task.dueDate

            );

        });

    });


    /* =====================================
       SORT
       
       Overdue first,
       then today,
       then upcoming.
    ===================================== */

    notifications.sort(
        (
            a,
            b
        ) => {

            if (
                a.difference !==
                b.difference
            ) {

                return (
                    a.difference -
                    b.difference
                );

            }


            return String(
                a.company
            ).localeCompare(
                String(
                    b.company
                )
            );

        }
    );


    /* =====================================
       BUILD CARDS
    ===================================== */

    let notificationCards =
        "";


    if (
        notifications.length === 0
    ) {

        notificationCards = `

        <div class="card">

            <h3>
                You're all caught up 🎉
            </h3>

            <p>
                No upcoming or overdue
                notifications.
            </p>

        </div>

        `;

    } else {

        notifications.forEach(
            notification => {


            /* =============================
               STATUS
            ============================= */

            let icon =
                "🟡";

            let status =
                "Upcoming";


            if (
                notification.difference < 0
            ) {

                icon =
                    "🔴";

                status =
                    "Overdue";


            } else if (
                notification.difference === 0
            ) {

                icon =
                    "🟢";

                status =
                    "Today";

            }


            /* =============================
               PRIORITY ICON
            ============================= */

            let priorityIcon =
                "⚪";


            if (
                notification.priority ===
                "High"
            ) {

                priorityIcon =
                    "🔴";


            } else if (
                notification.priority ===
                "Medium"
            ) {

                priorityIcon =
                    "🟡";


            } else if (
                notification.priority ===
                "Low"
            ) {

                priorityIcon =
                    "🟢";

            }


            /* =============================
               SOURCE ICON
            ============================= */

            const sourceIcon =
                notification.source ===
                "call-followup"
                    ? "📞"
                    : "📋";


            /* =============================
               TARGET
               
               If a task exists, take the
               user directly to the task
               list. Otherwise company.
            ============================= */

            const target =
                notification.taskId
                    ? `
                        loadTasks(
                            ${notification.companyId}
                        )
                      `
                    : `
                        loadCompany(
                            ${notification.companyId}
                        )
                      `;


            notificationCards += `

            <div
                class="card"
                style="
                    margin-top:20px;
                    cursor:pointer;
                "
                onclick="
                    ${target}
                ">


                <h3>

                    ${sourceIcon}

                    ${escapeNotificationText(
                        notification.type
                    )}

                </h3>


                <p>

                    <strong>
                        Status:
                    </strong>

                    ${icon}

                    ${status}

                </p>


                <p>

                    <strong>
                        Company:
                    </strong>

                    ${escapeNotificationText(
                        notification.company
                    )}

                </p>


                <p>

                    <strong>
                        Details:
                    </strong>

                    ${escapeNotificationText(
                        notification.details
                    )}

                </p>


                <p>

                    <strong>
                        Priority:
                    </strong>

                    ${priorityIcon}

                    ${escapeNotificationText(
                        notification.priority
                    )}

                </p>


                <p>

                    <strong>
                        Due:
                    </strong>

                    ${formatNotificationDate(
                        notification.dueDate
                    )}

                </p>


                <p
                    style="
                        margin-top:15px;
                        font-size:14px;
                        opacity:0.7;
                    ">

                    Tap to open task

                </p>

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
                Notifications
            </h1>

            <p class="subtitle">
                Follow-ups, tasks and reminders
            </p>

        </div>


        <div class="card">

            <p>

                <strong>
                    Total Notifications:
                </strong>

                ${notifications.length}

            </p>

        </div>


        ${notificationCards}


        ${bottomNav("notifications")}


    </div>

    `;

}


/* =========================================
   FORMAT DATE
========================================= */

function formatNotificationDate(
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
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================
   ESCAPE TEXT
========================================= */

function escapeNotificationText(
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
