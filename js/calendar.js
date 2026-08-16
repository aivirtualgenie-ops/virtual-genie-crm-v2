/* =========================================
   CALENDAR
========================================= */

function loadCalendar() {

    const companies =
        getCompanies();

    const app =
        document.getElementById("app");


    let events = [];


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

    function getEventDate(
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

        const date =
            getEventDate(
                dateString
            );


        if (!date) {

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


    /* =====================================
       PROCESS COMPANIES
       
       TASKS ARE THE ONLY SOURCE OF
       ACTIVE CALENDAR EVENTS.
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
               COMPLETED TASKS
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


            /* =============================
               NO DATE
            ============================= */

            if (
                !task.dueDate
            ) {

                return;

            }


            /* =============================
               INVALID DATE
            ============================= */

            const eventDate =
                getEventDate(
                    task.dueDate
                );


            if (!eventDate) {

                return;

            }


            /* =============================
               CALL FOLLOW-UP
            ============================= */

            const isCallFollowUp =
                task.source === "call";


            events.push({

                type:
                    isCallFollowUp
                        ? "Call Follow-up"
                        : "Task",

                date:
                    task.dueDate,

                company:
                    company.companyName ||
                    "Unnamed Company",

                description:
                    task.title ||
                    (
                        isCallFollowUp
                            ? "Follow up after call"
                            : "Untitled Task"
                    ),

                priority:
                    task.priority ||
                    "Medium",

                companyId:
                    companyId,

                source:
                    isCallFollowUp
                        ? "call-followup"
                        : "task",

                taskId:
                    task.id

            });

        });


        /*
           IMPORTANT:

           Do NOT process:

               company.nextFollowUp

           Do NOT process:

               company.calls[].followUp

           Call follow-ups are represented by
           their linked task.

           This prevents duplicate calendar
           events and stale legacy dates.
        */

    });


    /* =====================================
       SORT
       
       Earliest first.
    ===================================== */

    events.sort(
        (
            a,
            b
        ) => {

            const dateA =
                getEventDate(
                    a.date
                );


            const dateB =
                getEventDate(
                    b.date
                );


            if (!dateA) {

                return 1;

            }


            if (!dateB) {

                return -1;

            }


            return (
                dateA.getTime() -
                dateB.getTime()
            );

        }
    );


    /* =====================================
       BUILD EVENT CARDS
    ===================================== */

    let eventCards =
        "";


    if (
        events.length === 0
    ) {

        eventCards = `

        <div class="card">

            <h3>
                No Upcoming Events
            </h3>

            <p>
                Your calendar is currently empty.
            </p>

        </div>

        `;

    } else {

        events.forEach(
            event => {

            const eventDate =
                getEventDate(
                    event.date
                );


            if (!eventDate) {

                return;

            }


            /* =============================
               STATUS
            ============================= */

            let status =
                "upcoming";

            let statusText =
                "Upcoming";

            let statusIcon =
                "🟡";


            if (
                eventDate < today
            ) {

                status =
                    "overdue";

                statusText =
                    "Overdue";

                statusIcon =
                    "🔴";


            } else if (
                eventDate.getTime() ===
                today.getTime()
            ) {

                status =
                    "today";

                statusText =
                    "Today";

                statusIcon =
                    "🟢";

            }


            /* =============================
               PRIORITY
            ============================= */

            let priorityIcon =
                "⚪";


            if (
                event.priority ===
                "High"
            ) {

                priorityIcon =
                    "🔴";


            } else if (
                event.priority ===
                "Medium"
            ) {

                priorityIcon =
                    "🟡";


            } else if (
                event.priority ===
                "Low"
            ) {

                priorityIcon =
                    "🟢";

            }


            /* =============================
               SOURCE ICON
            ============================= */

            const sourceIcon =
                event.source ===
                "call-followup"
                    ? "📞"
                    : "📋";


            /* =============================
               CLICK ACTION
               
               Go directly to Tasks because
               the calendar event originates
               from a task.
            ============================= */

            const clickAction =
                `loadTasks(${event.companyId})`;


            /* =============================
               EVENT CARD
            ============================= */

            eventCards += `

            <div
                class="
                    card
                    calendar-event
                    ${status}
                "
                style="
                    margin-top:20px;
                    cursor:pointer;
                "
                onclick="
                    ${clickAction}
                ">


                <h3>

                    ${sourceIcon}

                    ${escapeCalendarText(
                        event.type
                    )}

                </h3>


                <p>

                    <strong>
                        Status:
                    </strong>

                    ${statusIcon}

                    ${statusText}

                </p>


                <p>

                    <strong>
                        Date:
                    </strong>

                    ${formatDate(
                        event.date
                    )}

                </p>


                <p>

                    <strong>
                        Company:
                    </strong>

                    ${escapeCalendarText(
                        event.company
                    )}

                </p>


                <p>

                    <strong>
                        Details:
                    </strong>

                    ${escapeCalendarText(
                        event.description
                    )}

                </p>


                <p>

                    <strong>
                        Priority:
                    </strong>

                    ${priorityIcon}

                    ${escapeCalendarText(
                        event.priority
                    )}

                </p>


                <p
                    style="
                        margin-top:15px;
                        font-size:14px;
                        opacity:0.7;
                    ">

                    Tap to open tasks

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
                Calendar
            </h1>

            <p class="subtitle">
                Follow-ups, tasks and call reminders
            </p>

        </div>


        <div class="card">

            <p>

                <strong>
                    Total Events:
                </strong>

                ${events.length}

            </p>

        </div>


        ${eventCards}


        ${bottomNav("calendar")}


    </div>

    `;

}


/* =========================================
   ESCAPE CALENDAR TEXT
========================================= */

function escapeCalendarText(
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
