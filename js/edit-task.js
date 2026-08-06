function loadEditTask(companyId, taskId){

const company = getCompany(companyId);

const task = company.tasks.find(
t => t.id == taskId
);

const app = document.getElementById("app");

app.innerHTML = `

<div class="dashboard">

<div class="header">

<h1>Edit Task</h1>

<p class="subtitle">

${company.companyName}

</p>

</div>

<input
class="search"
id="taskTitle"
placeholder="Task Title"
value="${task.title}">

<input
class="search"
id="taskDueDate"
type="date"
value="${task.dueDate}">

<select
class="search"
id="taskPriority">

<option ${task.priority=="Low"?"selected":""}>Low</option>
<option ${task.priority=="Medium"?"selected":""}>Medium</option>
<option ${task.priority=="High"?"selected":""}>High</option>

</select>

<select
class="search"
id="taskStatus">

<option ${task.status=="Pending"?"selected":""}>Pending</option>
<option ${task.status=="Completed"?"selected":""}>Completed</option>

</select>

<textarea
class="search"
id="taskNotes"
style="height:150px;">

${task.notes}

</textarea>

<button
class="fab"
style="position:static;width:100%;height:60px;border-radius:18px;"
onclick="updateTask(${companyId},${taskId})">

Update Task

</button>

<button
class="search"
style="margin-top:20px;"
onclick="loadTasks(${companyId})">

← Back

</button>

${bottomNav("companies")}

</div>

`;

}

function updateTask(companyId, taskId){

const company = getCompany(companyId);

const task = company.tasks.find(
t => t.id == taskId
);

task.title = document.getElementById("taskTitle").value;
task.dueDate = document.getElementById("taskDueDate").value;
task.priority = document.getElementById("taskPriority").value;
task.status = document.getElementById("taskStatus").value;
task.notes = document.getElementById("taskNotes").value;

updateCompany(company);

loadTasks(companyId);

}
