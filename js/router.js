function router() {

const page = location.hash.replace("#","");

switch(page){

case "companies":
loadCompanies();
break;

default:
loadDashboard();

}

}

window.addEventListener("hashchange", router);

window.addEventListener("load", router);
