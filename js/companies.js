/* =========================================
   COMPANIES PAGE
========================================= */

function loadCompanies(
    searchText = ""
) {

    const app =
        document.getElementById("app");


    const companies =
        getCompanies();


    const search =
        String(searchText)
            .toLowerCase()
            .trim();


    /* =====================================
       GET COMPANY SALES SUMMARY
    ===================================== */

    function getSalesSummary(
        company
    ) {

        const deals =
            Array.isArray(company.deals)
                ? company.deals
                : [];


        if (deals.length === 0) {

            return {
                stages: [],
                label: "No Deals"
            };

        }


        const openDeals =
            deals.filter(
                deal =>
                    String(
                        deal.status ||
                        "Open"
                    )
                    .trim()
                    .toLowerCase()
                    === "open"
            );


        const wonDeals =
            deals.filter(
                deal =>
                    String(
                        deal.status || ""
                    )
                    .trim()
                    .toLowerCase()
                    === "won"
            );


        const lostDeals =
            deals.filter(
                deal =>
                    String(
                        deal.status || ""
                    )
                    .trim()
                    .toLowerCase()
                    === "lost"
            );


        /* =================================
           ACTIVE DEAL STAGES
        ================================= */

        if (openDeals.length > 0) {

            const stages = [
                ...new Set(
                    openDeals.map(
                        deal =>
                            deal.stage ||
                            "New Lead"
                    )
                )
            ];


            return {

                stages,

                label:
                    stages.join(", ")

            };

        }


        /* =================================
           NO OPEN DEALS → WON
        ================================= */

        if (wonDeals.length > 0) {

            return {

                stages: ["Won"],

                label: "Won"

            };

        }


        /* =================================
           ONLY LOST
        ================================= */

        if (lostDeals.length > 0) {

            return {

                stages: ["Lost"],

                label: "Lost"

            };

        }


        return {

            stages: [],

            label: "No Deals"

        };

    }


    /* =====================================
       FILTER COMPANIES
    ===================================== */

    const filteredCompanies =
        companies.filter(
            company => {

            const sales =
                getSalesSummary(
                    company
                );


            const searchableText = [

                company.companyName,

                company.contactPerson,

                company.phone,

                company.email,

                company.industry,

                company.status,

                company.source,

                ...sales.stages

            ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();


            return searchableText.includes(
                search
            );

        });


    /* =====================================
       BUILD COMPANY CARDS
    ===================================== */

    let companyCards = "";


    if (
        filteredCompanies.length === 0
    ) {

        companyCards = `

        <div class="card">

            <h3>
                ${
                    companies.length === 0
                        ? "No Companies Yet"
                        : "No Companies Found"
                }
            </h3>

            <br>

            <p>

                ${
                    companies.length === 0
                        ? "Create your first company to get started."
                        : "Try another search."
                }

            </p>

        </div>

        `;

    } else {

        filteredCompanies.forEach(
            company => {

            const sales =
                getSalesSummary(
                    company
                );


            const dealCount =
                Array.isArray(
                    company.deals
                )
                    ? company.deals.length
                    : 0;


            companyCards += `

            <div
                class="card"
                style="
                    cursor:pointer;
                "
                onclick="
                    location.hash=
                    'company-${company.id}'
                ">


                <h3>

                    ${
                        company.companyName ||
                        "Unnamed Company"
                    }

                </h3>


                <p>
                    ${
                        company.contactPerson ||
                        "-"
                    }
                </p>


                <p>
                    ${
                        company.phone ||
                        "-"
                    }
                </p>


                <p>
                    ${
                        company.email ||
                        "-"
                    }
                </p>


                <p>

                    <strong>
                        Sales:
                    </strong>

                    ${
                        sales.label
                    }

                </p>


                <p>

                    <strong>
                        Deals:
                    </strong>

                    ${
                        dealCount
                    }

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
                Companies
            </h1>


            <p class="subtitle">

                Manage all your leads and clients

            </p>


            <input
                class="search"
                id="companySearch"
                placeholder="Search companies..."
                value="${escapeCompanySearch(
                    searchText
                )}"
                oninput="
                    loadCompanies(
                        this.value
                    )
                ">

        </div>


        ${companyCards}


        <button
            class="fab"
            onclick="
                location.hash=
                'add-company'
            ">

            +

        </button>


        ${bottomNav("companies")}

    </div>

    `;

}


/* =========================================
   ESCAPE SEARCH VALUE
========================================= */

function escapeCompanySearch(
    value
) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        );

                   }
