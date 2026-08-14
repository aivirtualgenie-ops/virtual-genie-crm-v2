function loadNotifications() {

const companies = getCompanies();

const app = document.getElementById("app");

let notifications = [];

const today = new Date();
today.setHours(0, 0, 0, 0);


/* DATE DIFFERENCE */

function getDifference(dateString) {

const date = new Date(dateString);
date.setHours(0, 0, 0, 0);

return Math.ceil(
(date - today) /
(1000 * 60 * 60 * 24)
);

}


/* ADD NOTIFICATION */

function addNotification(
type,
company,
details,
priority,
companyId,
difference
) {

notifications.push({

type,
company,
details,
priority,
companyId,
difference

});

}


/* PROCESS COMPANIES */

companies.forEach((company, companyIndex) => {

const companyId =
company.id ||
company.companyId ||
companyIndex;


/* COMPANY FOLLOW-UP */

if (company.nextFollowUp) {

const difference =
getDifference(company.nextFollowUp);

if (difference < 0) {

addNotification(
"Overdue Follow-up",
company.companyName,
"Company follow-up is overdue.",
"High",
companyId,
difference
);

} else if (difference === 0) {

addNotification(
"Follow-up Today",
company.companyName,
"Company follow-up is due today.",
"High",
companyId,
difference
);

} else if (difference <= 3) {

addNotification(
"Upcoming Follow-up",
company.companyName,
"Company follow-up is due in " +
difference +
" day(s).",
"Medium",
companyId,
difference
);

}

}


/* TASKS */

(company.tasks || []).forEach(task => {

if (!task.dueDate || task.status === "Completed") {
return;
}

const difference =
getDifference(task.dueDate);

if (difference < 0) {

addNotification(
"Overdue Task",
company.companyName,
task.title,
"High",
companyId,
difference
);

} else if (difference === 0) {

addNotification(
"Task Due Today",
company.companyName,
task.title,
task.priority || "Medium",
companyId,
difference
);

} else if (difference <= 3) {

addNotification(
"Upcoming Task",
company.companyName,
task.title,
task.priority || "Medium",
companyId,
difference
);

}

});


/* CALL FOLLOW-UPS */

(company.calls || []).forEach(call => {

if (!call.followUp) {
return;
}

const difference =
getDifference(call.followUp);

const details =
call.outcome ||
"Follow up after call";

if (difference < 0) {

addNotification(
"Overdue Call Follow-up",
company.companyName,
details,
"High",
companyId,
difference
);

} else if (difference === 0) {

addNotification(
"Call Follow-up Today",
company.companyName,
details,
"High",
companyId,
difference
);

} else if (difference <= 3) {

addNotification(
"Upcoming Call Follow-up",
company.companyName,
details,
"Medium",
companyId,
difference
);

}

});

});


/* SORT
   Overdue first,
   then today,
   then upcoming.
*/

notifications.sort((a, b) => {

return a.difference - b.difference;

});


/* BUILD NOTIFICATION CARDS */

let notificationCards = "";


if (notifications.length === 0) {

notificationCards = `

<div class="card">

<h3>You're all caught up 🎉</h3>

<p>
No upcoming or overdue notifications.
</p>

</div>

`;

} else {

notifications.forEach(notification => {

let icon = "🟡";
let status = "Upcoming";

if (notification.difference < 0) {

icon = "🔴";
status = "Overdue";

} else if (notification.difference === 0) {

icon = "🟢";
status = "Today";

}


let priorityIcon = "⚪";

if (notification.priority === "High") {

priorityIcon = "🔴";

} else if (notification.priority === "Medium") {

priorityIcon = "🟡";

} else if (notification.priority === "Low") {

priorityIcon = "🟢";

}


notificationCards += `

<div
class="card"
style="
margin-top:20px;
cursor:pointer;
"
onclick="location.hash='company-${notification.companyId}'">

<h3>
${icon} ${notification.type}
</h3>

<p>
<strong>Status:</strong>
${status}
</p>

<p>
<strong>Company:</strong>
${notification.company}
</p>

<p>
<strong>Details:</strong>
${notification.details}
</p>

<p>
<strong>Priority:</strong>
${priorityIcon}
${notification.priority}
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

<h1>Notifications</h1>

<p class="subtitle">
Follow-ups, tasks and reminders
</p>

</div>


<div class="card">

<p>
<strong>Total Notifications:</strong>
${notifications.length}
</p>

</div>


${notificationCards}


${bottomNav("notifications")}

</div>

`;

}
