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

<div class="global-call-card">

    <div class="global-call-card-top">

        <div class="global-call-company">
            <div class="global-call-company-icon">
                ☎
            </div>

            <div>
                <h3>${call.companyName}</h3>

                <span class="global-call-type">
                    ${call.type}
                </span>
            </div>
        </div>

        <div class="global-call-outcome">
            ${call.outcome}
        </div>

    </div>


    <div class="global-call-details">

        <div class="global-call-detail">
            <span>DATE</span>
            <strong>${call.date}</strong>
        </div>

        <div class="global-call-detail">
            <span>TIME</span>
            <strong>${call.time}</strong>
        </div>

        <div class="global-call-detail">
            <span>DURATION</span>
            <strong>${call.duration} min</strong>
        </div>

    </div>


    <div class="global-call-notes">

        <span>NOTES</span>

        <p>
            ${call.notes || "No notes added."}
        </p>

    </div>


    <div class="global-call-footer">

        <div class="global-call-followup">

            <span>FOLLOW-UP</span>

            <strong>
                ${call.followUp || "None"}
            </strong>

        </div>

        <button
            class="global-call-open"
            onclick="loadCompany(${call.companyId})">

            Open Company
            <span>→</span>

        </button>

    </div>

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
