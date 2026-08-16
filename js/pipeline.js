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
       ACTIVE PIPELINE VALUE
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

        const stageDeals =
            deals.filter(deal => {

                const dealStage =
                    deal.stage || "New Lead";

                return dealStage === stage;

            });


        let stageValue = 0;

        stageDeals.forEach(deal => {

            const status =
                String(
                    deal.status || "Open"
                )
                .trim()
                .toLowerCase();


            if (status === "open") {

                stageValue +=
                    Number(deal.value || 0);

            }

        });


        html += `

        <div class="pipeline-stage-card">

            <div class="pipeline-stage-card-header">

                <div>

                    <div class="pipeline-stage-title">

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


                <div class="pipeline-stage-value">

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

                <div class="pipeline-empty-stage">

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
                    class="pipeline-deal-card">


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
                                COMPANY
                            </span>

                            <strong>
                                ${deal.companyName}
                            </strong>

                        </div>


                    </div>


                    <!-- =========================
                         CHANGE DEAL STAGE
                    ========================== -->

                    <div
                        class="pipeline-deal-stage-editor">

                        <label>
                            DEAL STAGE
                        </label>


                        <select
                            class="pipeline-stage-select"
                            id="pipeline-stage-${deal.id}"
                            onclick="event.stopPropagation()"
                            onchange="
                                savePipelineDealStage(
                                    ${deal.companyId},
                                    ${deal.id},
                                    this.value
                                )
                            ">

                            ${stages.map(
                                option => `
                                    <option
                                        value="${option}"
                                        ${
                                            deal.stage === option
                                                ? "selected"
                                                : ""
                                        }>

                                        ${option}

                                    </option>
                                `
                            ).join("")}

                        </select>

                    </div>


                    <!-- =========================
                         STATUS
                    ========================== -->

                    <div
                        class="pipeline-deal-stage-editor">

                        <label>
                            DEAL STATUS
                        </label>


                        <select
                            class="pipeline-stage-select"
                            onclick="event.stopPropagation()"
                            onchange="
                                savePipelineDealStatus(
                                    ${deal.companyId},
                                    ${deal.id},
                                    this.value
                                )
                            ">

                            <option
                                value="Open"
                                ${
                                    normalizedStatus === "open"
                                        ? "selected"
                                        : ""
                                }>

                                Open

                            </option>


                            <option
                                value="Won"
                                ${
                                    normalizedStatus === "won"
                                        ? "selected"
                                        : ""
                                }>

                                Won

                            </option>


                            <option
                                value="Lost"
                                ${
                                    normalizedStatus === "lost"
                                        ? "selected"
                                        : ""
                                }>

                                Lost

                            </option>

                        </select>

                    </div>


                    <div
                        class="pipeline-deal-footer">

                        <button
                            class="pipeline-open-company"
                            onclick="
                                event.stopPropagation();
                                location.hash='company-${deal.companyId}'
                            ">

                            Open Company

                        </button>

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


/* =========================================
   SAVE DEAL STAGE
========================================= */

function savePipelineDealStage(
    companyId,
    dealId,
    newStage
) {

    const company =
        getCompany(companyId);


    if (!company) {

        alert("Company not found.");

        return;

    }


    const deal =
        (company.deals || []).find(
            item =>
                String(item.id) ===
                String(dealId)
        );


    if (!deal) {

        alert("Deal not found.");

        return;

    }


    deal.stage =
        newStage;


    const saved =
        updateDeal(
            companyId,
            deal
        );


    if (!saved) {

        alert(
            "Could not update deal stage."
        );

        return;

    }


    /*
       Reload the entire Pipeline so:
       - deal moves to new stage
       - stage count updates
       - stage value updates
       - Dashboard will see the new stage
    */

    loadPipeline();

}


/* =========================================
   SAVE DEAL STATUS
========================================= */

function savePipelineDealStatus(
    companyId,
    dealId,
    newStatus
) {

    const company =
        getCompany(companyId);


    if (!company) {

        alert("Company not found.");

        return;

    }


    const deal =
        (company.deals || []).find(
            item =>
                String(item.id) ===
                String(dealId)
        );


    if (!deal) {

        alert("Deal not found.");

        return;

    }


    deal.status =
        newStatus;


    const saved =
        updateDeal(
            companyId,
            deal
        );


    if (!saved) {

        alert(
            "Could not update deal status."
        );

        return;

    }


    /*
       Reload so financial values
       update immediately.
    */

    loadPipeline();

}
