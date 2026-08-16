/* =========================================
   GLOBAL CALLS
========================================= */

function loadGlobalCalls() {

    const companies =
        getCompanies();

    const app =
        document.getElementById("app");


    let calls = [];


    /* =====================================
       DATE FORMATTER
    ===================================== */

    function formatDate(
        value
    ) {

        if (!value) {

            return "-";

        }


        const dateString =
            String(value)
                .split("T")[0];


        const parts =
            dateString.split("-");


        if (
            parts.length !== 3
        ) {

            return String(value);

        }


        const year =
            parts[0];

        const month =
            Number(parts[1]);

        const day =
            Number(parts[2]);


        const months = [

            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"

        ];


        if (
            !year ||
            !month ||
            !day ||
            month < 1 ||
            month > 12
        ) {

            return String(value);

        }


        return `
            ${day}
            ${months[month - 1]}
            ${year}
        `;

    }


    /* =====================================
       DATE HELPER
    ===================================== */

    function getDateOnly(
        value
    ) {

        if (!value) {

            return null;

        }


        const date =
            new Date(value);


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
       ESCAPE HTML
    ===================================== */

    function escapeCallText(
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
       COLLECT CALLS
    ===================================== */

    companies.forEach(
        company => {

        const companyCalls =
            Array.isArray(
                company.calls
            )
                ? company.calls
                : [];


        const companyTasks =
            Array.isArray(
                company.tasks
            )
                ? company.tasks
                : [];


        companyCalls.forEach(
            call => {


            /*
               Find the task generated from
               this call.

               The task is now the source
               of truth for the active
               follow-up date.
            */

            const followUpTask =
                companyTasks.find(
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


            calls.push({

                companyId:
                    company.id,

                companyName:
                    company.companyName,

                ...call,


                /*
                   Attach the authoritative
                   follow-up task for display.
                */

                followUpTask:
                    followUpTask || null

            });

        });

    });


    /* =====================================
       SORT
    ===================================== */

    calls.sort(
        (
            a,
            b
        ) => {

            const dateA =
                new Date(
                    a.date ||
                    a.createdAt ||
                    0
                ).getTime();


            const dateB =
                new Date(
                    b.date ||
                    b.createdAt ||
                    0
                ).getTime();


            return dateB - dateA;

        }
    );


    /* =====================================
       CALL CARDS
    ===================================== */

    let callCards =
        "";


    /* =====================================
       EMPTY STATE
    ===================================== */

    if (
        calls.length === 0
    ) {

        callCards = `

        <div class="global-call-empty">

            <div class="global-call-empty-icon">
                ☎
            </div>

            <h2>
                No calls yet
            </h2>

            <p>
                Calls from all your companies
                will appear here.
            </p>

            <button
                class="global-call-empty-button"
                onclick="
                    loadCompanies()
                ">

                <span>
                    +
                </span>

                Log a Call

            </button>

        </div>

        `;

    } else {


        /* =================================
           BUILD CALL CARDS
        ================================= */

        calls.forEach(
            call => {


            /* =============================
               AUTHORITATIVE FOLLOW-UP
            ============================= */

            const followUpTask =
                call.followUpTask;


            const followUpDate =
                followUpTask &&
                followUpTask.status !==
                "Completed"

                    ?

                followUpTask.dueDate

                    :

                null;


            let followUpHTML = "";


            if (
                followUpDate
            ) {

                const date =
                    getDateOnly(
                        followUpDate
                    );


                if (!date) {

                    followUpHTML = `

                    <strong
                        class="followup-status none">

                        <i></i>

                        Invalid follow-up date

                    </strong>

                    `;

                } else if (
                    date < today
                ) {

                    followUpHTML = `

                    <strong
                        class="
                            followup-status
                            overdue
                        ">

                        <i></i>

                        Overdue ·
                        ${formatDate(
                            followUpDate
                        )}

                    </strong>

                    `;

                } else if (
                    date.getTime() ===
                    today.getTime()
                ) {

                    followUpHTML = `

                    <strong
                        class="
                            followup-status
                            today
                        ">

                        <i></i>

                        Due Today

                    </strong>

                    `;

                } else {

                    followUpHTML = `

                    <strong
                        class="
                            followup-status
                            scheduled
                        ">

                        <i></i>

                        Scheduled ·
                        ${formatDate(
                            followUpDate
                        )}

                    </strong>

                    `;

                }

            } else {

                followUpHTML = `

                <strong
                    class="
                        followup-status
                        none
                    ">

                    <i></i>

                    No follow-up

                </strong>

                `;

            }


            /* =============================
               CALL DETAILS
            ============================= */

            const companyName =
                escapeCallText(
                    call.companyName ||
                    "Unnamed Company"
                );


            const callType =
                escapeCallText(
                    call.type ||
                    "Call"
                );


            const outcome =
                escapeCallText(
                    call.outcome ||
                    "-"
                );


            const notes =
                escapeCallText(
                    call.notes ||
                    "No notes added."
                );


            /* =============================
               CARD
            ============================= */

            callCards += `

            <div
                class="global-call-card">


                <!-- TOP -->

                <div
                    class="
                        global-call-card-top
                    ">


                    <div
                        class="
                            global-call-company
                        ">


                        <div
                            class="
                                global-call-company-icon
                            ">

                            ☎

                        </div>


                        <div>

                            <h3>
                                ${companyName}
                            </h3>


                            <span
                                class="
                                    global-call-type
                                ">

                                ${callType}

                            </span>

                        </div>

                    </div>


                    <div
                        class="
                            global-call-outcome
                        ">

                        ${outcome}

                    </div>

                </div>


                <!-- DETAILS -->

                <div
                    class="
                        global-call-details
                    ">


                    <div
                        class="
                            global-call-detail
                        ">

                        <span>
                            DATE
                        </span>

                        <strong>
                            ${formatDate(
                                call.date
                            )}
                        </strong>

                    </div>


                    <div
                        class="
                            global-call-detail
                        ">

                        <span>
                            TIME
                        </span>

                        <strong>
                            ${
                                escapeCallText(
                                    call.time ||
                                    "-"
                                )
                            }
                        </strong>

                    </div>


                    <div
                        class="
                            global-call-detail
                        ">

                        <span>
                            DURATION
                        </span>

                        <strong>
                            ${
                                Number(
                                    call.duration || 0
                                )
                            }
                            min
                        </strong>

                    </div>

                </div>


                <!-- NOTES -->

                <div
                    class="
                        global-call-notes
                    ">

                    <span>
                        NOTES
                    </span>

                    <p>
                        ${notes}
                    </p>

                </div>


                <!-- FOOTER -->

                <div
                    class="
                        global-call-footer
                    ">


                    <div
                        class="
                            global-call-followup
                        ">

                        <span>
                            FOLLOW-UP
                        </span>

                        ${followUpHTML}

                    </div>


                    <button
                        class="
                            global-call-open
                        "
                        onclick="
                            loadCompany(
                                ${call.companyId}
                            )
                        ">

                        Open Company

                        <span>
                            →
                        </span>

                    </button>


                </div>


            </div>

            `;

        });

    }


    /* =====================================
       PAGE
    ===================================== */

    app.innerHTML = `

    <div class="dashboard">


        <div
            class="
                global-calls-header
            ">


            <div
                class="
                    global-calls-icon
                ">

                ☎

            </div>


            <div>

                <p
                    class="
                        global-calls-label
                    ">

                    COMMUNICATION

                </p>


                <h1>
                    All Calls
                </h1>


                <p
                    class="
                        global-calls-count
                    ">

                    ${calls.length}

                    ${
                        calls.length === 1
                            ? "Call"
                            : "Calls"
                    }

                    Logged

                </p>

            </div>

        </div>


        ${callCards}


        ${bottomNav("calls")}


    </div>

    `;

}
