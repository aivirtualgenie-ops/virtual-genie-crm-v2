/* =========================================
   ADD / EDIT COMPANY
========================================= */

function loadAddCompany(id = null) {

    const app =
        document.getElementById("app");


    const isEditing =
        id !== null &&
        id !== undefined;


    let company =
        null;


    /* =====================================
       LOAD EXISTING COMPANY
    ===================================== */

    if (isEditing) {

        company =
            getCompany(id);


        if (!company) {

            location.hash =
                "companies";

            return;

        }

    }


    app.innerHTML = `

    <div class="dashboard">

        <div class="header">

            <h1>
                ${
                    isEditing
                        ? "Edit Company"
                        : "Add Company"
                }
            </h1>

            <p class="subtitle">

                ${
                    isEditing
                        ? "Update company information"
                        : "Create a new lead or client"
                }

            </p>

        </div>


        <input
            class="search"
            id="companyName"
            placeholder="Company Name"
            value="${escapeCompanyField(
                company?.companyName || ""
            )}">


        <input
            class="search"
            id="contactPerson"
            placeholder="Contact Person"
            value="${escapeCompanyField(
                company?.contactPerson || ""
            )}">


        <input
            class="search"
            id="phone"
            placeholder="Phone Number"
            value="${escapeCompanyField(
                company?.phone || ""
            )}">


        <input
            class="search"
            id="email"
            type="email"
            placeholder="Email"
            value="${escapeCompanyField(
                company?.email || ""
            )}">


        <textarea
            class="search"
            id="notes"
            placeholder="Notes"
            style="
                height:120px;
                resize:none;
            ">${escapeCompanyField(
                company?.notes || ""
            )}</textarea>


        <button
            class="fab"
            style="
                position:static;
                width:100%;
                height:60px;
                border-radius:18px;
                font-size:20px;
            "
            onclick="${
                isEditing
                    ? `updateCompanyForm(${company.id})`
                    : "saveCompany()"
            }">

            ${
                isEditing
                    ? "Update Company"
                    : "Save Company"
            }

        </button>


        <button
            class="search"
            style="margin-top:20px;"
            onclick="${
                isEditing
                    ? `loadCompany(${company.id})`
                    : `location.hash='companies'`
            }">

            ← Cancel

        </button>


        ${bottomNav("companies")}

    </div>

    `;

}


/* =========================================
   SAVE NEW COMPANY
========================================= */

function saveCompany() {

    const companyName =
        document
            .getElementById(
                "companyName"
            )
            .value
            .trim();


    const contactPerson =
        document
            .getElementById(
                "contactPerson"
            )
            .value
            .trim();


    const phone =
        document
            .getElementById(
                "phone"
            )
            .value
            .trim();


    const email =
        document
            .getElementById(
                "email"
            )
            .value
            .trim();


    const notes =
        document
            .getElementById(
                "notes"
            )
            .value
            .trim();


    /* =====================================
       VALIDATION
    ===================================== */

    if (!companyName) {

        alert(
            "Company Name is required."
        );

        return;

    }


    /* =====================================
       COMPANY OBJECT
       
       IMPORTANT:
       Do not generate ID/timestamps here.
       storage.js owns those.
    ===================================== */

    const company = {

        companyName:
            companyName,

        contactPerson:
            contactPerson,

        phone:
            phone,

        email:
            email,

        notes:
            notes,


        /* ================================
           COMPANY INFORMATION
        ================================= */

        website:
            "",

        address:
            "",

        industry:
            "",


        /* ================================
           CRM STATE
        ================================= */

        status:
            "Lead",

        source:
            "Cold Call",

        priority:
            "Medium",


        /* ================================
           NESTED COLLECTIONS
        ================================= */

        products:
            [],

        calls:
            [],

        tasks:
            [],

        deals:
            []


        /*
           No:

           pipelineValue
           revenue
           pipelineStage
           createdAt
           updatedAt

           Those are either derived from
           deals or owned by storage.js.
        */

    };


    /* =====================================
       SAVE
    ===================================== */

    const saved =
        addCompany(
            company
        );


    if (!saved) {

        alert(
            "Could not create company."
        );

        return;

    }


    location.hash =
        "companies";

}


/* =========================================
   UPDATE EXISTING COMPANY
========================================= */

function updateCompanyForm(id) {

    const company =
        getCompany(id);


    if (!company) {

        alert(
            "Company not found."
        );

        return;

    }


    /* =====================================
       READ FORM
    ===================================== */

    const companyName =
        document
            .getElementById(
                "companyName"
            )
            .value
            .trim();


    const contactPerson =
        document
            .getElementById(
                "contactPerson"
            )
            .value
            .trim();


    const phone =
        document
            .getElementById(
                "phone"
            )
            .value
            .trim();


    const email =
        document
            .getElementById(
                "email"
            )
            .value
            .trim();


    const notes =
        document
            .getElementById(
                "notes"
            )
            .value
            .trim();


    /* =====================================
       VALIDATION
    ===================================== */

    if (!companyName) {

        alert(
            "Company Name is required."
        );

        return;

    }


    /* =====================================
       UPDATE ONLY COMPANY FIELDS
       
       IMPORTANT:
       Do NOT recreate nested arrays.
       
       This prevents editing a company from
       accidentally deleting its:
       
       - deals
       - calls
       - tasks
       - products
    ===================================== */

    company.companyName =
        companyName;


    company.contactPerson =
        contactPerson;


    company.phone =
        phone;


    company.email =
        email;


    company.notes =
        notes;


    /* =====================================
       PRESERVE / NORMALIZE EXISTING DATA
    ===================================== */

    if (!Array.isArray(
        company.products
    )) {

        company.products = [];

    }


    if (!Array.isArray(
        company.calls
    )) {

        company.calls = [];

    }


    if (!Array.isArray(
        company.tasks
    )) {

        company.tasks = [];

    }


    if (!Array.isArray(
        company.deals
    )) {

        company.deals = [];

    }


    /* =====================================
       PRESERVE COMPANY SETTINGS
    ===================================== */

    company.website =
        company.website || "";


    company.address =
        company.address || "";


    company.industry =
        company.industry || "";


    company.status =
        company.status || "Lead";


    company.source =
        company.source || "Cold Call";


    company.priority =
        company.priority || "Medium";


    /* =====================================
       SAVE
    ===================================== */

    const saved =
        updateCompany(
            company
        );


    if (!saved) {

        alert(
            "Could not update company."
        );

        return;

    }


    loadCompany(
        id
    );

}


/* =========================================
   ESCAPE COMPANY FORM VALUES
========================================= */

function escapeCompanyField(
    value
) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        );

}
