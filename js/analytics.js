/* =========================================
   ANALYTICS
========================================= */

function loadAnalytics() {

    const companies =
        getCompanies();

    const app =
        document.getElementById("app");


    /* =====================================
       CORE METRICS
    ===================================== */

    let totalPipeline = 0;

    let totalRevenue = 0;

    let totalLostValue = 0;


    let totalProducts = 0;

    let totalCalls = 0;


    let totalTasks = 0;

    let completedTasks = 0;


    let wonDeals = 0;

    let lostDeals = 0;

    let openDeals = 0;


    /* =====================================
       PIPELINE STAGES
    ===================================== */

    const stages = {

        "New Lead": 0,

        "Contacted": 0,

        "Meeting Scheduled": 0,

        "Proposal Sent": 0,

        "Negotiation": 0,

        "Won": 0,

        "Lost": 0

    };


    /* =====================================
       PROCESS COMPANIES
    ===================================== */

    companies.forEach(
        company => {


        /* ================================
           PRODUCTS
        ================================= */

        const products =
            Array.isArray(
                company.products
            )
                ? company.products
                : [];


        totalProducts +=
            products.length;


        /* ================================
           CALLS
        ================================= */

        const calls =
            Array.isArray(
                company.calls
            )
                ? company.calls
                : [];


        totalCalls +=
            calls.length;


        /* ================================
           TASKS
        ================================= */

        const tasks =
            Array.isArray(
                company.tasks
            )
                ? company.tasks
                : [];


        totalTasks +=
            tasks.length;


        tasks.forEach(
            task => {

            const status =
                String(
                    task.status || ""
                )
                .trim()
                .toLowerCase();


            if (
                status === "completed"
            ) {

                completedTasks++;

            }

        });


        /* ================================
           DEALS
        ================================= */

        const deals =
            Array.isArray(
                company.deals
            )
                ? company.deals
                : [];


        deals.forEach(
            deal => {

            const value =
                Number(
                    deal.value || 0
                );


            const status =
                String(
                    deal.status ||
                    "Open"
                )
                .trim()
                .toLowerCase();


            /* ============================
               FINANCIAL METRICS
            ================================= */

            if (
                status === "won"
            ) {

                totalRevenue +=
                    value;

                wonDeals++;


            } else if (
                status === "lost"
            ) {

                totalLostValue +=
                    value;

                lostDeals++;


            } else {

                totalPipeline +=
                    value;

                openDeals++;

            }


            /* ============================
               DISPLAY STAGE
               
               Status is authoritative for
               terminal states.
            ================================= */

            let stage;


            if (
                status === "won"
            ) {

                stage =
                    "Won";

            } else if (
                status === "lost"
            ) {

                stage =
                    "Lost";

            } else {

                stage =
                    String(
                        deal.stage ||
                        "New Lead"
                    )
                    .trim();

            }


            if (
                stages[stage] !==
                undefined
            ) {

                stages[stage]++;

            }

        });

    });


    /* =====================================
       CONVERSION RATE
    ===================================== */

    const totalClosed =
        wonDeals +
        lostDeals;


    const conversionRate =
        totalClosed > 0

            ?

        (
            (
                wonDeals /
                totalClosed
            ) *
            100
        ).toFixed(1)

            :

        "0.0";


    /* =====================================
       TASK COMPLETION
    ===================================== */

    const taskCompletion =
        totalTasks > 0

            ?

        (
            (
                completedTasks /
                totalTasks
            ) *
            100
        ).toFixed(1)

            :

        "0.0";


    /* =====================================
       STAGE CARDS
    ===================================== */

    let stageCards = "";


    Object.keys(stages).forEach(
        stage => {

        stageCards += `

        <div
            class="card"
            style="margin-top:15px;">

            <h3>
                ${stage}
            </h3>

            <p>

                <strong>
                    Deals:
                </strong>

                ${stages[stage]}

            </p>

        </div>

        `;

    });


    /* =====================================
       PAGE
    ===================================== */

    app.innerHTML = `

    <div class="dashboard">


        <!-- HEADER -->

        <div class="header">

            <h1>
                Analytics Dashboard
            </h1>

            <p class="subtitle">
                CRM performance overview
            </p>

        </div>


        <!-- SALES METRICS -->

        <div class="stats">

            <div class="stats-grid">


                <div class="card">

                    <p>
                        Total Companies
                    </p>

                    <h2>
                        ${companies.length}
                    </h2>

                </div>


                <div class="card">

                    <p>
                        Total Pipeline
                    </p>

                    <h2>
                        ₹${totalPipeline}
                    </h2>

                </div>


                <div class="card">

                    <p>
                        Total Revenue
                    </p>

                    <h2>
                        ₹${totalRevenue}
                    </h2>

                </div>


                <div class="card">

                    <p>
                        Conversion Rate
                    </p>

                    <h2>
                        ${conversionRate}%
                    </h2>

                </div>


            </div>

        </div>


        <!-- DEAL PERFORMANCE -->

        <div
            class="card"
            style="margin-top:20px;">

            <h2>
                Deal Performance
            </h2>

            <br>


            <p>

                <strong>
                    Open Deals:
                </strong>

                ${openDeals}

            </p>


            <p>

                <strong>
                    Won Deals:
                </strong>

                ${wonDeals}

            </p>


            <p>

                <strong>
                    Lost Deals:
                </strong>

                ${lostDeals}

            </p>


            <p>

                <strong>
                    Lost Deal Value:
                </strong>

                ₹${totalLostValue}

            </p>

        </div>


        <!-- SALES ACTIVITY -->

        <div
            class="card"
            style="margin-top:20px;">

            <h2>
                Sales Activity
            </h2>

            <br>


            <p>

                <strong>
                    Total Calls:
                </strong>

                ${totalCalls}

            </p>


            <p>

                <strong>
                    Total Tasks:
                </strong>

                ${totalTasks}

            </p>


            <p>

                <strong>
                    Completed Tasks:
                </strong>

                ${completedTasks}

            </p>


            <p>

                <strong>
                    Task Completion:
                </strong>

                ${taskCompletion}%

            </p>


            <p>

                <strong>
                    Won Deals:
                </strong>

                ${wonDeals}

            </p>


            <p>

                <strong>
                    Lost Deals:
                </strong>

                ${lostDeals}

            </p>

        </div>


        <!-- PRODUCTS -->

        <div
            class="card"
            style="margin-top:20px;">

            <h2>
                Products
            </h2>

            <br>


            <p>

                <strong>
                    Total Products:
                </strong>

                ${totalProducts}

            </p>

        </div>


        <!-- PIPELINE BREAKDOWN -->

        <div
            class="card"
            style="margin-top:20px;">

            <h2>
                Pipeline Breakdown
            </h2>


            ${stageCards}

        </div>


        <!-- BACK -->

        <button
            class="search"
            style="margin-top:20px;"
            onclick="
                location.hash=''
            ">

            ← Back to Dashboard

        </button>


        ${bottomNav("dashboard")}


    </div>

    `;

            }
