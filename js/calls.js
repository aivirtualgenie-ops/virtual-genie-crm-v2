function loadCalls(companyId){

const company = getCompany(companyId);

const app = document.getElementById("app");

let callCards = "";

if(company.calls.length===0){

callCards=`

<div class="card">

<h3>No Calls Yet</h3>

<p>Log your first call with this company.</p>

</div>

`;

}else{

company.calls.forEach(call=>{

callCards+=`

<div class="card">

<h3>${call.type}</h3>

<p><strong>Date:</strong> ${call.date}</p>
<p><strong>Outcome:</strong> ${call.outcome}</p>

<br>

<p>${call.notes}</p>

</div>

`;

});

}

app.innerHTML=`

<div class="dashboard">

<div class="header">

<h1>Call History</h1>

<p class="subtitle">

${company.companyName}

</p>

</div>

${callCards}

<button
class="fab"
onclick="loadAddCall(${company.id})">

+

</button>

${bottomNav("companies")}

</div>

`;

}

function loadAddCall(companyId){

const app=document.getElementById("app");

app.innerHTML=`

<div class="dashboard">

<div class="header">

<h1>Log Call</h1>

<p class="subtitle">

Record your conversation

</p>

</div>

<input
class="search"
id="callType"
placeholder="Call Type">

<input
class="search"
id="callOutcome"
placeholder="Outcome">

<textarea
class="search"
id="callNotes"
placeholder="Notes"
style="height:150px;"></textarea>

<button
class="fab"
style="position:static;width:100%;height:60px;border-radius:18px;"
onclick="saveCall(${companyId})">

Save Call

</button>

${bottomNav("companies")}

</div>

`;

}

function saveCall(companyId){

const company=getCompany(companyId);

company.calls.unshift({

date:new Date().toLocaleDateString(),

type:document.getElementById("callType").value,

outcome:document.getElementById("callOutcome").value,

notes:document.getElementById("callNotes").value

});

updateCompany(company);

loadCalls(companyId);

}
