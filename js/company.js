/* =========================================
   COMPANY PAGE
========================================= */
/* =========================================
   FORMAT DATE & TIME
========================================= */

function formatDateTime(dateString) {

    if (!dateString) {
        return "-";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

}
function loadCompany(id) {

    const company = getCompany(id);

    const app = document.getElementById("app");

    if (!company) {

        app.innerHTML = `

        <div class="dashboard">

            <div class="card">

                <h2>Company not found</h2>

                <br>

                <button
                    class="search"
                    onclick="location.hash='companies'">

                    ← Back

                </button>

            </div>

            ${bottomNav("companies")}

        </div>

        `;

        return;

    }

    const pipelineStage =
        company.pipelineStage || "New Lead";


    app.innerHTML = `

    <div class="dashboard">

        <div class="header">

            <h1>
                ${company.companyName || "Company"}
            </h1>

            <p class="subtitle">
                ${company.status || "Client"}
            </p>

        </div>


        <div class="card">

            <h3>Contact Information</h3>

            <br>

            <p>
                <strong>Contact:</strong>
                ${company.contactPerson || "-"}
            </p>

            <p>
                <strong>Phone:</strong>
                ${company.phone || "-"}
            </p>

            <p>
                <strong>Email:</strong>
                ${company.email || "-"}
            </p>

            <p>
                <strong>Website:</strong>
                ${company.website || "-"}
            </p>

        </div>


        <div
            class="card"
            style="margin-top:20px;">

            <h3>Business Information</h3>

            <br>

            <p>
                <strong>Industry:</strong>
                ${company.industry || "-"}
            </p>

            <p>
                <strong>Address:</strong>
                ${company.address || "-"}
            </p>

            <p>
                <strong>Priority:</strong>
                ${company.priority || "-"}
            </p>

        </div>


        <div
            class="card"
            style="margin-top:20px;">

            <h3>Sales Information</h3>

            <br>

            <p>
                <strong>Pipeline Value:</strong>
                ₹${company.pipelineValue || 0}
            </p>

            <p>
                <strong>Revenue:</strong>
                ₹${company.revenue || 0}
            </p>

            <p>
                <strong>Next Follow-up:</strong>
                ${company.nextFollowUp || "-"}
            </p>

            <br>

            <label>
                <strong>Pipeline Stage</strong>
            </label>

            <select
                class="search"
                id="pipelineStage"
                style="margin-top:10px;">

                <option
                    value="New Lead"
                    ${pipelineStage === "New Lead" ? "selected" : ""}>
                    New Lead
                </option>

                <option
                    value="Contacted"
                    ${pipelineStage === "Contacted" ? "selected" : ""}>
                    Contacted
                </option>

                <option
                    value="Meeting Scheduled"
                    ${pipelineStage === "Meeting Scheduled" ? "selected" : ""}>
                    Meeting Scheduled
                </option>

                <option
                    value="Proposal Sent"
                    ${pipelineStage === "Proposal Sent" ? "selected" : ""}>
                    Proposal Sent
                </option>

                <option
                    value="Negotiation"
                    ${pipelineStage === "Negotiation" ? "selected" : ""}>
                    Negotiation
                </option>

                <option
                    value="Won"
                    ${pipelineStage === "Won" ? "selected" : ""}>
                    Won
                </option>

                <option
                    value="Lost"
                    ${pipelineStage === "Lost" ? "selected" : ""}>
                    Lost
                </option>

            </select>


            <button
    class="fab"
    style="
        position:static;
        width:100%;
        height:60px;
        border-radius:18px;
        margin-top:15px;
        font-size:20px;
        white-space:nowrap;
        display:flex;
        align-items:center;
        justify-content:center;
        line-height:1;
    "
    onclick="savePipelineStage(${company.id})">

    Save Pipeline Stage

</button>

        </div>


        <div
            class="card"
            style="margin-top:20px;">

            <h3>Notes</h3>

            <br>

            <p>
                ${company.notes || "No notes yet."}
            </p>

        </div>


        <div
            class="card"
            style="margin-top:20px;">

            <h3>System Information</h3>

            <br>

            <p>
                <p>
    <strong>Created:</strong>
    ${formatDateTime(company.createdAt)}
</p>

<p>
    <strong>Last Updated:</strong>
    ${formatDateTime(company.updatedAt)}
</p>

        </div>


<!-- QUICK ACTIONS -->

<div
    class="card"
    style="margin-top:20px;">

    <h3>Quick Actions</h3>

    <div
        style="
            display:flex;
            flex-direction:column;
            gap:12px;
            margin-top:20px;
        ">

        <button
            class="search"
            style="
                width:100%;
                min-height:52px;
                margin:0;
            "
            onclick="loadCalls(${company.id})">

            📞 Call History

        </button>


        <button
            class="search"
            style="
                width:100%;
                min-height:52px;
                margin:0;
            "
            onclick="loadProducts(${company.id})">

            📦 Products

        </button>


        <button
            class="search"
            style="
                width:100%;
                min-height:52px;
                margin:0;
            "
            onclick="loadTasks(${company.id})">

            ✅ Tasks

        </button>


        <button
            class="search"
            style="
                width:100%;
                min-height:52px;
                margin:0;
            "
            onclick="location.hash='edit-company-${company.id}'">

            ✏️ Edit Company

        </button>


        <button
            class="search"
            style="
                width:100%;
                min-height:52px;
                margin:0;
            "
            onclick="deleteCompanyConfirm(${company.id})">

            🗑 Delete Company

        </button>

    </div>

</div>


        <button
            class="search"
            style="margin-top:20px;"
            onclick="location.hash='companies'">

            ← Back to Companies

        </button>


        ${bottomNav("companies")}

    </div>

    `;

}


/* =========================================
   SAVE PIPELINE STAGE
========================================= */

function savePipelineStage(companyId) {

    const company = getCompany(companyId);

    if (!company) {

        console.error(
            "Pipeline save failed: company not found",
            companyId
        );

        return;

    }

    const select =
        document.getElementById("pipelineStage");

    if (!select) {

        console.error(
            "Pipeline save failed: selector not found"
        );

        return;

    }

    const selectedStage =
        select.value;

    if (!selectedStage) {

        console.error(
            "Pipeline save failed: no stage selected"
        );

        return;

    }

    company.pipelineStage =
        selectedStage;

    const saved =
        updateCompany(company);

    if (!saved) {

        console.error(
            "Pipeline save failed"
        );

        return;

    }

    loadCompany(companyId);

}


/* =========================================
   DELETE COMPANY
========================================= */

function deleteCompanyConfirm(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this company?"
        );

    if (!confirmDelete) {

        return;

    }

    deleteCompany(id);

    location.hash = "companies";

}
