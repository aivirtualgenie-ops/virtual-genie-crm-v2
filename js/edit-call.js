function loadEditCall(companyId, callId){

const company = getCompany(companyId);

const call = company.calls.find(
c => c.id == callId
);

const app = document.getElementById("app");

app.innerHTML = `

<div class="dashboard">

<div class="header">

<h1>Edit Call</h1>

<p class="subtitle">

${company.companyName}

</p>

</div>

<input
class="search"
id="callType"
placeholder="Call Type"
value="${call.type}">

<input
class="search"
id="callDuration"
type="number"
placeholder="Duration (minutes)"
value="${call.duration}">

<input
class="search"
id="callOutcome"
placeholder="Outcome"
value="${call.outcome}">

<input
class="search"
id="callFollowUp"
type="date"
value="${call.followUp}">

<textarea
class="search"
id="callNotes"
style="height:150px;">

${call.notes}

</textarea>

<button
class="fab"
style="position:static;width:100%;height:60px;border-radius:18px;"
onclick="updateCall(${companyId},${callId})">

Update Call

</button>

<button
class="search"
style="margin-top:20px;"
onclick="loadCalls(${companyId})">

← Back

</button>

${bottomNav("companies")}

</div>

`;

}

function updateCall(companyId, callId){

const company = getCompany(companyId);

const call = company.calls.find(
c => c.id == callId
);

call.type = document.getElementById("callType").value;
call.duration = Number(document.getElementById("callDuration").value);
call.outcome = document.getElementById("callOutcome").value;
call.followUp = document.getElementById("callFollowUp").value;
call.notes = document.getElementById("callNotes").value;

updateCompany(company);

loadCalls(companyId);

}
