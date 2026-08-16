/* =========================================
   SALES PIPELINE
========================================= */

function loadPipeline() {

    const companies = getCompanies();

    const stages = [
        "New Lead",
        "Contacted",
        "Meeting Scheduled",
        "Proposal Sent",
        "Negotiation",
        "Won",
        "Lost"
    ];

    const app =
        document.getElementById("app");


    /* =====================================
       COLLECT ALL DEALS
    ===================================== */

    let deals = [];

    companies.forEach(company => {

        (company.deals || []).forEach(deal => {

            deals.push({

                ...deal,

                companyId:
                    company.id,

                companyName:
                    company.companyName ||
                    "Unnamed Company"

            });

        });

    });


    /* =====================================
       PIPELINE TOTAL
    ===================================== */

    let activePipelineValue = 0;

    deals.forEach(deal => {

        const status =
            String(
                deal.status || "Open"
            )
            .trim()
            .toLowerCase();


        if (status === "open") {

            activePipelineValue +=
                Number(deal.value || 0);

        }

    });


    /* =====================================
       HEADER
    ===================================== */

    let html = `

    <div class="dashboard">


        <div class="pipeline-page-header">

            <div class="pipeline-page-icon">
                📈
            </div>


            <div>

                <p class="pipeline-eyebrow">
                    SALES
                </p>

                <h1>
                    Sales Pipeline
                </h1>

                <p class="pipeline-subtitle">
                    ${deals.length}
                    ${deals.length === 1 ? "Deal" : "Deals"}
                    · ₹${activePipelineValue} Active Pipeline
                </p>

            </div>

        </div>


        <!-- PIPELINE SUMMARY -->

        <div class="pipeline-top-stats">

            <div class="pipeline-top-stat">

                <span>
                    TOTAL DEALS
                </span>

                <strong>
                    ${deals.length}
                </strong>

            </div>


            <div class="pipeline-top-stat">

                <span>
                    ACTIVE PIPELINE
                </span>

                <strong>
                    ₹${activePipelineValue}
                </strong>

            </div>

        </div>

    `;


    /* =====================================
       STAGES
    ===================================== */

    stages.forEach(stage => {


        /* =================================
           DEALS IN THIS STAGE
        ================================= */

        const stageDeals =
            deals.filter(deal => {

                const dealStage =
                    deal.stage ||
                    "New Lead";

                return dealStage === stage;

            });


        /* =================================
           STAGE VALUE
        ================================= */

        let stageValue = 0;

        stageDeals.forEach(deal => {

            const status =
                String(
                    deal.status || "Open"
                )
                .trim()
                .toLowerCase();


            /*
               Only Open deals contribute
               to active pipeline.
            */

            if (status === "open") {

                stageValue +=
                    Number(deal.value || 0);

            }

        });


        html += `

        <div
            class="pipeline-stage-card">

            <div
                class="pipeline-stage-card-header">

                <div>

                    <div
                        class="pipeline-stage-title">

                        <h2>
                            ${stage}
                        </h2>

                        <span>
                            ${stageDeals.length}
                        </span>

                    </div>


                    <p>
                        ${stageDeals.length === 0
                            ? "No deals"
                            : `${stageDeals.length} ${
                                stageDeals.length === 1
                                ? "deal"
                                : "deals"
                              }`
                        }
                    </p>

                </div>


                <div
                    class="pipeline-stage-value">

                    <span>
                        ACTIVE VALUE
                    </span>

                    <strong>
                        ₹${stageValue}
                    </strong>

                </div>

            </div>


        `;


        /* =================================
           EMPTY STAGE
        ================================= */

        if (stageDeals.length === 0) {

            html += `

                <div
                    class="pipeline-empty-stage">

                    <span>
                        —
                    </span>

                    <p>
                        No deals in this stage
                    </p>

                </div>

            `;

        }


        /* =================================
           DEAL CARDS
        ================================= */

        else {

            stageDeals.forEach(deal => {

                const value =
                    Number(
                        deal.value || 0
                    );


                const status =
                    String(
                        deal.status || "Open"
                    );


                const normalizedStatus =
                    status
                        .trim()
                        .toLowerCase();


                let statusClass =
                    "pipeline-deal-open";


                if (
                    normalizedStatus ===
                    "won"
                ) {

                    statusClass =
                        "pipeline-deal-won";

                } else if (
                    normalizedStatus ===
                    "lost"
                ) {

                    statusClass =
                        "pipeline-deal-lost";

                }


                html += `

                <div
                    class="pipeline-deal-card"
                    onclick="
                        location.hash='company-${deal.companyId}'
                    ">


                    <div
                        class="pipeline-deal-top">


                        <div>

                            <span
                                class="pipeline-deal-company">

                                ${deal.companyName}

                            </span>


                            <h3>

                                ${
                                    deal.name ||
                                    "Unnamed Deal"
                                }

                            </h3>

                        </div>


                        <span
                            class="
                                pipeline-deal-status
                                ${statusClass}
                            ">

                            ${status}

                        </span>


                    </div>


                    <div
                        class="pipeline-deal-value">

                        <span>
                            DEAL VALUE
                        </span>

                        <strong>
                            ₹${value}
                        </strong>

                    </div>


                    <div
                        class="pipeline-deal-meta">


                        <div>

                            <span>
                                PRODUCT
                            </span>

                            <strong>
                                ${deal.product || "-"}
                            </strong>

                        </div>


                        <div>

                            <span>
                                STAGE
                            </span>

                            <strong>
                                ${deal.stage || "-"}
                            </strong>

                        </div>


                    </div>


                    <div
                        class="pipeline-deal-footer">

                        <span>
                            Open Company
                        </span>

                        <strong>
                            →
                        </strong>

                    </div>


                </div>

                `;

            });

        }


        html += `

        </div>

        `;

    });


    /* =====================================
       NAVIGATION
    ===================================== */

    html += `

        ${bottomNav("pipeline")}

    </div>

    `;


    /* =====================================
       RENDER
    ===================================== */

    app.innerHTML = html;

}
