/* =========================================
   STORAGE
========================================= */

const STORAGE_KEY = "virtual_genie_crm";


/* =========================================
   GET ALL COMPANIES
========================================= */

function getCompanies() {

    const data =
        localStorage.getItem(STORAGE_KEY);

    if (!data) {

        return [];

    }

    try {

        return JSON.parse(data);

    } catch (error) {

        console.error(
            "Failed to parse CRM storage:",
            error
        );

        return [];

    }

}


/* =========================================
   SAVE ALL COMPANIES
========================================= */

function saveCompanies(companies) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(companies)
        );

        return true;

    } catch (error) {

        console.error(
            "Failed to save companies:",
            error
        );

        return false;

    }

}


/* =========================================
   ADD COMPANY
========================================= */

function addCompany(company) {

    const companies =
        getCompanies();

    company.id = Date.now();

    company.createdAt =
        new Date().toISOString();

    company.updatedAt =
        new Date().toISOString();

    company.pipelineStage =
        company.pipelineStage || "New Lead";

    company.tasks =
        company.tasks || [];

    company.products =
        company.products || [];

    company.calls =
        company.calls || [];

    /* NEW: DEALS */

    company.deals =
        company.deals || [];

    companies.push(company);

    return saveCompanies(companies);

}


/* =========================================
   GET SINGLE COMPANY
========================================= */

function getCompany(id) {

    const companies =
        getCompanies();

    return companies.find(
        company =>
            String(company.id) ===
            String(id)
    );

}


/* =========================================
   UPDATE COMPANY
========================================= */

function updateCompany(updatedCompany) {

    if (!updatedCompany) {

        console.error(
            "updateCompany: no company provided"
        );

        return false;

    }


    const companies =
        getCompanies();


    const index =
        companies.findIndex(
            company =>
                String(company.id) ===
                String(updatedCompany.id)
        );


    if (index === -1) {

        console.error(
            "updateCompany: company not found",
            updatedCompany.id
        );

        return false;

    }


    /* ================================
       UPDATE TIMESTAMP
    ================================= */

    updatedCompany.updatedAt =
        new Date().toISOString();


    /* ================================
       PRESERVE ARRAYS
    ================================= */

    updatedCompany.tasks =
        updatedCompany.tasks || [];

    updatedCompany.products =
        updatedCompany.products || [];

    updatedCompany.calls =
        updatedCompany.calls || [];

    /* NEW: DEALS */

    updatedCompany.deals =
        updatedCompany.deals || [];


    /* ================================
       REPLACE COMPANY
    ================================= */

    companies[index] =
        updatedCompany;


    /* ================================
       SAVE
    ================================= */

    const saved =
        saveCompanies(companies);


    if (!saved) {

        console.error(
            "updateCompany: localStorage save failed"
        );

        return false;

    }


    console.log(
        "Company successfully updated:",
        updatedCompany.companyName,
        "Pipeline:",
        updatedCompany.pipelineStage
    );


    return true;

}


/* =========================================
   DELETE COMPANY
========================================= */

function deleteCompany(id) {

    const companies =
        getCompanies();

    const filtered =
        companies.filter(
            company =>
                String(company.id) !==
                String(id)
        );

    if (
        filtered.length ===
        companies.length
    ) {

        console.error(
            "deleteCompany: company not found",
            id
        );

        return false;

    }

    return saveCompanies(filtered);

}


/* =========================================
   PRODUCTS
========================================= */

function getProducts(companyId) {

    const company =
        getCompany(companyId);

    if (!company) {

        console.error(
            "Company not found:",
            companyId
        );

        return [];

    }

    if (!company.products) {

        company.products = [];

    }

    return company.products;

}


function addProduct(companyId, product) {

    const company =
        getCompany(companyId);

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


function deleteProduct(
    companyId,
    productId
) {

    const company =
        getCompany(companyId);

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


/* =========================================
   DEALS / SALES OPPORTUNITIES
========================================= */

/*
   Phase 1 only:
   Adds safe CRUD for deals.

   This does NOT change:
   - pipelineValue
   - revenue
   - products
   - calls
   - tasks
   - pipelineStage

   Deals are simply stored alongside
   the existing company data.
*/


/* =========================================
   GET DEALS
========================================= */

function getDeals(companyId) {

    const company =
        getCompany(companyId);

    if (!company) {

        console.error(
            "Company not found:",
            companyId
        );

        return [];

    }

    if (!company.deals) {

        company.deals = [];

    }

    return company.deals;

}


/* =========================================
   ADD DEAL
========================================= */

function addDeal(
    companyId,
    deal
) {

    const company =
        getCompany(companyId);

    if (!company) {

        console.error(
            "Company not found:",
            companyId
        );

        return false;

    }

    if (!company.deals) {

        company.deals = [];

    }

    deal.id =
        deal.id || Date.now();

    deal.createdAt =
        deal.createdAt ||
        new Date().toISOString();

    deal.updatedAt =
        new Date().toISOString();

    deal.value =
        Number(deal.value || 0);

    deal.stage =
        deal.stage || "New Lead";

    deal.status =
        deal.status || "Open";

    company.deals.push(deal);

    return updateCompany(company);

}


/* =========================================
   UPDATE DEAL
========================================= */

function updateDeal(
    companyId,
    updatedDeal
) {

    const company =
        getCompany(companyId);

    if (!company) {

        console.error(
            "Company not found:",
            companyId
        );

        return false;

    }

    if (!company.deals) {

        company.deals = [];

    }


    const index =
        company.deals.findIndex(
            deal =>
                String(deal.id) ===
                String(updatedDeal.id)
        );


    if (index === -1) {

        console.error(
            "updateDeal: deal not found",
            updatedDeal.id
        );

        return false;

    }


    updatedDeal.updatedAt =
        new Date().toISOString();

    updatedDeal.value =
        Number(updatedDeal.value || 0);

    updatedDeal.stage =
        updatedDeal.stage || "New Lead";

    updatedDeal.status =
        updatedDeal.status || "Open";


    company.deals[index] =
        updatedDeal;


    return updateCompany(company);

}


/* =========================================
   DELETE DEAL
========================================= */

function deleteDeal(
    companyId,
    dealId
) {

    const company =
        getCompany(companyId);

    if (!company) {

        console.error(
            "Company not found:",
            companyId
        );

        return false;

    }

    company.deals =
        (company.deals || []).filter(
            deal =>
                String(deal.id) !==
                String(dealId)
        );


    return updateCompany(company);

}


/* =========================================
   TASKS
========================================= */

function getTasks(companyId) {

    const company =
        getCompany(companyId);

    if (!company) {

        console.error(
            "Company not found:",
            companyId
        );

        return [];

    }

    if (!company.tasks) {

        company.tasks = [];

    }

    return company.tasks;

}


function addTask(
    companyId,
    task
) {

    const company =
        getCompany(companyId);

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


function deleteTask(
    companyId,
    taskId
) {

    const company =
        getCompany(companyId);

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
