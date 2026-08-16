function router() {

    const hash =
        location.hash.replace("#", "");


    /* =====================================
       EDIT COMPANY
    ===================================== */

    if (
        hash.startsWith(
            "edit-company-"
        )
    ) {

        loadEditCompany(
            hash.replace(
                "edit-company-",
                ""
            )
        );

        return;

    }


    /* =====================================
       COMPANY
    ===================================== */

    if (
        hash.startsWith(
            "company-"
        )
    ) {

        loadCompany(
            hash.replace(
                "company-",
                ""
            )
        );

        return;

    }


    /* =====================================
       ROUTES
    ===================================== */

    switch (hash) {


        case "companies":

            loadCompanies();

            break;


        case "pipeline":

            console.log(
                "PIPELINE ROUTE WORKING"
            );

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


        case "settings":

            loadSettings();

            break;


        case "add-company":

            loadAddCompany();

            break;


        default:

            loadDashboard();

            break;

    }

}


/* =========================================
   ROUTER EVENTS
========================================= */

window.addEventListener(
    "hashchange",
    router
);


window.addEventListener(
    "load",
    router
);
