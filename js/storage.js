const STORAGE_KEY = "virtual_genie_crm";

function getCompanies() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    return JSON.parse(data);

}

function saveCompanies(companies) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(companies)
    );

}

function addCompany(company) {

    const companies = getCompanies();

    company.id = Date.now();

    company.createdAt = new Date().toISOString();

    company.updatedAt = new Date().toISOString();

    company.tasks = company.tasks || [];
    company.products = company.products || [];
    company.calls = company.calls || [];

    companies.push(company);

    saveCompanies(companies);

}

function getCompany(id) {

    return getCompanies().find(company => company.id == id);

}

function updateCompany(updatedCompany) {

    const companies = getCompanies();

    const index = companies.findIndex(
        company => company.id == updatedCompany.id
    );

    if (index !== -1) {

        updatedCompany.updatedAt = new Date().toISOString();

        companies[index] = updatedCompany;

        saveCompanies(companies);

    }

}

function deleteCompany(id) {

    const companies = getCompanies().filter(
        company => company.id != id
    );

    saveCompanies(companies);

}

function getProducts(companyId){

    const company = getCompany(companyId);

    if(!company.products){

        company.products=[];

    }

    return company.products;

}

function addProduct(companyId, product){

    const company=getCompany(companyId);

    if(!company.products){

        company.products=[];

    }

    company.products.push(product);

    updateCompany(company);

}

function deleteProduct(companyId, productId){

    const company=getCompany(companyId);

    company.products=company.products.filter(
        product=>product.id!=productId
    );

    updateCompany(company);

}

function getTasks(companyId){

    const company=getCompany(companyId);

    if(!company.tasks){

        company.tasks=[];

    }

    return company.tasks;

}

function addTask(companyId, task){

    const company=getCompany(companyId);

    if(!company.tasks){

        company.tasks=[];

    }

    company.tasks.push(task);

    updateCompany(company);

}

function deleteTask(companyId, taskId){

    const company=getCompany(companyId);

    company.tasks=company.tasks.filter(
        task=>task.id!=taskId
    );

    updateCompany(company);

}
