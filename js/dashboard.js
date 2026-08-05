function loadDashboard() {

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
<div class="card">

<p>Calls Today</p>

<h2>0</h2>

</div>

<div class="card">

<p>Follow-ups</p>

<h2>0</h2>

</div>

<div class="card">

<p>Pipeline</p>

<h2>₹0</h2>

</div>

<div class="card">

<p>Clients</p>

<h2>0</h2>

</div>

</div>

</div>

`;

}
