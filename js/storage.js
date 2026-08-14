const STORAGE_KEY = "virtual_genie_crm";


/* ================================
   GET ALL COMPANIES
================================ */

function getCompanies() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
        return [];
    }

    try {

        return JSON.parse(data);

    } catch (error) {

        console.error("Failed to read CRM data:", error);

        return [];

    }

}


/* ================================
   SAVE ALL COMPANIES
================================ */

function saveCompanies(companies) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(companies)
    );

}


/* ================================
   ADD COMPANY
================================ */

function addCompany(company) {

    const companies = getCompanies();

    company.id = Date.now();

    company.createdAt =
        new Date().toISOString();

    company.updatedAt =
        new Date().toISOString();

    company.tasks =
        company.tasks || [];

    company.products =
        company.products || [];

    company.calls =
        company.calls || [];

    company.pipelineStage =
        company.pipelineStage || "New Lead";

    companies.push(company);

    saveCompanies(companies);

}


/* ================================
   GET SINGLE COMPANY
================================ */

function getCompany(id) {

    const companies = getCompanies();

    return companies.find(
        company =>
            String(company.id) === String(id)
    );

}


/* ================================
   UPDATE COMPANY
================================ */

function updateCompany(updatedCompany) {

    const companies = getCompanies();

    const index = companies.findIndex(
        company =>
            String(company.id) ===
            String(updatedCompany.id)
    );

    if (index === -1) {

        console.error(
            "Company not found for update:",
            updatedCompany.id
        );

        return false;

    }

    updatedCompany.updatedAt =
        new Date().toISOString();

    companies[index] = updatedCompany;

    saveCompanies(companies);

    return true;

}


/* ================================
   DELETE COMPANY
================================ */

function deleteCompany(id) {

    const companies = getCompanies();

    const filteredCompanies =
        companies.filter(
            company =>
                String(company.id) !== String(id)
        );

    saveCompanies(filteredCompanies);

}


/* ================================
   PRODUCTS
================================ */

function getProducts(companyId) {

    const company = getCompany(companyId);

    if (!company) {
        return [];
    }

    if (!company.products) {

        company.products = [];

        updateCompany(company);

    }

    return company.products;

}


function addProduct(companyId, product) {

    const company = getCompany(companyId);

    if (!company) {

        console.error(
            "Company not found:",
            companyId
        );

        return false;

    }

    if (!company.products) {

        company.products = [];

    }

    company.products.push(product);

    return updateCompany(company);

}


function deleteProduct(companyId, productId) {

    const company = getCompany(companyId);

    if (!company) {

        console.error(
            "Company not found:",
            companyId
        );

        return false;

    }

    company.products =
        (company.products || []).filter(
            product =>
                String(product.id) !==
                String(productId)
        );

    return updateCompany(company);

}


/* ================================
   TASKS
================================ */

function getTasks(companyId) {

    const company = getCompany(companyId);

    if (!company) {
        return [];
    }

    if (!company.tasks) {

        company.tasks = [];

        updateCompany(company);

    }

    return company.tasks;

}


function addTask(companyId, task) {

    const company = getCompany(companyId);

    if (!company) {

        console.error(
            "Company not found:",
            companyId
        );

        return false;

    }

    if (!company.tasks) {

        company.tasks = [];

    }

    company.tasks.push(task);

    return updateCompany(company);

}


function deleteTask(companyId, taskId) {

    const company = getCompany(companyId);

    if (!company) {

        console.error(
            "Company not found:",
            companyId
        );

        return false;

    }

    company.tasks =
        (company.tasks || []).filter(
            task =>
                String(task.id) !==
                String(taskId)
        );

    return updateCompany(company);

}
