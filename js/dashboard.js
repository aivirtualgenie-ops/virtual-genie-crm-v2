function loadDashboard() {

const app = document.getElementById("app");

app.innerHTML = `

<div class="min-h-screen bg-slate-950">

<header class="px-6 pt-8 pb-6">

<p class="text-slate-400 text-sm">
Good Evening 👋
</p>

<h1 class="text-3xl font-bold mt-1">
Virtual Genie CRM
</h1>

<p class="text-slate-500 mt-2">
Your business operating system
</p>

<div class="mt-6">

<input
type="text"
placeholder="Search companies..."
class="input">

</div>

</header>

<section class="px-6">

<div class="grid grid-cols-2 gap-4">

<div class="glass p-5">

<p class="label">
Calls Today
</p>

<h2 class="kpi">
0
</h2>

</div>

<div class="glass p-5">

<p class="label">
Follow-ups
</p>

<h2 class="kpi">
0
</h2>

</div>

<div class="glass p-5">

<p class="label">
Pipeline
</p>

<h2 class="kpi">
₹0
</h2>

</div>

<div class="glass p-5">

<p class="label">
Clients
</p>

<h2 class="kpi">
0
</h2>

</div>

</div>

</section>

</div>

`;

}
