function router() {

const hash = location.hash.replace("#","");

if(hash.startsWith("company-")){

const id = hash.replace("company-","");

loadCompany(id);

return;

}

switch(hash){

case "companies":

loadCompanies();

break;

case "add-company":

loadAddCompany();

break;

default:

loadDashboard();

}

}

window.addEventListener("hashchange", router);

window.addEventListener("load", router);
