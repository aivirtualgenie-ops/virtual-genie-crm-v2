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


/* =========================================
   FORMAT DEAL DATE
========================================= */

function formatDealDate(dateString) {

    if (!dateString) {
        return "-";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

}


/* =========================================
   LOAD COMPANY
========================================= */

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


    /* =====================================
       DEALS
    ===================================== */

    const deals =
        company.deals || [];


    let dealCards = "";


    if (deals.length === 0) {

        dealCards = `

        <div class="company-deals-empty">

            <div class="company-deals-empty-icon">
                💼
            </div>

            <h3>
                No Deals Yet
            </h3>

            <p>
                Create a sales opportunity for this company.
            </p>

            <button
                class="company-deal-add-button"
                onclick="showAddDealForm(${company.id})">

                + Add Deal

            </button>

        </div>

        `;

    } else {

        deals.forEach(deal => {

            const dealValue =
                Number(deal.value || 0);


            const dealStage =
                deal.stage || "New Lead";


            const dealStatus =
                deal.status || "Open";


            let statusClass =
                "deal-status-open";


            if (
                dealStatus.toLowerCase() ===
                "won"
            ) {

                statusClass =
                    "deal-status-won";

            } else if (
                dealStatus.toLowerCase() ===
                "lost"
            ) {

                statusClass =
                    "deal-status-lost";

            }


            dealCards += `

            <div class="company-deal-card">

                <div class="company-deal-top">

                    <div>

                        <span class="company-deal-label">
                            SALES OPPORTUNITY
                        </span>

                        <h3>
                            ${deal.name || "Unnamed Deal"}
                        </h3>

                    </div>

                    <span
                        class="company-deal-status ${statusClass}">

                        ${dealStatus}

                    </span>

                </div>


                <div class="company-deal-value">

                    <span>
                        DEAL VALUE
                    </span>

                    <strong>
                        ₹${dealValue}
                    </strong>

                </div>


                <div class="company-deal-details">

                    <div>

                        <span>
                            STAGE
                        </span>

                        <strong>
                            ${dealStage}
                        </strong>

                    </div>


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
                            CREATED
                        </span>

                        <strong>
                            ${formatDealDate(deal.createdAt)}
                        </strong>

                    </div>

                </div>


                <div class="company-deal-actions">

                    <button
                        class="company-deal-edit"
                        onclick="showEditDealForm(
                            ${company.id},
                            ${deal.id}
                        )">

                        Edit

                    </button>


                    <button
                        class="company-deal-delete"
                        onclick="deleteDealConfirm(
                            ${company.id},
                            ${deal.id}
                        )">

                        Delete

                    </button>

                </div>

            </div>

            `;

        });


        dealCards += `

        <button
            class="company-deal-add-button company-deal-add-full"
            onclick="showAddDealForm(${company.id})">

            + Add Deal

        </button>

        `;

    }


    /* =====================================
       PAGE
    ===================================== */

    app.innerHTML = `

    <div class="dashboard">


        <!-- HEADER -->

        <div class="header">

            <h1>
                ${company.companyName || "Company"}
            </h1>

            <p class="subtitle">
                ${company.status || "Client"}
            </p>

        </div>


        <!-- CONTACT INFORMATION -->

        <div class="card">

            <h3>
                Contact Information
            </h3>

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


        <!-- BUSINESS INFORMATION -->

        <div
            class="card"
            style="margin-top:20px;">

            <h3>
                Business Information
            </h3>

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


        <!-- SALES INFORMATION -->

        <div
            class="card"
            style="margin-top:20px;">

            <h3>
                Sales Information
            </h3>

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
                <strong>
                    Pipeline Stage
                </strong>
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


        <!-- =====================================
             DEALS
        ====================================== -->

        <div
            class="company-deals-section"
            style="margin-top:20px;">

            <div class="company-deals-header">

                <div>

                    <p class="company-deals-eyebrow">
                        SALES
                    </p>

                    <h2>
                        Deals
                    </h2>

                    <p>
                        Sales opportunities for this company
                    </p>

                </div>


                <div class="company-deals-count">
                    ${deals.length}
                </div>

            </div>


            ${dealCards}

        </div>


        <!-- NOTES -->

        <div
            class="card"
            style="margin-top:20px;">

            <h3>
                Notes
            </h3>

            <br>

            <p>
                ${company.notes || "No notes yet."}
            </p>

        </div>


        <!-- SYSTEM INFORMATION -->

        <div
            class="card"
            style="margin-top:20px;">

            <h3>
                System Information
            </h3>

            <br>

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

            <h3>
                Quick Actions
            </h3>

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


        <!-- BACK -->

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
   ADD DEAL FORM
========================================= */

function showAddDealForm(companyId) {

    const company =
        getCompany(companyId);

    if (!company) {
        return;
    }


    const products =
        company.products || [];


    let productOptions = `
        <option value="">
            No specific product
        </option>
    `;


    products.forEach(product => {

        productOptions += `

        <option value="${product.name || ""}">
            ${product.name || "Unnamed Product"}
        </option>

        `;

    });


    const app =
        document.getElementById("app");


    app.innerHTML = `

    <div class="dashboard">


        <div class="header">

            <h1>
                Add Deal
            </h1>

            <p class="subtitle">
                Create a sales opportunity for
                ${company.companyName}
            </p>

        </div>


        <div class="card">


            <label>
                <strong>
                    Deal Name
                </strong>
            </label>

            <input
                class="search"
                id="dealName"
                placeholder="e.g. Website Project"
                style="margin-top:8px;">


            <label
                style="
                    display:block;
                    margin-top:20px;
                ">

                <strong>
                    Product
                </strong>

            </label>

            <select
                class="search"
                id="dealProduct"
                style="margin-top:8px;">

                ${productOptions}

            </select>


            <label
                style="
                    display:block;
                    margin-top:20px;
                ">

                <strong>
                    Deal Value
                </strong>

            </label>

            <input
                class="search"
                id="dealValue"
                type="number"
                min="0"
                placeholder="0"
                style="margin-top:8px;">


            <label
                style="
                    display:block;
                    margin-top:20px;
                ">

                <strong>
                    Stage
                </strong>

            </label>

            <select
                class="search"
                id="dealStage"
                style="margin-top:8px;">

                <option>
                    New Lead
                </option>

                <option>
                    Contacted
                </option>

                <option>
                    Meeting Scheduled
                </option>

                <option>
                    Proposal Sent
                </option>

                <option>
                    Negotiation
                </option>

                <option>
                    Won
                </option>

                <option>
                    Lost
                </option>

            </select>


            <label
                style="
                    display:block;
                    margin-top:20px;
                ">

                <strong>
                    Status
                </strong>

            </label>

            <select
                class="search"
                id="dealStatus"
                style="margin-top:8px;">

                <option>
                    Open
                </option>

                <option>
                    Won
                </option>

                <option>
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
                    margin-top:25px;
                    font-size:19px;
                "
                onclick="saveNewDeal(${companyId})">

                Save Deal

            </button>


            <button
                class="search"
                style="
                    width:100%;
                    margin-top:15px;
                "
                onclick="loadCompany(${companyId})">

                ← Cancel

            </button>


        </div>


        ${bottomNav("companies")}

    </div>

    `;

}


/* =========================================
   SAVE NEW DEAL
========================================= */

function saveNewDeal(companyId) {

    const name =
        document
            .getElementById("dealName")
            .value
            .trim();


    const product =
        document
            .getElementById("dealProduct")
            .value;


    const value =
        Number(
            document
                .getElementById("dealValue")
                .value || 0
        );


    const stage =
        document
            .getElementById("dealStage")
            .value;


    const status =
        document
            .getElementById("dealStatus")
            .value;


    if (!name) {

        alert("Deal Name is required.");

        return;

    }


    if (value < 0) {

        alert("Deal Value cannot be negative.");

        return;

    }


    const deal = {

        name: name,

        product: product,

        value: value,

        stage: stage,

        status: status,

        createdAt:
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString()

    };


    const saved =
        addDeal(
            companyId,
            deal
        );


    if (!saved) {

        alert(
            "Could not save the deal."
        );

        return;

    }


    loadCompany(companyId);

}


/* =========================================
   EDIT DEAL FORM
========================================= */

function showEditDealForm(
    companyId,
    dealId
) {

    const company =
        getCompany(companyId);

    if (!company) {
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


    const products =
        company.products || [];


    let productOptions = `
        <option value="">
            No specific product
        </option>
    `;


    products.forEach(product => {

        const productName =
            product.name || "Unnamed Product";


        productOptions += `

        <option
            value="${productName}"
            ${deal.product === productName ? "selected" : ""}>

            ${productName}

        </option>

        `;

    });


    const app =
        document.getElementById("app");


    app.innerHTML = `

    <div class="dashboard">


        <div class="header">

            <h1>
                Edit Deal
            </h1>

            <p class="subtitle">
                Update sales opportunity
            </p>

        </div>


        <div class="card">


            <label>
                <strong>
                    Deal Name
                </strong>
            </label>

            <input
                class="search"
                id="dealName"
                value="${deal.name || ""}"
                style="margin-top:8px;">


            <label
                style="
                    display:block;
                    margin-top:20px;
                ">

                <strong>
                    Product
                </strong>

            </label>

            <select
                class="search"
                id="dealProduct"
                style="margin-top:8px;">

                ${productOptions}

            </select>


            <label
                style="
                    display:block;
                    margin-top:20px;
                ">

                <strong>
                    Deal Value
                </strong>

            </label>

            <input
                class="search"
                id="dealValue"
                type="number"
                min="0"
                value="${Number(deal.value || 0)}"
                style="margin-top:8px;">


            <label
                style="
                    display:block;
                    margin-top:20px;
                ">

                <strong>
                    Stage
                </strong>

            </label>

            <select
                class="search"
                id="dealStage"
                style="margin-top:8px;">

                <option
                    ${deal.stage === "New Lead" ? "selected" : ""}>
                    New Lead
                </option>

                <option
                    ${deal.stage === "Contacted" ? "selected" : ""}>
                    Contacted
                </option>

                <option
                    ${deal.stage === "Meeting Scheduled" ? "selected" : ""}>
                    Meeting Scheduled
                </option>

                <option
                    ${deal.stage === "Proposal Sent" ? "selected" : ""}>
                    Proposal Sent
                </option>

                <option
                    ${deal.stage === "Negotiation" ? "selected" : ""}>
                    Negotiation
                </option>

                <option
                    ${deal.stage === "Won" ? "selected" : ""}>
                    Won
                </option>

                <option
                    ${deal.stage === "Lost" ? "selected" : ""}>
                    Lost
                </option>

            </select>


            <label
                style="
                    display:block;
                    margin-top:20px;
                ">

                <strong>
                    Status
                </strong>

            </label>

            <select
                class="search"
                id="dealStatus"
                style="margin-top:8px;">

                <option
                    ${deal.status === "Open" ? "selected" : ""}>
                    Open
                </option>

                <option
                    ${deal.status === "Won" ? "selected" : ""}>
                    Won
                </option>

                <option
                    ${deal.status === "Lost" ? "selected" : ""}>
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
                    margin-top:25px;
                    font-size:19px;
                "
                onclick="
                    saveEditedDeal(
                        ${companyId},
                        ${deal.id}
                    )
                ">

                Update Deal

            </button>


            <button
                class="search"
                style="
                    width:100%;
                    margin-top:15px;
                "
                onclick="loadCompany(${companyId})">

                ← Cancel

            </button>


        </div>


        ${bottomNav("companies")}

    </div>

    `;

}


/* =========================================
   SAVE EDITED DEAL
========================================= */

function saveEditedDeal(
    companyId,
    dealId
) {

    const company =
        getCompany(companyId);


    if (!company) {
        return;
    }


    const existingDeal =
        (company.deals || []).find(
            deal =>
                String(deal.id) ===
                String(dealId)
        );


    if (!existingDeal) {

        alert("Deal not found.");

        return;

    }


    const name =
        document
            .getElementById("dealName")
            .value
            .trim();


    const product =
        document
            .getElementById("dealProduct")
            .value;


    const value =
        Number(
            document
                .getElementById("dealValue")
                .value || 0
        );


    const stage =
        document
            .getElementById("dealStage")
            .value;


    const status =
        document
            .getElementById("dealStatus")
            .value;


    if (!name) {

        alert("Deal Name is required.");

        return;

    }


    if (value < 0) {

        alert("Deal Value cannot be negative.");

        return;

    }


    const updatedDeal = {

        ...existingDeal,

        name: name,

        product: product,

        value: value,

        stage: stage,

        status: status

    };


    const saved =
        updateDeal(
            companyId,
            updatedDeal
        );


    if (!saved) {

        alert(
            "Could not update the deal."
        );

        return;

    }


    loadCompany(companyId);

}


/* =========================================
   DELETE DEAL
========================================= */

function deleteDealConfirm(
    companyId,
    dealId
) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this deal?"
        );


    if (!confirmed) {
        return;
    }


    const deleted =
        deleteDeal(
            companyId,
            dealId
        );


    if (!deleted) {

        alert(
            "Could not delete the deal."
        );

        return;

    }


    loadCompany(companyId);

}


/* =========================================
   SAVE PIPELINE STAGE
========================================= */

function savePipelineStage(companyId) {

    const company =
        getCompany(companyId);


    if (!company) {

        console.error(
            "Pipeline save failed: company not found",
            companyId
        );

        return;

    }


    const select =
        document.getElementById(
            "pipelineStage"
        );


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
