/* =========================================
   EDIT CALL
========================================= */

function loadEditCall(
    companyId,
    callId
) {

    const company =
        getCompany(companyId);


    if (!company) {

        console.error(
            "Edit call failed: company not found",
            companyId
        );

        return;

    }


    const call =
        (company.calls || []).find(
            c =>
                String(c.id) ===
                String(callId)
        );


    if (!call) {

        console.error(
            "Edit call failed: call not found",
            callId
        );

        return;

    }


    const app =
        document.getElementById("app");


    app.innerHTML = `

    <div class="dashboard">

        <div class="header">

            <h1>
                Edit Call
            </h1>

            <p class="subtitle">
                ${company.companyName}
            </p>

        </div>


        <input
            class="search"
            id="callType"
            placeholder="Call Type"
            value="${call.type || ""}">


        <input
            class="search"
            id="callDuration"
            type="number"
            min="0"
            placeholder="Duration (minutes)"
            value="${call.duration || ""}">


        <input
            class="search"
            id="callOutcome"
            placeholder="Outcome"
            value="${call.outcome || ""}">


        <input
            class="search"
            id="callFollowUp"
            type="date"
            value="${call.followUp || ""}">


        <textarea
            class="search"
            id="callNotes"
            placeholder="Notes"
            style="height:150px;">${call.notes || ""}</textarea>


        <button
            class="fab"
            style="
                position:static;
                width:100%;
                height:60px;
                border-radius:18px;
            "
            onclick="updateCall(
                ${companyId},
                ${callId}
            )">

            Update Call

        </button>


        <button
            class="search"
            style="margin-top:20px;"
            onclick="loadCalls(${companyId})">

            ← Back

        </button>


        ${bottomNav("companies")}

    </div>

    `;

}


/* =========================================
   UPDATE CALL
========================================= */

function updateCall(
    companyId,
    callId
) {

    const company =
        getCompany(companyId);


    if (!company) {

        console.error(
            "Update call failed: company not found",
            companyId
        );

        return;

    }


    const call =
        (company.calls || []).find(
            c =>
                String(c.id) ===
                String(callId)
        );


    if (!call) {

        console.error(
            "Update call failed: call not found",
            callId
        );

        return;

    }


    /* =====================================
       UPDATE FIELDS
    ===================================== */

    call.type =
        document
            .getElementById("callType")
            .value
            .trim() ||
        "General Call";


    call.duration =
        Number(
            document
                .getElementById(
                    "callDuration"
                )
                .value
        ) || 0;


    call.outcome =
        document
            .getElementById(
                "callOutcome"
            )
            .value
            .trim() ||
        "-";


    call.followUp =
        document
            .getElementById(
                "callFollowUp"
            )
            .value;


    call.notes =
        document
            .getElementById(
                "callNotes"
            )
            .value
            .trim();


    /* =====================================
       SAVE
    ===================================== */

    const saved =
        updateCompany(company);


    if (!saved) {

        console.error(
            "Update call failed"
        );

        return;

    }


    loadCalls(companyId);

}
