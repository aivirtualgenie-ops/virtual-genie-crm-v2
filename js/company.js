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
class="fab"
style="position:static;width:100%;height:60px;border-radius:18px;"
onclick="location.hash='companies'">

Back

</button>

</div>

</div>

`;

return;

}

app.innerHTML = `

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

<br>

<div class="card">

<h3>Notes</h3>

<br>

<p>${company.notes || "No notes yet."}</p>

</div>

<br>

<div class="card">

<h3>Quick Actions</h3>

<br>

<button class="search"
onclick="alert('Call Log coming next')">

📞 Log Call

</button>

<br><br>

<button class="search"
onclick="alert('Products coming next')">

📦 Products

</button>

<br><br>

<button class="search"
onclick="alert('Tasks coming next')">

✅ Tasks

</button>

<br><br>

<button class="search"
onclick="alert('Edit coming next')">

✏ Edit

</button>

<br><br>

<button class="search"
onclick="alert('Delete coming next')">

🗑 Delete

</button>

</div>

<br>

<button
class="fab"
style="position:static;width:100%;height:60px;border-radius:18px;"
onclick="location.hash='companies'">

← Back to Companies

</button>

</div>

`;

}
