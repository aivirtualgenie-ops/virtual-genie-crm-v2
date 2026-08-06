function loadCalls(companyId){

const company = getCompany(companyId);

const app = document.getElementById("app");

if(!company.calls){

company.calls=[];

updateCompany(company);

}

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
<p><strong>Time:</strong> ${call.time}</p>
<p><strong>Duration:</strong> ${call.duration} min</p>
<p><strong>Outcome:</strong> ${call.outcome}</p>
<p><strong>Next Follow-up:</strong> ${call.followUp}</p>

<br>

<p>${call.notes}</p>

<br>

<button
class="search"
onclick="loadEditCall(${companyId},${call.id})">

✏️ Edit

</button>

<br><br>

<button
class="search"
onclick="deleteCallConfirm(${companyId},${call.id})">

🗑 Delete

</button>

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
class="search"
style="margin-top:20px;"
onclick="loadCompany(${company.id})">

← Back to Company

</button>

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
id="callDuration"
type="number"
placeholder="Duration (minutes)">

<input
class="search"
id="callOutcome"
placeholder="Outcome">

<input
class="search"
id="callFollowUp"
type="date">

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

<button
class="search"
style="margin-top:20px;"
onclick="loadCalls(${companyId})">

← Back to Call History

</button>

${bottomNav("companies")}

</div>

`;

}

function saveCall(companyId){

const company=getCompany(companyId);

company.calls.unshift({

id:Date.now(),

date:new Date().toLocaleDateString(),

time:new Date().toLocaleTimeString(),

type:document.getElementById("callType").value,

duration:Number(document.getElementById("callDuration").value),

outcome:document.getElementById("callOutcome").value,

followUp:document.getElementById("callFollowUp").value,

notes:document.getElementById("callNotes").value

});

updateCompany(company);

loadCalls(companyId);

}

function deleteCallConfirm(companyId, callId){

const confirmDelete = confirm(
"Delete this call?"
);

if(!confirmDelete){

return;

}

const company = getCompany(companyId);

company.calls = company.calls.filter(
call => call.id != callId
);

updateCompany(company);

loadCalls(companyId);

}
