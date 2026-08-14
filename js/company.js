function loadCompany(id) {

const company = getCompany(id);

const app = document.getElementById("app");

if(!company){

app.innerHTML=`

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

const pipelineStage = company.pipelineStage || "New Lead";

app.innerHTML=`

<div class="dashboard">

<div class="header">

<h1>${company.companyName}</h1>

<p class="subtitle">

${company.status}

</p>

</div>

<div class="card">

<h3>Contact Information</h3>

<br>

<p><strong>Contact:</strong> ${company.contactPerson || "-"}</p>
<p><strong>Phone:</strong> ${company.phone || "-"}</p>
<p><strong>Email:</strong> ${company.email || "-"}</p>
<p><strong>Website:</strong> ${company.website || "-"}</p>

</div>

<div class="card" style="margin-top:20px;">

<h3>Business Information</h3>

<br>

<p><strong>Industry:</strong> ${company.industry || "-"}</p>
<p><strong>Address:</strong> ${company.address || "-"}</p>
<p><strong>Priority:</strong> ${company.priority || "-"}</p>

</div>

<div class="card" style="margin-top:20px;">

<h3>Sales Information</h3>

<br>

<p><strong>Pipeline Value:</strong> ₹${company.pipelineValue || 0}</p>

<p><strong>Revenue:</strong> ₹${company.revenue || 0}</p>

<p><strong>Next Follow-up:</strong> ${company.nextFollowUp || "-"}</p>

<br>

<label>
<strong>Pipeline Stage</strong>
</label>

<select
class="search"
id="pipelineStage"
style="margin-top:10px;">

<option value="New Lead" ${pipelineStage==="New Lead"?"selected":""}>
New Lead
</option>

<option value="Contacted" ${pipelineStage==="Contacted"?"selected":""}>
Contacted
</option>

<option value="Meeting Scheduled" ${pipelineStage==="Meeting Scheduled"?"selected":""}>
Meeting Scheduled
</option>

<option value="Proposal Sent" ${pipelineStage==="Proposal Sent"?"selected":""}>
Proposal Sent
</option>

<option value="Negotiation" ${pipelineStage==="Negotiation"?"selected":""}>
Negotiation
</option>

<option value="Won" ${pipelineStage==="Won"?"selected":""}>
Won
</option>

<option value="Lost" ${pipelineStage==="Lost"?"selected":""}>
Lost
</option>

</select>

<button
class="fab"
style="position:static;width:100%;height:60px;border-radius:18px;margin-top:15px;"
onclick="savePipelineStage(${company.id})">

Save Pipeline Stage

</button>

</div>

<div class="card" style="margin-top:20px;">

<h3>Notes</h3>

<br>

<p>${company.notes || "No notes yet."}</p>

</div>

<div class="card" style="margin-top:20px;">

<h3>System Information</h3>

<br>

<p><strong>Created:</strong> ${company.createdAt || "-"}</p>

<p><strong>Last Updated:</strong> ${company.updatedAt || "-"}</p>

</div>

<div class="card" style="margin-top:20px;">

<h3>Quick Actions</h3>

<br>

<button
class="search"
onclick="loadCalls(${company.id})">

📞 Call History

</button>

<button
class="search"
onclick="loadProducts(${company.id})">

📦 Products

</button>

<button
class="search"
onclick="loadTasks(${company.id})">

✅ Tasks

</button>

<button
class="search"
onclick="location.hash='edit-company-${company.id}'">

✏️ Edit Company

</button>

<button
class="search"
onclick="deleteCompanyConfirm(${company.id})">

🗑 Delete Company

</button>

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

function savePipelineStage(companyId){

    alert("STEP 1: savePipelineStage was called");

    const company = getCompany(companyId);

    if(!company){

        alert("STEP 2: COMPANY NOT FOUND");

        return;
    }

    alert("STEP 2: Company found: " + company.companyName);

    const select = document.getElementById("pipelineStage");

    if(!select){

        alert("STEP 3: pipelineStage element NOT FOUND");

        return;
    }

    alert("STEP 3: Selected value = " + select.value);

    company.pipelineStage = select.value;

    alert("STEP 4: Saving " + company.pipelineStage);

    updateCompany(company);

    alert("STEP 5: updateCompany completed");

    loadCompany(companyId);

}

function deleteCompanyConfirm(id){

const confirmDelete = confirm(
"Are you sure you want to delete this company?"
);

if(!confirmDelete){

return;

}

deleteCompany(id);

location.hash="companies";

}
