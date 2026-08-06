function loadAddCompany(id = null) {

const app = document.getElementById("app");

const isEditing = id !== null;

let company = null;

if(isEditing){

company = getCompany(id);

if(!company){

location.hash="companies";

return;

}

}

app.innerHTML = `

<div class="dashboard">

<div class="header">

<h1>${isEditing ? "Edit Company" : "Add Company"}</h1>

<p class="subtitle">

${isEditing ? "Update company information" : "Create a new lead or client"}

</p>

</div>

<input
class="search"
id="companyName"
placeholder="Company Name"
value="${company ? company.companyName : ""}">

<input
class="search"
id="contactPerson"
placeholder="Contact Person"
value="${company ? company.contactPerson : ""}">

<input
class="search"
id="phone"
placeholder="Phone Number"
value="${company ? company.phone : ""}">

<input
class="search"
id="email"
placeholder="Email"
value="${company ? company.email : ""}">

<textarea
class="search"
id="notes"
placeholder="Notes"
style="height:120px;resize:none;">${company ? company.notes : ""}</textarea>

<button
class="fab"
style="position:static;width:100%;height:60px;border-radius:18px;font-size:20px;"
onclick="${isEditing ? `updateCompanyForm(${company.id})` : `saveCompany()`}">

${isEditing ? "Update Company" : "Save Company"}

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

website:"",

address:"",

industry:"",

status:"Lead",

source:"Cold Call",

priority:"Medium",

products:[],

calls:[],

tasks:[],

pipelineValue:0,

revenue:0,

lastContact:"",

nextFollowUp:"",

createdAt:"",

updatedAt:""

};

if(company.companyName===""){

alert("Company Name is required.");

return;

}

addCompany(company);

location.hash="companies";

}

function updateCompanyForm(id){

const company = getCompany(id);

company.companyName = document.getElementById("companyName").value.trim();
company.contactPerson = document.getElementById("contactPerson").value.trim();
company.phone = document.getElementById("phone").value.trim();
company.email = document.getElementById("email").value.trim();
company.notes = document.getElementById("notes").value.trim();

company.website = company.website || "";
company.address = company.address || "";
company.industry = company.industry || "";

company.status = company.status || "Lead";
company.source = company.source || "Cold Call";
company.priority = company.priority || "Medium";

company.products = company.products || [];
company.calls = company.calls || [];
company.tasks = company.tasks || [];

company.pipelineValue = company.pipelineValue || 0;
company.revenue = company.revenue || 0;

company.lastContact = company.lastContact || "";
company.nextFollowUp = company.nextFollowUp || "";

updateCompany(company);

loadCompany(id);

}
