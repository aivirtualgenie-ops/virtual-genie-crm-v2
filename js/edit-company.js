function loadEditCompany(id){

const company = getCompany(id);

const app = document.getElementById("app");

if(!company){

location.hash="companies";

return;

}

app.innerHTML=`

<div class="dashboard">

<div class="header">

<h1>Edit Company</h1>

<p class="subtitle">
Manage company information
</p>

</div>

<h3 style="margin-bottom:12px;">Basic Information</h3>

<input
class="search"
id="companyName"
placeholder="Company Name"
value="${company.companyName}">

<input
class="search"
id="contactPerson"
placeholder="Contact Person"
value="${company.contactPerson}">

<input
class="search"
id="phone"
placeholder="Phone Number"
value="${company.phone}">

<input
class="search"
id="email"
placeholder="Email"
value="${company.email}">

<h3 style="margin:20px 0 12px;">Sales</h3>

<select
class="search"
id="status">

<option ${company.status=="Lead"?"selected":""}>Lead</option>
<option ${company.status=="Contacted"?"selected":""}>Contacted</option>
<option ${company.status=="Proposal"?"selected":""}>Proposal</option>
<option ${company.status=="Client"?"selected":""}>Client</option>
<option ${company.status=="Lost"?"selected":""}>Lost</option>

</select>

<select
class="search"
id="priority">

<option ${company.priority=="High"?"selected":""}>High</option>
<option ${company.priority=="Medium"?"selected":""}>Medium</option>
<option ${company.priority=="Low"?"selected":""}>Low</option>

</select>

<textarea
class="search"
id="notes"
placeholder="Notes"
style="height:140px;resize:none;">${company.notes}</textarea>

<button
class="fab"
style="position:static;width:100%;height:60px;border-radius:18px;"
onclick="saveEditedCompany(${company.id})">

Update Company

</button>

<button
class="search"
style="margin-top:20px;"
onclick="location.hash='company-${company.id}'">

← Back to Company

</button>

${bottomNav("companies")}

</div>

`;

}

function saveEditedCompany(id){

const company = getCompany(id);

company.companyName = document.getElementById("companyName").value.trim();
company.contactPerson = document.getElementById("contactPerson").value.trim();
company.phone = document.getElementById("phone").value.trim();
company.email = document.getElementById("email").value.trim();
company.status = document.getElementById("status").value;
company.priority = document.getElementById("priority").value;
company.notes = document.getElementById("notes").value.trim();

updateCompany(company);

location.hash = "company-" + id;

}
