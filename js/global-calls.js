function loadGlobalCalls(){

const companies = getCompanies();

const app = document.getElementById("app");

let calls=[];

companies.forEach(company=>{

(company.calls || []).forEach(call=>{

calls.push({

companyId:company.id,

companyName:company.companyName,

...call

});

});

});

calls.sort((a,b)=>b.id-a.id);

let callCards="";

if(calls.length===0){

callCards=`

<div class="global-call-empty">

    <div class="global-call-empty-icon">
        ☎
    </div>

    <h2>
        No calls yet
    </h2>

    <p>
        Calls from all your companies will appear here.
    </p>

    <button
        class="global-call-empty-button"
        onclick="location.hash='companies'">

        <span>+</span>
        Log a Call

    </button>

</div>

`;

}else{

calls.forEach(call=>{

callCards+=`

<div class="card">

<h3>${call.companyName}</h3>

<p><strong>Type:</strong> ${call.type}</p>

<p><strong>Date:</strong> ${call.date}</p>

<p><strong>Time:</strong> ${call.time}</p>

<p><strong>Duration:</strong> ${call.duration} min</p>

<p><strong>Outcome:</strong> ${call.outcome}</p>

<p><strong>Follow-up:</strong> ${call.followUp || "-"}</p>

<br>

<p>${call.notes}</p>

<br>

<button
class="search"
onclick="loadCompany(${call.companyId})">

Open Company

</button>

</div>

`;

});

}

app.innerHTML=`

<div class="dashboard">

<div class="global-calls-header">

    <div class="global-calls-icon">
        ☎
    </div>

    <div>

        <p class="global-calls-label">
            COMMUNICATION
        </p>

        <h1>
            All Calls
        </h1>

        <p class="global-calls-count">
            ${calls.length} ${calls.length === 1 ? "Call" : "Calls"} Logged
        </p>

    </div>

</div>

${callCards}

${bottomNav("calls")}

</div>

`;

}
