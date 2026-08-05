function loadAddCompany() {

const app = document.getElementById("app");

app.innerHTML = `

<div class="dashboard">

<div class="header">

<h1>Add Company</h1>

<p class="subtitle">
Create a new lead or client
</p>

</div>

<input
class="search"
id="companyName"
placeholder="Company Name">

<input
class="search"
id="contactPerson"
placeholder="Contact Person">

<input
class="search"
id="phone"
placeholder="Phone Number">

<input
class="search"
id="email"
placeholder="Email">

<textarea
class="search"
id="notes"
placeholder="Notes"
style="height:120px;resize:none;"></textarea>

<button
class="fab"
style="position:static;width:100%;height:60px;border-radius:18px;font-size:20px;"
onclick="saveCompany()">

Save Company

</button>

${bottomNav("companies")}

</div>

`;

}

function saveCompany() {

const company = {

companyName: document.getElementById("companyName").value.trim(),

contactPerson: document.getElementById("contactPerson").value.trim(),

phone: document.getElementById("phone").value.trim(),

email: document.getElementById("email").value.trim(),

notes: document.getElementById("notes").value.trim(),

website: "",

address: "",

industry: "",

status: "Lead",

source: "Cold Call",

priority: "Medium",

products: [],

calls: [],

tasks: [],

pipelineValue: 0,

revenue: 0,

lastContact: "",

nextFollowUp: "",

createdAt: "",

updatedAt: ""

};

if(company.companyName===""){

alert("Company Name is required.");

return;

}

addCompany(company);

location.hash="companies";

}
