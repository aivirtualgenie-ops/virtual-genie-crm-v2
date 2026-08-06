function loadAddTask(companyId){

const app=document.getElementById("app");

app.innerHTML=`

<div class="dashboard">

<div class="header">

<h1>Add Task</h1>

<p class="subtitle">

Create a follow-up task

</p>

</div>

<input
class="search"
id="taskTitle"
placeholder="Task Title">

<input
class="search"
id="taskDueDate"
type="date">

<select
class="search"
id="taskPriority">

<option>Low</option>
<option selected>Medium</option>
<option>High</option>

</select>

<textarea
class="search"
id="taskNotes"
placeholder="Notes"
style="height:150px;"></textarea>

<button
class="fab"
style="position:static;width:100%;height:60px;border-radius:18px;"
onclick="saveTask(${companyId})">

Save Task

</button>

<button
class="search"
style="margin-top:20px;"
onclick="loadTasks(${companyId})">

← Back to Tasks

</button>

${bottomNav("companies")}

</div>

`;

}

function saveTask(companyId){

const company=getCompany(companyId);

company.tasks.push({

id:Date.now(),

title:document.getElementById("taskTitle").value.trim(),

dueDate:document.getElementById("taskDueDate").value,

priority:document.getElementById("taskPriority").value,

status:"Pending",

notes:document.getElementById("taskNotes").value.trim()

});

updateCompany(company);

loadTasks(companyId);

}
