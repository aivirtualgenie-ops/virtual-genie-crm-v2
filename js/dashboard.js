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
           SALES VALUES — FROM DEALS
        ================================= */

        const companyDeals =
            company.deals || [];


        companyDeals.forEach(deal => {

            const value =
                Number(deal.value || 0);


            /*
               STATUS IS THE ONLY
               FINANCIAL SOURCE OF TRUTH.

               Open → Pipeline
               Won  → Revenue
               Lost → Neither
            */

            const status =
                String(
                    deal.status || "Open"
                )
                .trim()
                .toLowerCase();


            /* ==============================
               WON → REVENUE
            ============================== */

            if (status === "won") {

                totalRevenue += value;

                return;

            }


            /* ==============================
               LOST → NOTHING
            ============================== */

            if (status === "lost") {

                return;

            }


            /* ==============================
               OPEN → PIPELINE
            ============================== */

            totalPipeline += value;

        });


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

            <div class="brand-reveal">

                <div
                    class="brand-particles"
                    aria-hidden="true">

                    <span>✦</span>
                    <span>·</span>
                    <span>✧</span>
                    <span>·</span>
                    <span>✦</span>
                    <span>·</span>
                    <span>✧</span>
                    <span>·</span>
                    <span>✦</span>
                    <span>·</span>
                    <span>✧</span>
                    <span>✦</span>

                </div>


                <h1
                    class="brand-title"
                    aria-label="Virtual Genie CRM">

                    <span
                        class="brand-word brand-virtual">

                        <span>V</span>
                        <span>i</span>
                        <span>r</span>
                        <span>t</span>
                        <span>u</span>
                        <span>a</span>
                        <span>l</span>

                    </span>


                    <span
                        class="brand-word brand-genie">

                        <span>G</span>
                        <span>e</span>
                        <span>n</span>
                        <span>i</span>
                        <span>e</span>

                    </span>


                    <span class="brand-crm">

                        <span>C</span>
                        <span>R</span>
                        <span>M</span>

                    </span>

                </h1>

            </div>


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

        <div class="stats primary-stats">

            <div class="stats-grid">


                <!-- COMPANIES -->

                <button
                    class="primary-stat primary-stat-companies"
                    onclick="location.hash='companies'">

                    <span class="primary-stat-icon">
                        🏢
                    </span>

                    <span class="primary-stat-content">

                        <span class="primary-stat-label">
                            Companies
                        </span>

                        <strong>
                            ${companies.length}
                        </strong>

                    </span>

                    <span class="primary-stat-arrow">
                        →
                    </span>

                </button>


                <!-- PIPELINE -->

                <button
                    class="primary-stat primary-stat-pipeline"
                    onclick="location.hash='pipeline'">

                    <span class="primary-stat-icon">
                        📈
                    </span>

                    <span class="primary-stat-content">

                        <span class="primary-stat-label">
                            Pipeline
                        </span>

                        <strong>
                            ₹${totalPipeline}
                        </strong>

                    </span>

                    <span class="primary-stat-arrow">
                        →
                    </span>

                </button>


                <!-- REVENUE -->

                <button
                    class="primary-stat primary-stat-revenue"
                    onclick="location.hash='analytics'">

                    <span class="primary-stat-icon">
                        💰
                    </span>

                    <span class="primary-stat-content">

                        <span class="primary-stat-label">
                            Revenue
                        </span>

                        <strong>
                            ₹${totalRevenue}
                        </strong>

                    </span>

                    <span class="primary-stat-arrow">
                        →
                    </span>

                </button>


                <!-- PRODUCTS -->

                <button
                    class="primary-stat primary-stat-products"
                    onclick="loadGlobalProducts()">

                    <span class="primary-stat-icon">
                        📦
                    </span>

                    <span class="primary-stat-content">

                        <span class="primary-stat-label">
                            Products
                        </span>

                        <strong>
                            ${totalProducts}
                        </strong>

                    </span>

                    <span class="primary-stat-arrow">
                        →
                    </span>

                </button>

            </div>

        </div>


        <!-- CRM SUMMARY -->

        <div class="card crm-summary-card">

            <div class="section-heading">

                <div>

                    <h2>
                        CRM Summary
                    </h2>

                    <p class="section-subtitle">
                        Your business at a glance
                    </p>

                </div>

                <div class="section-badge">
                    5
                </div>

            </div>


            <div class="crm-kpi-grid">


                <div class="crm-kpi">

                    <div
                        class="crm-kpi-icon companies-icon">

                        🏢

                    </div>

                    <div>

                        <span class="crm-kpi-label">
                            Companies
                        </span>

                        <strong>
                            ${companies.length}
                        </strong>

                    </div>

                </div>


                <div class="crm-kpi">

                    <div
                        class="crm-kpi-icon calls-icon">

                        ☎️

                    </div>

                    <div>

                        <span class="crm-kpi-label">
                            Calls
                        </span>

                        <strong>
                            ${totalCalls}
                        </strong>

                    </div>

                </div>


                <div class="crm-kpi">

                    <div
                        class="crm-kpi-icon pending-icon">

                        ◷

                    </div>

                    <div>

                        <span class="crm-kpi-label">
                            Pending Tasks
                        </span>

                        <strong>
                            ${pendingTasks}
                        </strong>

                    </div>

                </div>


                <div class="crm-kpi">

                    <div
                        class="crm-kpi-icon completed-icon">

                        ✓

                    </div>

                    <div>

                        <span class="crm-kpi-label">
                            Completed
                        </span>

                        <strong>
                            ${completedTasks}
                        </strong>

                    </div>

                </div>


                <div class="crm-kpi">

                    <div
                        class="crm-kpi-icon products-icon">

                        📦

                    </div>

                    <div>

                        <span class="crm-kpi-label">
                            Products
                        </span>

                        <strong>
                            ${totalProducts}
                        </strong>

                    </div>

                </div>

            </div>

        </div>


        <!-- PIPELINE SUMMARY -->

        <div
            class="card pipeline-summary-card"
            style="margin-top:20px;">

            <div class="pipeline-summary-header">

                <div>

                    <h3>
                        Pipeline
                    </h3>

                    <p>
                        Sales opportunities by stage
                    </p>

                </div>

                <button
                    class="pipeline-view-button"
                    onclick="location.hash='pipeline'">

                    View Pipeline
                    <span>→</span>

                </button>

            </div>


            <div class="pipeline-stage-list">


                <!-- NEW LEADS -->

                <button
                    class="pipeline-stage"
                    onclick="location.hash='pipeline'">

                    <span
                        class="pipeline-stage-icon pipeline-blue">

                        ✦

                    </span>

                    <span class="pipeline-stage-info">

                        <strong>
                            New Leads
                        </strong>

                        <small>
                            New opportunities
                        </small>

                    </span>

                    <span class="pipeline-stage-count">
                        ${newLeads}
                    </span>

                    <span class="pipeline-stage-arrow">
                        →
                    </span>

                </button>


                <!-- CONTACTED -->

                <button
                    class="pipeline-stage"
                    onclick="location.hash='pipeline'">

                    <span
                        class="pipeline-stage-icon pipeline-cyan">

                        ☎

                    </span>

                    <span class="pipeline-stage-info">

                        <strong>
                            Contacted
                        </strong>

                        <small>
                            Initial contact made
                        </small>

                    </span>

                    <span class="pipeline-stage-count">
                        ${contacted}
                    </span>

                    <span class="pipeline-stage-arrow">
                        →
                    </span>

                </button>


                <!-- MEETINGS -->

                <button
                    class="pipeline-stage"
                    onclick="location.hash='pipeline'">

                    <span
                        class="pipeline-stage-icon pipeline-purple">

                        ◷

                    </span>

                    <span class="pipeline-stage-info">

                        <strong>
                            Meetings
                        </strong>

                        <small>
                            Meetings scheduled
                        </small>

                    </span>

                    <span class="pipeline-stage-count">
                        ${meetings}
                    </span>

                    <span class="pipeline-stage-arrow">
                        →
                    </span>

                </button>


                <!-- PROPOSALS -->

                <button
                    class="pipeline-stage"
                    onclick="location.hash='pipeline'">

                    <span
                        class="pipeline-stage-icon pipeline-violet">

                        ◈

                    </span>

                    <span class="pipeline-stage-info">

                        <strong>
                            Proposals
                        </strong>

                        <small>
                            Proposals sent
                        </small>

                    </span>

                    <span class="pipeline-stage-count">
                        ${proposals}
                    </span>

                    <span class="pipeline-stage-arrow">
                        →
                    </span>

                </button>


                <!-- NEGOTIATIONS -->

                <button
                    class="pipeline-stage"
                    onclick="location.hash='pipeline'">

                    <span
                        class="pipeline-stage-icon pipeline-orange">

                        ⇄

                    </span>

                    <span class="pipeline-stage-info">

                        <strong>
                            Negotiations
                        </strong>

                        <small>
                            Deals being negotiated
                        </small>

                    </span>

                    <span class="pipeline-stage-count">
                        ${negotiations}
                    </span>

                    <span class="pipeline-stage-arrow">
                        →
                    </span>

                </button>


                <!-- WON -->

                <button
                    class="pipeline-stage"
                    onclick="location.hash='pipeline'">

                    <span
                        class="pipeline-stage-icon pipeline-green">

                        ✓

                    </span>

                    <span class="pipeline-stage-info">

                        <strong>
                            Won
                        </strong>

                        <small>
                            Closed successfully
                        </small>

                    </span>

                    <span class="pipeline-stage-count">
                        ${won}
                    </span>

                    <span class="pipeline-stage-arrow">
                        →
                    </span>

                </button>


                <!-- LOST -->

                <button
                    class="pipeline-stage"
                    onclick="location.hash='pipeline'">

                    <span
                        class="pipeline-stage-icon pipeline-red">

                        ×

                    </span>

                    <span class="pipeline-stage-info">

                        <strong>
                            Lost
                        </strong>

                        <small>
                            Opportunities closed lost
                        </small>

                    </span>

                    <span class="pipeline-stage-count">
                        ${lost}
                    </span>

                    <span class="pipeline-stage-arrow">
                        →
                    </span>

                </button>


            </div>

        </div>


        <!-- ATTENTION -->

        <div
            class="card attention-card"
            style="margin-top:20px;">

            <div class="attention-header">

                <div>

                    <h3>
                        Attention
                    </h3>

                    <p>
                        What needs your attention
                    </p>

                </div>

                <div class="attention-count">
                    ${attentionCount}
                </div>

            </div>


            <div class="attention-list">


                <!-- OVERDUE TASKS -->

                <button
                    class="attention-item attention-danger"
                    onclick="location.hash='notifications'">

                    <span class="attention-icon">
                        ⏰
                    </span>

                    <span class="attention-content">

                        <strong>
                            Overdue Tasks
                        </strong>

                        <small>
                            Tasks requiring attention
                        </small>

                    </span>

                    <span class="attention-number">
                        ${overdueTasks}
                    </span>

                    <span class="attention-arrow">
                        →
                    </span>

                </button>


                <!-- OVERDUE FOLLOW-UPS -->

                <button
                    class="attention-item attention-danger"
                    onclick="location.hash='notifications'">

                    <span class="attention-icon">
                        📞
                    </span>

                    <span class="attention-content">

                        <strong>
                            Overdue Follow-ups
                        </strong>

                        <small>
                            Follow-ups that need action
                        </small>

                    </span>

                    <span class="attention-number">
                        ${overdueFollowUps}
                    </span>

                    <span class="attention-arrow">
                        →
                    </span>

                </button>


                <!-- TODAY -->

                <button
                    class="attention-item attention-success"
                    onclick="location.hash='notifications'">

                    <span class="attention-icon">
                        ✓
                    </span>

                    <span class="attention-content">

                        <strong>
                            Follow-ups Today
                        </strong>

                        <small>
                            Due today
                        </small>

                    </span>

                    <span class="attention-number">
                        ${todayFollowUps}
                    </span>

                    <span class="attention-arrow">
                        →
                    </span>

                </button>


                <!-- UPCOMING -->

                <button
                    class="attention-item attention-warning"
                    onclick="location.hash='calendar'">

                    <span class="attention-icon">
                        🗓
                    </span>

                    <span class="attention-content">

                        <strong>
                            Upcoming Follow-ups
                        </strong>

                        <small>
                            Coming up next
                        </small>

                    </span>

                    <span class="attention-number">
                        ${upcomingFollowUps}
                    </span>

                    <span class="attention-arrow">
                        →
                    </span>

                </button>


            </div>


            <div class="attention-total">

                <span>
                    Total Attention Items
                </span>

                <strong>
                    ${attentionCount}
                </strong>

            </div>

        </div>


        <!-- QUICK ACCESS -->

        <div
            class="card quick-access-card"
            style="margin-top:20px;">

            <div class="quick-access-header">

                <div>

                    <h3>
                        Quick Access
                    </h3>

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

                    <span
                        class="quick-action-icon pipeline-icon">

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

                    <span
                        class="quick-action-icon calendar-icon">

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

                    <span
                        class="quick-action-icon notification-icon">

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

                    <span
                        class="quick-action-icon analytics-icon">

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
