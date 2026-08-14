function loadCalendar() {

const companies = getCompanies();

const app = document.getElementById("app");

let events = [];

/* GET TODAY AS LOCAL DATE */

const today = new Date();

today.setHours(0, 0, 0, 0);


/* DATE HELPER */

function getEventDate(dateString) {

const date = new Date(dateString);

date.setHours(0, 0, 0, 0);

return date;

}


/* FORMAT DATE */

function formatDate(dateString) {

const date = new Date(dateString);

return date.toLocaleDateString("en-IN", {

day: "numeric",
month: "short",
year: "numeric"

});

}


/* COMPANY FOLLOW-UPS */

companies.forEach((company, companyIndex) => {

if (company.nextFollowUp) {

events.push({

type: "Company Follow-up",

date: company.nextFollowUp,

company: company.companyName,

description: "Company follow-up",

priority: company.priority || "Medium",

companyId: company.id || company.companyId || companyIndex

});

}


/* TASKS */

(company.tasks || []).forEach(task => {

if (task.dueDate) {

events.push({

type: "Task",

date: task.dueDate,

company: company.companyName,

description: task.title,

priority: task.priority || "Medium",

companyId: company.id || company.companyId || companyIndex

});

}

});


/* CALL FOLLOW-UPS */

(company.calls || []).forEach(call => {

if (call.followUp) {

events.push({

type: "Call Follow-up",

date: call.followUp,

company: company.companyName,

description: call.outcome || "Follow up after call",

priority: "Medium",

companyId: company.id || company.companyId || companyIndex

});

}

});

});


/* SORT BY DATE */

events.sort((a, b) => {

return getEventDate(a.date) - getEventDate(b.date);

});


/* BUILD EVENT CARDS */

let eventCards = "";


if (events.length === 0) {

eventCards = `

<div class="card">

<h3>No Upcoming Events</h3>

<p>Your calendar is currently empty.</p>

</div>

`;

} else {

events.forEach((event, index) => {

const eventDate = getEventDate(event.date);

let status = "";
let statusText = "";
let statusIcon = "📅";


if (eventDate < today) {

status = "overdue";
statusText = "Overdue";
statusIcon = "🔴";

} else if (eventDate.getTime() === today.getTime()) {

status = "today";
statusText = "Today";
statusIcon = "🟢";

} else {

status = "upcoming";
statusText = "Upcoming";
statusIcon = "🟡";

}


/* PRIORITY */

let priorityIcon = "⚪";

if (event.priority === "High") {

priorityIcon = "🔴";

} else if (event.priority === "Medium") {

priorityIcon = "🟡";

} else if (event.priority === "Low") {

priorityIcon = "🟢";

}


/* CLICK EVENT */

const clickAction = `location.hash='company-${event.companyId}'`;


eventCards += `

<div
class="card calendar-event ${status}"
style="
margin-top:20px;
cursor:pointer;
"
onclick="${clickAction}">

<h3>
${statusIcon} ${event.type}
</h3>

<p>
<strong>Status:</strong>
${statusText}
</p>

<p>
<strong>Date:</strong>
${formatDate(event.date)}
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
${priorityIcon} ${event.priority}
</p>

<p
style="
margin-top:15px;
font-size:14px;
opacity:0.7;
">
Tap to open company
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
