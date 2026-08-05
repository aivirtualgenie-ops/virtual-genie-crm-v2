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

</div>

<div class="card" style="margin-top:20px;">

<h3>Notes</h3>

<br>

<p>${company.notes || "No notes yet."}</p>

</div>

<div class="card" style="margin-top:20px;">

<h3>Quick Actions</h3>

<br>

<button class="search"
onclick="alert('Call Log coming next')">

📞 Log Call

</button>

<button class="search"
onclick="alert('Products coming next')">

📦 Products

</button>

<button class="search"
onclick="alert('Tasks coming next')">

✅ Tasks

</button>

<button class="search"
onclick="alert('Edit coming next')">

✏️ Edit Company

</button>

<button class="search"
onclick="alert('Delete coming next')">

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
