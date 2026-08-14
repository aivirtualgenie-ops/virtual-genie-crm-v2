function loadNotifications(){

const companies = getCompanies();

const app = document.getElementById("app");

let notifications = [];

const today = new Date();
today.setHours(0,0,0,0);

companies.forEach(company => {

/* COMPANY FOLLOW-UP */

if(company.nextFollowUp){

const followUpDate = new Date(company.nextFollowUp);
followUpDate.setHours(0,0,0,0);

const difference =
Math.ceil(
(followUpDate - today) /
(1000 * 60 * 60 * 24)
);

if(difference < 0){

notifications.push({

type:"Overdue Follow-up",
company:company.companyName,
details:"Company follow-up is overdue.",
priority:"High"

});

}else if(difference === 0){

notifications.push({

type:"Follow-up Today",
company:company.companyName,
details:"Company follow-up is due today.",
priority:"High"

});

}else if(difference <= 3){

notifications.push({

type:"Upcoming Follow-up",
company:company.companyName,
details:"Company follow-up is due in " + difference + " day(s).",
priority:"Medium"

});

}

}

/* TASKS */

(company.tasks || []).forEach(task => {

if(!task.dueDate || task.status === "Completed"){
return;
}

const dueDate = new Date(task.dueDate);
dueDate.setHours(0,0,0,0);

const difference =
Math.ceil(
(dueDate - today) /
(1000 * 60 * 60 * 24)
);

if(difference < 0){

notifications.push({

type:"Overdue Task",
company:company.companyName,
details:task.title,
priority:"High"

});

}else if(difference === 0){

notifications.push({

type:"Task Due Today",
company:company.companyName,
details:task.title,
priority:task.priority || "Medium"

});

}else if(difference <= 3){

notifications.push({

type:"Upcoming Task",
company:company.companyName,
details:task.title,
priority:task.priority || "Medium"

});

}

});

/* CALL FOLLOW-UPS */

(company.calls || []).forEach(call => {

if(!call.followUp){
return;
}

const followUpDate = new Date(call.followUp);
followUpDate.setHours(0,0,0,0);

const difference =
Math.ceil(
(followUpDate - today) /
(1000 * 60 * 60 * 24)
);

if(difference < 0){

notifications.push({

type:"Overdue Call Follow-up",
company:company.companyName,
details:call.outcome || "Follow up after call",
priority:"High"

});

}else if(difference === 0){

notifications.push({

type:"Call Follow-up Today",
company:company.companyName,
details:call.outcome || "Follow up after call",
priority:"High"

});

}else if(difference <= 3){

notifications.push({

type:"Upcoming Call Follow-up",
company:company.companyName,
details:call.outcome || "Follow up after call",
priority:"Medium"

});

}

});

});

/* BUILD NOTIFICATIONS */

let notificationCards = "";

if(notifications.length === 0){

notificationCards = `

<div class="card">

<h3>You're all caught up 🎉</h3>

<p>No upcoming or overdue notifications.</p>

</div>

`;

}else{

notifications.forEach(notification => {

notificationCards += `

<div
class="card"
style="margin-top:20px;">

<h3>${notification.type}</h3>

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
${notification.priority}
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
