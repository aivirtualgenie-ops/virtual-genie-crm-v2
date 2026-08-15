function loadGlobalCalls(){

    const companies = getCompanies();

    const app = document.getElementById("app");

    let calls = [];


    /* =========================================================
       DATE FORMATTER
       Converts:
       2026-08-15T19:01:17.687Z
       → 15 Aug 2026

       Also converts:
       2026-08-21
       → 21 Aug 2026
    ========================================================= */

    function formatDate(value){

        if(!value){
            return "-";
        }

        const dateString = String(value).split("T")[0];

        const parts = dateString.split("-");

        if(parts.length !== 3){
            return value;
        }

        const year = parts[0];
        const month = Number(parts[1]);
        const day = Number(parts[2]);

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

        if(
            !year ||
            !month ||
            !day ||
            month < 1 ||
            month > 12
        ){
            return value;
        }

        return `${day} ${months[month - 1]} ${year}`;

    }


    /* =========================================================
       COLLECT CALLS
    ========================================================= */

    companies.forEach(company => {

        (company.calls || []).forEach(call => {

            calls.push({

                companyId: company.id,

                companyName: company.companyName,

                ...call

            });

        });

    });


    calls.sort((a,b) => b.id - a.id);


    let callCards = "";


    /* =========================================================
       EMPTY STATE
    ========================================================= */

    if(calls.length === 0){

        callCards = `

        <div class="global-call-empty">

            <div class="global-call-empty-icon">
                ☎
            </div>

            <h2>
                No calls yet
            </h2>

            <p>
                Calls from all your companies will appear here.
            </p>

            <button
                class="global-call-empty-button"
                onclick="loadCompanies()">

                <span>+</span>
                Log a Call

            </button>

        </div>

        `;

    }else{


        /* =====================================================
           CALL CARDS
        ===================================================== */

        calls.forEach(call => {

            callCards += `

            <div class="global-call-card">


                <!-- TOP -->

                <div class="global-call-card-top">

                    <div class="global-call-company">

                        <div class="global-call-company-icon">
                            ☎
                        </div>

                        <div>

                            <h3>
                                ${call.companyName}
                            </h3>

                            <span class="global-call-type">
                                ${call.type}
                            </span>

                        </div>

                    </div>


                    <div class="global-call-outcome">
                        ${call.outcome}
                    </div>

                </div>


                <!-- DETAILS -->

                <div class="global-call-details">


                    <div class="global-call-detail">

                        <span>
                            DATE
                        </span>

                        <strong>
                            ${formatDate(call.date)}
                        </strong>

                    </div>


                    <div class="global-call-detail">

                        <span>
                            TIME
                        </span>

                        <strong>
                            ${call.time || "-"}
                        </strong>

                    </div>


                    <div class="global-call-detail">

                        <span>
                            DURATION
                        </span>

                        <strong>
                            ${call.duration || 0} min
                        </strong>

                    </div>


                </div>


                <!-- NOTES -->

                <div class="global-call-notes">

                    <span>
                        NOTES
                    </span>

                    <p>
                        ${call.notes || "No notes added."}
                    </p>

                </div>


                <!-- FOOTER -->

                <div class="global-call-footer">


                    <div class="global-call-followup">

                        <span>
                            FOLLOW-UP
                        </span>

                        <strong>
                            ${formatDate(call.followUp)}
                        </strong>

                    </div>


                    <button
                        class="global-call-open"
                        onclick="loadCompany(${call.companyId})">

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


    /* =========================================================
       PAGE
    ========================================================= */

    app.innerHTML = `

    <div class="dashboard">


        <!-- GLOBAL CALLS HEADER -->

        <div class="global-calls-header">

            <div class="global-calls-icon">
                ☎
            </div>


            <div>

                <p class="global-calls-label">
                    COMMUNICATION
                </p>


                <h1>
                    All Calls
                </h1>


                <p class="global-calls-count">

                    ${calls.length}

                    ${calls.length === 1 ? "Call" : "Calls"}

                    Logged

                </p>

            </div>

        </div>


        <!-- CALL CONTENT -->

        ${callCards}


        <!-- NAVIGATION -->

        ${bottomNav("calls")}


    </div>

    `;

}
