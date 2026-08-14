function loadCalendar(){

const companies = getCompanies();

const app = document.getElementById("app");

let events = [];

/* COMPANY FOLLOW-UPS */

companies.forEach(company => {

if(company.nextFollowUp){

events.push({

type: "Company Follow-up",

date: company.nextFollowUp,

company: company.companyName,

description: "Company follow-up",

priority: company.priority || "Medium"

});

}

/* TASKS */

(company.tasks || []).forEach(task => {

if(task.dueDate){

events.push({

type: "Task",

date: task.dueDate,

company: company.companyName,

description: task.title,

priority: task.priority || "Medium"

});

}

});

/* CALL FOLLOW-UPS */

(company.calls || []).forEach(call => {

if(call.followUp){

events.push({

type: "Call Follow-up",

date: call.followUp,

company: company.companyName,

description: call.outcome || "Follow up after call",

priority: "Medium"

});

}

});

});

/* SORT BY DATE */

events.sort((a,b) => {

return new Date(a.date) - new Date(b.date);

});

/* BUILD EVENT CARDS */

let eventCards = "";

if(events.length === 0){

eventCards = `

<div class="card">

<h3>No Upcoming Events</h3>

<p>Your calendar is currently empty.</p>

</div>

`;

}else{

events.forEach(event => {

eventCards += `

<div
class="card"
style="margin-top:20px;">

<h3>${event.type}</h3>

<p>
<strong>Date:</strong>
${event.date}
</p>

<p>
<strong>Company:</strong>
${event.company}
</p>

<p>
<strong>Details:</strong>
${event.description}
</p>

<p>
<strong>Priority:</strong>
${event.priority}
</p>

</div>

`;

});

}

/* PAGE */

app.innerHTML = `

<div class="dashboard">

<div class="header">

<h1>Calendar</h1>

<p class="subtitle">
Follow-ups, tasks and call reminders
</p>

</div>

<div class="card">

<p>
<strong>Total Events:</strong>
${events.length}
</p>

</div>

${eventCards}

${bottomNav("calendar")}

</div>

`;

}
