function router() {

const hash = location.hash.replace("#","");


if(hash.startsWith("edit-company-")){

loadEditCompany(hash.replace("edit-company-",""));

return;

}

if(hash.startsWith("company-")){

loadCompany(hash.replace("company-",""));

return;

}

switch(hash){

case "companies":

loadCompanies();

break;

case "pipeline":

loadPipeline();

break;

case "calendar":

loadCalendar();

break;

case "notifications":

loadNotifications();

break;

case "analytics":

loadAnalytics();

break;

case "add-company":

loadAddCompany();

break;

default:

loadDashboard();

break;

}

}

window.addEventListener("hashchange", router);

window.addEventListener("load", router);
