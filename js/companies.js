function loadCompanies(searchText = "") {

const app = document.getElementById("app");

const companies = getCompanies();

const filteredCompanies = companies.filter(company=>{

const search = searchText.toLowerCase();

return (

(company.companyName || "").toLowerCase().includes(search) ||

(company.contactPerson || "").toLowerCase().includes(search) ||

(company.phone || "").toLowerCase().includes(search) ||

(company.email || "").toLowerCase().includes(search) ||

(company.industry || "").toLowerCase().includes(search)

);

});

let companyCards = "";

if(filteredCompanies.length===0){

companyCards=`

<div class="card">

<h3>No Companies Found</h3>

<br>

<p>Try another search.</p>

</div>

`;

}else{

filteredCompanies.forEach(company=>{

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
id="companySearch"
placeholder="Search companies..."
value="${searchText}"
oninput="loadCompanies(this.value)">

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
