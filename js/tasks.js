function loadTasks(companyId){

const company = getCompany(companyId);

const app = document.getElementById("app");

if(!company.tasks){

company.tasks=[];

updateCompany(company);

}

let completed=0;
let pending=0;

let taskCards="";

company.tasks.forEach(task=>{

if(task.status==="Completed"){

completed++;

}else{

pending++;

}

});

if(company.tasks.length===0){

taskCards=`

<div class="card">

<h3>No Tasks Yet</h3>

<p>Create your first follow-up task.</p>

</div>

`;

}else{

company.tasks.forEach(task=>{

taskCards+=`

<div class="card">

<h3>${task.title}</h3>

<p><strong>Due:</strong> ${task.dueDate}</p>

<p><strong>Priority:</strong> ${task.priority}</p>

<p><strong>Status:</strong> ${task.status}</p>

<br>

<p>${task.notes}</p>

<br>

<button
class="search"
onclick="loadEditTask(${company.id},${task.id})"
✏️ Edit

</button>

<br><br>

<button
class="search"
onclick="deleteTaskConfirm(${company.id},${task.id})">

🗑 Delete

</button>

</div>

`;

});

}

app.innerHTML=`

<div class="dashboard">

<div class="header">

<h1>Tasks</h1>

<p class="subtitle">

${company.companyName}

</p>

</div>

<div class="card">

<p><strong>Total Tasks:</strong> ${company.tasks.length}</p>

<p><strong>Pending:</strong> ${pending}</p>

<p><strong>Completed:</strong> ${completed}</p>

</div>

${taskCards}

<button
class="fab"
onclick="loadAddTask(${company.id})">

+

</button>

<button
class="search"
style="margin-top:20px;"
onclick="loadCompany(${company.id})">

← Back to Company

</button>

${bottomNav("companies")}

</div>

`;

}

function deleteTaskConfirm(companyId, taskId){

const confirmDelete = confirm(
"Delete this task?"
);

if(!confirmDelete){

return;

}

deleteTask(companyId, taskId);

loadTasks(companyId);

}
