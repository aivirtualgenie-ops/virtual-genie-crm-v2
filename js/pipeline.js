function loadPipeline(){

const companies = getCompanies();

const stages = [

"New Lead",
"Contacted",
"Meeting Scheduled",
"Proposal Sent",
"Negotiation",
"Won",
"Lost"

];

const app = document.getElementById("app");

let html = `

<div class="dashboard">

<div class="header">

<h1>Sales Pipeline</h1>

<p class="subtitle">

Manage your sales process

</p>

</div>

`;

stages.forEach(stage=>{

const stageCompanies = companies.filter(company=>

(company.pipelineStage || "New Lead")===stage

);

html += `

<div class="card" style="margin-top:20px;">

<h3>${stage}</h3>

<p>${stageCompanies.length} Company(s)</p>

`;

if(stageCompanies.length===0){

html += `

<p>No companies</p>

`;

}else{

stageCompanies.forEach(company=>{

html += `

<div
class="card"
style="margin-top:15px;cursor:pointer;"
onclick="loadCompany(${company.id})">

<h3>${company.companyName}</h3>

<p>${company.contactPerson || "-"}</p>

<p>${company.phone || "-"}</p>

</div>

`;

});

}

html += `

</div>

`;

});

html += `

${bottomNav("dashboard")}

</div>

`;

app.innerHTML = html;

}
