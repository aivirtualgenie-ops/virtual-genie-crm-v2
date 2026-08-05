function router() {

const page = location.hash.replace("#","");

switch(page){

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
