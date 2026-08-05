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
