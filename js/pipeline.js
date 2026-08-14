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

    const app = document.getElementById("app");


    /* =====================================
       PAGE HEADER
    ===================================== */

    let html = `

    <div class="dashboard">

        <div class="header">

            <h1>
                Sales Pipeline
            </h1>

            <p class="subtitle">
                Manage your sales process
            </p>

        </div>

    `;


    /* =====================================
       PIPELINE STAGES
    ===================================== */

    stages.forEach(stage => {

        const stageCompanies =
            companies.filter(company => {

                const currentStage =
                    company.pipelineStage || "New Lead";

                return currentStage === stage;

            });


        html += `

        <div
            class="card"
            style="margin-top:20px;">

            <h3>
                ${stage}
            </h3>

            <p>
                ${stageCompanies.length}
                Company(s)
            </p>

        `;


        /* =================================
           EMPTY STAGE
        ================================= */

        if (stageCompanies.length === 0) {

            html += `

                <p>
                    No companies
                </p>

            `;

        }


        /* =================================
           COMPANIES IN STAGE
        ================================= */

        else {

            stageCompanies.forEach(company => {

                html += `

                <div
                    class="card"
                    style="
                        margin-top:15px;
                        cursor:pointer;
                    "
                    onclick="
                        location.hash='company-${company.id}'
                    ">

                    <h3>
                        ${company.companyName || "Unnamed Company"}
                    </h3>

                    <p>
                        ${company.contactPerson || "-"}
                    </p>

                    <p>
                        ${company.phone || "-"}
                    </p>

                    <p>
                        Pipeline:
                        ${company.pipelineStage || "New Lead"}
                    </p>

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
