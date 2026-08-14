function loadAnalytics(){

const companies = getCompanies();

const app = document.getElementById("app");

let totalPipeline = 0;
let totalRevenue = 0;
let totalProducts = 0;
let totalCalls = 0;
let totalTasks = 0;
let completedTasks = 0;

let wonDeals = 0;
let lostDeals = 0;

const stages = {

"New Lead": 0,
"Contacted": 0,
"Meeting Scheduled": 0,
"Proposal Sent": 0,
"Negotiation": 0,
"Won": 0,
"Lost": 0

};

companies.forEach(company => {

totalPipeline += Number(company.pipelineValue || 0);

totalRevenue += Number(company.revenue || 0);

totalProducts += (company.products || []).length;

totalCalls += (company.calls || []).length;

totalTasks += (company.tasks || []).length;

completedTasks +=
(company.tasks || []).filter(
task => task.status === "Completed"
).length;

const stage = company.pipelineStage || "New Lead";

if(stages[stage] !== undefined){

stages[stage]++;

}

if(stage === "Won"){

wonDeals++;

}

if(stage === "Lost"){

lostDeals++;

}

});

/* CONVERSION RATE */

const totalClosed = wonDeals + lostDeals;

const conversionRate =
totalClosed > 0
?
((wonDeals / totalClosed) * 100).toFixed(1)
:
"0.0";

/* TASK COMPLETION */

const taskCompletion =
totalTasks > 0
?
((completedTasks / totalTasks) * 100).toFixed(1)
:
"0.0";

/* STAGE CARDS */

let stageCards = "";

Object.keys(stages).forEach(stage => {

stageCards += `

<div
class="card"
style="margin-top:15px;">

<h3>${stage}</h3>

<p>
<strong>Companies:</strong>
${stages[stage]}
</p>

</div>

`;

});

/* PAGE */

app.innerHTML = `

<div class="dashboard">

<div class="header">

<h1>Analytics Dashboard</h1>

<p class="subtitle">

CRM performance overview

</p>

</div>

<div class="stats">

<div class="stats-grid">

<div class="card">

<p>Total Companies</p>

<h2>${companies.length}</h2>

</div>

<div class="card">

<p>Total Pipeline</p>

<h2>₹${totalPipeline}</h2>

</div>

<div class="card">

<p>Total Revenue</p>

<h2>₹${totalRevenue}</h2>

</div>

<div class="card">

<p>Conversion Rate</p>

<h2>${conversionRate}%</h2>

</div>

</div>

</div>

<div
class="card"
style="margin-top:20px;">

<h2>Sales Activity</h2>

<br>

<p>
<strong>Total Calls:</strong>
${totalCalls}
</p>

<p>
<strong>Total Tasks:</strong>
${totalTasks}
</p>

<p>
<strong>Completed Tasks:</strong>
${completedTasks}
</p>

<p>
<strong>Task Completion:</strong>
${taskCompletion}%
</p>

<p>
<strong>Won Deals:</strong>
${wonDeals}
</p>

<p>
<strong>Lost Deals:</strong>
${lostDeals}
</p>

</div>

<div
class="card"
style="margin-top:20px;">

<h2>Products</h2>

<br>

<p>
<strong>Total Products:</strong>
${totalProducts}
</p>

</div>

<div
class="card"
style="margin-top:20px;">

<h2>Pipeline Breakdown</h2>

${stageCards}

</div>

<button
class="search"
style="margin-top:20px;"
onclick="location.hash=''">

← Back to Dashboard

</button>

${bottomNav("dashboard")}

</div>

`;

}
