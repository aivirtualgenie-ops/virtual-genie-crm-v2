function loadTasks(companyId){

const company = getCompany(companyId);

const app = document.getElementById("app");

let taskCards="";

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
