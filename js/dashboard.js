function loadDashboard() {

const companies = getCompanies();

let totalProducts = 0;
let totalPipeline = 0;
let totalRevenue = 0;

companies.forEach(company => {

totalProducts += (company.products || []).length;

totalPipeline += Number(company.pipelineValue || 0);

totalRevenue += Number(company.revenue || 0);

});

const app = document.getElementById("app");

app.innerHTML = `

<div class="dashboard">

<div class="header">

<p class="greeting">

Good Evening 👋

</p>

<h1>

Virtual Genie CRM

</h1>

<p class="subtitle">

Your Business Operating System

</p>

<input
class="search"
placeholder="Search companies...">

</div>

<div class="stats">

<div class="stats-grid">

<div
class="card"
style="cursor:pointer;"
onclick="location.hash='companies'">

<p>Companies</p>

<h2>${companies.length}</h2>

</div>

<div
class="card"
style="cursor:pointer;"
onclick="loadGlobalProducts()">

<p>Products</p>

<h2>${totalProducts}</h2>

</div>

<div
class="card"
style="cursor:pointer;"
onclick="location.hash='pipeline'">

<p>Pipeline</p>

<h2>₹${totalPipeline}</h2>

</div>

<div
class="card"
style="cursor:pointer;"
onclick="alert('Revenue Analytics coming soon')">

<p>Revenue</p>

<h2>₹${totalRevenue}</h2>

</div>

</div>

<div class="card activity-card">

<h3>CRM Summary</h3>

<br>

<p><strong>Total Companies:</strong> ${companies.length}</p>

<p><strong>Total Products:</strong> ${totalProducts}</p>

<p><strong>Total Pipeline:</strong> ₹${totalPipeline}</p>

<p><strong>Total Revenue:</strong> ₹${totalRevenue}</p>

</div>

<div class="card task-card">

<h3>Coming Next</h3>

<br>

<p>✅ Sales Pipeline</p>

<br>

<p
style="cursor:pointer;"
onclick="location.hash='calendar'">

📅 Calendar

</p>

<br>

<p>✅ Notifications</p>

<br>

<p>✅ Analytics Dashboard</p>

</div>

</div>

<button
class="fab"
onclick="location.hash='companies'">

+

</button>

${bottomNav("dashboard")}

</div>

`;

}
