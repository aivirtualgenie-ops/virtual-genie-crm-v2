/* =========================================
   STORAGE
========================================= */

const STORAGE_KEY =
    "virtual_genie_crm";


/* =========================================
   ID GENERATOR
========================================= */

function generateId() {

    /*
       Keep IDs numeric because the existing
       UI passes them directly into JavaScript
       onclick handlers.
    */

    return (
        Date.now() * 1000 +
        Math.floor(
            Math.random() * 1000
        )
    );

}


/* =========================================
   GET ALL COMPANIES
========================================= */

function getCompanies() {

    const data =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!data) {

        return [];

    }


    try {

        const parsed =
            JSON.parse(data);


        if (!Array.isArray(parsed)) {

            console.error(
                "CRM storage is not an array."
            );

            return [];

        }


        return parsed;

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

function saveCompanies(
    companies
) {

    if (!Array.isArray(companies)) {

        console.error(
            "saveCompanies: expected array."
        );

        return false;

    }


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
   NORMALIZE COMPANY
========================================= */

function normalizeCompany(
    company
) {

    if (!company) {

        return null;

    }


    /*
       Preserve existing company structure,
       but guarantee the collections used
       throughout the CRM.
    */

    if (!Array.isArray(company.tasks)) {

        company.tasks = [];

    }


    if (!Array.isArray(company.products)) {

        company.products = [];

    }


    if (!Array.isArray(company.calls)) {

        company.calls = [];

    }


    if (!Array.isArray(company.deals)) {

        company.deals = [];

    }


    /*
       Keep legacy field for compatibility
       with older records/modules.

       It is NOT used as the financial source
       of truth anymore.
    */

    if (!company.pipelineStage) {

        company.pipelineStage =
            "New Lead";

    }


    return company;

}


/* =========================================
   ADD COMPANY
========================================= */

function addCompany(
    company
) {

    if (!company) {

        console.error(
            "addCompany: no company provided"
        );

        return false;

    }


    const companies =
        getCompanies();


    company.id =
        generateId();


    company.createdAt =
        new Date().toISOString();


    company.updatedAt =
        new Date().toISOString();


    normalizeCompany(
        company
    );


    companies.push(
        company
    );


    return saveCompanies(
        companies
    );

}


/* =========================================
   GET SINGLE COMPANY
========================================= */

function getCompany(
    id
) {

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

function updateCompany(
    updatedCompany
) {

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


    /*
       Always refresh modification timestamp.
    */

    updatedCompany.updatedAt =
        new Date().toISOString();


    /*
       Guarantee nested collections.
    */

    normalizeCompany(
        updatedCompany
    );


    /*
       Preserve original creation date
       if an update accidentally omitted it.
    */

    if (
        !updatedCompany.createdAt &&
        companies[index].createdAt
    ) {

        updatedCompany.createdAt =
            companies[index].createdAt;

    }


    /*
       Replace only the targeted company.
       Other companies remain untouched.
    */

    companies[index] =
        updatedCompany;


    const saved =
        saveCompanies(
            companies
        );


    if (!saved) {

        console.error(
            "updateCompany: localStorage save failed"
        );

        return false;

    }


    return true;

}


/* =========================================
   DELETE COMPANY
========================================= */

function deleteCompany(
    id
) {

    const companies =
        getCompanies();


    const index =
        companies.findIndex(
            company =>
                String(company.id) ===
                String(id)
        );


    if (index === -1) {

        console.error(
            "deleteCompany: company not found",
            id
        );

        return false;

    }


    companies.splice(
        index,
        1
    );


    return saveCompanies(
        companies
    );

}


/* =========================================
   PRODUCTS
========================================= */

function getProducts(
    companyId
) {

    const company =
        getCompany(companyId);


    if (!company) {

        console.error(
            "Company not found:",
            companyId
        );

        return [];

    }


    normalizeCompany(
        company
    );


    return company.products;

}


function addProduct(
    companyId,
    product
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


    normalizeCompany(
        company
    );


    if (!product) {

        console.error(
            "addProduct: no product provided"
        );

        return false;

    }


    /*
       Assign an ID if the caller didn't.
    */

    product.id =
        product.id ||
        generateId();


    company.products.push(
        product
    );


    return updateCompany(
        company
    );

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


    normalizeCompany(
        company
    );


    const originalLength =
        company.products.length;


    company.products =
        company.products.filter(
            product =>
                String(product.id) !==
                String(productId)
        );


    if (
        company.products.length ===
        originalLength
    ) {

        console.error(
            "deleteProduct: product not found",
            productId
        );

        return false;

    }


    return updateCompany(
        company
    );

}


/* =========================================
   DEALS / SALES OPPORTUNITIES
========================================= */


/* =========================================
   GET DEALS
========================================= */

function getDeals(
    companyId
) {

    const company =
        getCompany(companyId);


    if (!company) {

        console.error(
            "Company not found:",
            companyId
        );

        return [];

    }


    normalizeCompany(
        company
    );


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


    if (!deal) {

        console.error(
            "addDeal: no deal provided"
        );

        return false;

    }


    normalizeCompany(
        company
    );


    deal.id =
        deal.id ||
        generateId();


    deal.createdAt =
        deal.createdAt ||
        new Date().toISOString();


    deal.updatedAt =
        new Date().toISOString();


    deal.value =
        Number(
            deal.value || 0
        );


    deal.stage =
        deal.stage ||
        "New Lead";


    deal.status =
        deal.status ||
        "Open";


    company.deals.push(
        deal
    );


    return updateCompany(
        company
    );

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


    if (!updatedDeal) {

        console.error(
            "updateDeal: no deal provided"
        );

        return false;

    }


    normalizeCompany(
        company
    );


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


    /*
       Preserve creation date.
    */

    if (
        !updatedDeal.createdAt
    ) {

        updatedDeal.createdAt =
            company.deals[index]
                .createdAt ||
            new Date().toISOString();

    }


    updatedDeal.updatedAt =
        new Date().toISOString();


    updatedDeal.value =
        Number(
            updatedDeal.value || 0
        );


    updatedDeal.stage =
        updatedDeal.stage ||
        "New Lead";


    updatedDeal.status =
        updatedDeal.status ||
        "Open";


    company.deals[index] =
        updatedDeal;


    return updateCompany(
        company
    );

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


    normalizeCompany(
        company
    );


    const originalLength =
        company.deals.length;


    company.deals =
        company.deals.filter(
            deal =>
                String(deal.id) !==
                String(dealId)
        );


    if (
        company.deals.length ===
        originalLength
    ) {

        console.error(
            "deleteDeal: deal not found",
            dealId
        );

        return false;

    }


    return updateCompany(
        company
    );

}


/* =========================================
   TASKS
========================================= */

function getTasks(
    companyId
) {

    const company =
        getCompany(companyId);


    if (!company) {

        console.error(
            "Company not found:",
            companyId
        );

        return [];

    }


    normalizeCompany(
        company
    );


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


    if (!task) {

        console.error(
            "addTask: no task provided"
        );

        return false;

    }


    normalizeCompany(
        company
    );


    /*
       Give every task a stable ID if the
       caller didn't provide one.
    */

    task.id =
        task.id ||
        generateId();


    company.tasks.push(
        task
    );


    return updateCompany(
        company
    );

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


    normalizeCompany(
        company
    );


    const originalLength =
        company.tasks.length;


    company.tasks =
        company.tasks.filter(
            task =>
                String(task.id) !==
                String(taskId)
        );


    if (
        company.tasks.length ===
        originalLength
    ) {

        console.error(
            "deleteTask: task not found",
            taskId
        );

        return false;

    }


    return updateCompany(
        company
    );

}
