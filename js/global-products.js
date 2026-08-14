/* =========================================
   GLOBAL PRODUCTS
========================================= */

function loadGlobalProducts() {

    const companies =
        getCompanies();

    const app =
        document.getElementById("app");

    let products = [];


    /* =====================================
       COLLECT PRODUCTS
    ===================================== */

    companies.forEach(company => {

        (company.products || []).forEach(
            product => {

                products.push({

                    companyId:
                        company.id,

                    companyName:
                        company.companyName,

                    ...product

                });

            }
        );

    });


    /* =====================================
       TOTAL VALUE
    ===================================== */

    let totalValue = 0;


    products.forEach(product => {

        totalValue +=
            Number(product.quantity || 0) *
            Number(product.price || 0);

    });


    /* =====================================
       PRODUCT CARDS
    ===================================== */

    let productCards = "";


    if (products.length === 0) {

        productCards = `

        <div class="card">

            <h3>
                No Products
            </h3>

            <p>
                Products from all companies
                will appear here.
            </p>

        </div>

        `;

    } else {

        products.forEach(product => {

            const quantity =
                Number(product.quantity || 0);

            const price =
                Number(product.price || 0);

            const value =
                quantity * price;


            productCards += `

            <div class="card">

                <h3>
                    ${product.name || "Unnamed Product"}
                </h3>

                <p>
                    <strong>Company:</strong>
                    ${product.companyName || "-"}
                </p>

                <p>
                    <strong>SKU:</strong>
                    ${product.sku || "-"}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${product.category || "-"}
                </p>

                <p>
                    <strong>Quantity:</strong>
                    ${quantity}
                </p>

                <p>
                    <strong>Price:</strong>
                    ₹${price}
                </p>

                <p>
                    <strong>Total:</strong>
                    ₹${value}
                </p>

                <br>

                <button
                    class="search"
                    onclick="loadCompany(
                        ${product.companyId}
                    )">

                    Open Company

                </button>

            </div>

            `;

        });

    }


    /* =====================================
       PAGE
    ===================================== */

    app.innerHTML = `

    <div class="dashboard">

        <div class="header">

            <h1>
                All Products
            </h1>

            <p class="subtitle">
                ${products.length} Products
            </p>

        </div>


        <div class="card">

            <p>
                <strong>Total Products:</strong>
                ${products.length}
            </p>

            <p>
                <strong>
                    Total Inventory Value:
                </strong>

                ₹${totalValue}

            </p>

        </div>


        ${productCards}


        ${bottomNav("products")}

    </div>

    `;

}
