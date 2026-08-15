/* =========================================
   DASHBOARD
========================================= */

function loadDashboard() {

    const companies = getCompanies();

    const app =
        document.getElementById("app");


    /* =====================================
       BASIC SALES METRICS
    ===================================== */

    let totalProducts = 0;
    let totalPipeline = 0;
    let totalRevenue = 0;

    let totalCalls = 0;

    let pendingTasks = 0;
    let completedTasks = 0;
    let overdueTasks = 0;

    let overdueFollowUps = 0;
    let todayFollowUps = 0;
    let upcomingFollowUps = 0;


    /* =====================================
       PIPELINE METRICS
    ===================================== */

    let newLeads = 0;
    let contacted = 0;
    let meetings = 0;
    let proposals = 0;
    let negotiations = 0;
    let won = 0;
    let lost = 0;


    /* =====================================
       TODAY
    ===================================== */

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    /* =====================================
       PROCESS COMPANIES
    ===================================== */

    companies.forEach(company => {


        /* ================================
           PRODUCTS
        ================================= */

        totalProducts +=
            (company.products || []).length;


        /* ================================
           SALES VALUES
        ================================= */

        totalPipeline +=
            Number(company.pipelineValue || 0);

        totalRevenue +=
            Number(company.revenue || 0);


        /* ================================
           PIPELINE
        ================================= */

        const stage =
            company.pipelineStage || "New Lead";


        switch (stage) {

            case "New Lead":
                newLeads++;
                break;

            case "Contacted":
                contacted++;
                break;

            case "Meeting Scheduled":
                meetings++;
                break;

            case "Proposal Sent":
                proposals++;
                break;

            case "Negotiation":
                negotiations++;
                break;

            case "Won":
                won++;
                break;

            case "Lost":
                lost++;
                break;

        }


        /* ================================
           COMPANY FOLLOW-UP
        ================================= */

        if (company.nextFollowUp) {

            const followUpDate =
                new Date(company.nextFollowUp);

            followUpDate.setHours(
                0,
                0,
                0,
                0
            );


            if (followUpDate < today) {

                overdueFollowUps++;

            } else if (
                followUpDate.getTime() ===
                today.getTime()
            ) {

                todayFollowUps++;

            } else {

                upcomingFollowUps++;

            }

        }


        /* ================================
           CALLS
        ================================= */

        const companyCalls =
            company.calls || [];


        totalCalls +=
            companyCalls.length;


        /* ================================
           CALL FOLLOW-UPS
        ================================= */

        companyCalls.forEach(call => {

            if (!call.followUp) {

                return;

            }


            const callFollowUpDate =
                new Date(call.followUp);

            callFollowUpDate.setHours(
                0,
                0,
                0,
                0
            );


            if (callFollowUpDate < today) {

                overdueFollowUps++;

            } else if (
                callFollowUpDate.getTime() ===
                today.getTime()
            ) {

                todayFollowUps++;

            } else {

                upcomingFollowUps++;

            }

        });


        /* ================================
           TASKS
        ================================= */

        (company.tasks || []).forEach(task => {

            if (
                task.status ===
                "Completed"
            ) {

                completedTasks++;

                return;

            }


            pendingTasks++;


            if (task.dueDate) {

                const dueDate =
                    new Date(task.dueDate);

                dueDate.setHours(
                    0,
                    0,
                    0,
                    0
                );


                if (dueDate < today) {

                    overdueTasks++;

                }

            }

        });

    });


    /* =====================================
       TOTAL ATTENTION ITEMS
    ===================================== */

    const attentionCount =
        overdueTasks +
        overdueFollowUps +
        todayFollowUps +
        upcomingFollowUps;


    /* =====================================
       DASHBOARD
    ===================================== */

    app.innerHTML = `

    <div class="dashboard">


        <!-- HEADER -->

        <div class="header">

            <p class="greeting">
                Good Evening 👋
            </p>

            <h1>
                Virtual Genie CRM
            </h1>

            <p class="subtitle">
                Your Business Operating System
            </p>


            <input
                class="search"
                id="dashboardSearch"
                placeholder="Search companies..."
                oninput="dashboardSearchCompanies(this.value)">

        </div>


        <!-- PRIMARY STATS -->

        <div class="stats">

            <div class="stats-grid">


                <!-- COMPANIES -->

                <div
                    class="card"
                    style="cursor:pointer;"
                    onclick="location.hash='companies'">

                    <p>
                        Companies
                    </p>

                    <h2>
                        ${companies.length}
                    </h2>

                </div>


                <!-- PIPELINE -->

                <div
                    class="card"
                    style="cursor:pointer;"
                    onclick="location.hash='pipeline'">

                    <p>
                        Pipeline
                    </p>

                    <h2>
                        ₹${totalPipeline}
                    </h2>

                </div>


                <!-- REVENUE -->

                <div
                    class="card"
                    style="cursor:pointer;"
                    onclick="location.hash='analytics'">

                    <p>
                        Revenue
                    </p>

                    <h2>
                        ₹${totalRevenue}
                    </h2>

                </div>


                <!-- PRODUCTS -->

                <div
                    class="card"
                    style="cursor:pointer;"
                    onclick="loadGlobalProducts()">

                    <p>
                        Products
                    </p>

                    <h2>
                        ${totalProducts}
                    </h2>

                </div>

            </div>


            <!-- CRM SUMMARY -->

            <div
                class="card"
                style="margin-top:20px;">

                <h3>
                    CRM Summary
                </h3>

                <br>

                <p>
                    <strong>
                        Total Companies:
                    </strong>

                    ${companies.length}

                </p>

                <p>
                    <strong>
                        Total Calls:
                    </strong>

                    ${totalCalls}

                </p>

                <p>
                    <strong>
                        Pending Tasks:
                    </strong>

                    ${pendingTasks}

                </p>

                <p>
                    <strong>
                        Completed Tasks:
                    </strong>

                    ${completedTasks}

                </p>

                <p>
                    <strong>
                        Total Products:
                    </strong>

                    ${totalProducts}

                </p>

            </div>


            <!-- PIPELINE SUMMARY -->

            <div
                class="card"
                style="margin-top:20px;">

                <h3>
                    Pipeline
                </h3>

                <br>

                <p>
                    🆕 New Leads:
                    ${newLeads}
                </p>

                <p>
                    📞 Contacted:
                    ${contacted}
                </p>

                <p>
                    📅 Meetings:
                    ${meetings}
                </p>

                <p>
                    📄 Proposals:
                    ${proposals}
                </p>

                <p>
                    🤝 Negotiations:
                    ${negotiations}
                </p>

                <p>
                    🏆 Won:
                    ${won}
                </p>

                <p>
                    ❌ Lost:
                    ${lost}
                </p>

            </div>


            <!-- ATTENTION -->

            <div
                class="card"
                style="margin-top:20px;">

                <h3>
                    Attention
                </h3>

                <br>

                <p
                    style="cursor:pointer;"
                    onclick="location.hash='notifications'">

                    🔴 Overdue Tasks:
                    ${overdueTasks}

                </p>

                <p
                    style="cursor:pointer;"
                    onclick="location.hash='notifications'">

                    🔴 Overdue Follow-ups:
                    ${overdueFollowUps}

                </p>

                <p
                    style="cursor:pointer;"
                    onclick="location.hash='notifications'">

                    🟢 Follow-ups Today:
                    ${todayFollowUps}

                </p>

                <p
                    style="cursor:pointer;"
                    onclick="location.hash='calendar'">

                    🟡 Upcoming Follow-ups:
                    ${upcomingFollowUps}

                </p>

                <br>

                <p>
                    <strong>
                        Total Attention Items:
                    </strong>

                    ${attentionCount}

                </p>

            </div>

<!-- QUICK ACCESS -->

<div
    class="card quick-access-card"
    style="margin-top:20px;">

    <div class="quick-access-header">

        <div>
            <h3>Quick Access</h3>

            <p>
                Jump to your most-used tools
            </p>
        </div>

        <span class="quick-access-badge">
            4
        </span>

    </div>


    <div class="quick-access-grid">


        <!-- PIPELINE -->

        <button
            class="quick-action"
            onclick="location.hash='pipeline'">

            <span class="quick-action-icon pipeline-icon">
                📈
            </span>

            <span class="quick-action-content">

                <strong>
                    Sales Pipeline
                </strong>

                <small>
                    Manage opportunities
                </small>

            </span>

            <span class="quick-action-arrow">
                →
            </span>

        </button>


        <!-- CALENDAR -->

        <button
            class="quick-action"
            onclick="location.hash='calendar'">

            <span class="quick-action-icon calendar-icon">
                📅
            </span>

            <span class="quick-action-content">

                <strong>
                    Calendar
                </strong>

                <small>
                    View your schedule
                </small>

            </span>

            <span class="quick-action-arrow">
                →
            </span>

        </button>


        <!-- NOTIFICATIONS -->

        <button
            class="quick-action"
            onclick="location.hash='notifications'">

            <span class="quick-action-icon notification-icon">
                🔔
            </span>

            <span class="quick-action-content">

                <strong>
                    Notifications
                </strong>

                <small>
                    Follow-ups & reminders
                </small>

            </span>

            <span class="quick-action-arrow">
                →
            </span>

        </button>


        <!-- ANALYTICS -->

        <button
            class="quick-action"
            onclick="location.hash='analytics'">

            <span class="quick-action-icon analytics-icon">
                📊
            </span>

            <span class="quick-action-content">

                <strong>
                    Analytics
                </strong>

                <small>
                    View performance
                </small>

            </span>

            <span class="quick-action-arrow">
                →
            </span>

        </button>

    </div>

</div>

        </div>


        <!-- ADD COMPANY -->

        <button
            class="fab"
            onclick="location.hash='add-company'">

            +

        </button>


        ${bottomNav("dashboard")}

    </div>

    `;

}


/* =========================================
   DASHBOARD SEARCH
========================================= */

function dashboardSearchCompanies(
    searchText
) {

    if (!searchText) {

        loadDashboard();

        return;

    }

    loadCompanies(searchText);

}
