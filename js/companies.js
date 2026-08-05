function loadCompanies() {

const app = document.getElementById("app");

const companies = getCompanies();

let companyCards = "";

if(companies.length===0){

companyCards=`

<div class="card">

<h3>No Companies Yet</h3>

<br>

<p>Tap the + button to add your first company.</p>

</div>

`;

}else{

companies.forEach(company=>{

companyCards+=`

<div
class="card"
style="cursor:pointer;"
onclick="location.hash='company-${company.id}'">

<h3>${company.companyName}</h3>

<p>${company.contactPerson || "-"}</p>

<p>${company.phone || "-"}</p>

<p>${company.email || "-"}</p>

<p>Status: ${company.status}</p>

</div>

`;

});

}

app.innerHTML=`

<div class="dashboard">

<div class="header">

<h1>Companies</h1>

<p class="subtitle">
Manage all your leads and clients
</p>

<input
class="search"
placeholder="Search companies...">

</div>

${companyCards}

<button
class="fab"
onclick="location.hash='add-company'">

+

</button>

${bottomNav("companies")}

</div>

`;

}
