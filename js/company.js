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
onclick="alert('Products coming next')">

📦 Products

</button>

<button
class="search"
onclick="alert('Tasks coming next')">

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
