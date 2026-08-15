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

        <div class="products-empty-state">

            <div class="products-empty-icon">
                📦
            </div>

            <h2>
                No products yet
            </h2>

            <p>
                Products from all your companies
                will appear here.
            </p>

            <button
                class="products-primary-button"
                onclick="location.hash='companies'">

                + Add Your First Product

            </button>

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


            let stockStatus = "In Stock";
            let stockClass = "in-stock";


            if (quantity <= 0) {

                stockStatus = "Out of Stock";
                stockClass = "out-stock";

            } else if (quantity <= 5) {

                stockStatus = "Low Stock";
                stockClass = "low-stock";

            }


            productCards += `

            <div class="product-card">

                <div class="product-card-top">

                    <div>

                        <span class="product-company">
                            ${product.companyName || "-"}
                        </span>

                        <h2>
                            ${product.name || "Unnamed Product"}
                        </h2>

                    </div>

                    <span class="product-stock ${stockClass}">
                        ${stockStatus}
                    </span>

                </div>


                <div class="product-details">

                    <div class="product-detail">

                        <span>
                            SKU
                        </span>

                        <strong>
                            ${product.sku || "-"}
                        </strong>

                    </div>


                    <div class="product-detail">

                        <span>
                            Category
                        </span>

                        <strong>
                            ${product.category || "-"}
                        </strong>

                    </div>


                    <div class="product-detail">

                        <span>
                            Quantity
                        </span>

                        <strong>
                            ${quantity}
                        </strong>

                    </div>


                    <div class="product-detail">

                        <span>
                            Unit Price
                        </span>

                        <strong>
                            ₹${price}
                        </strong>

                    </div>

                </div>


                <div class="product-card-bottom">

                    <div>

                        <span>
                            Inventory Value
                        </span>

                        <strong>
                            ₹${value}
                        </strong>

                    </div>


                    <button
                        class="products-secondary-button"
                        onclick="loadCompany(
                            ${product.companyId}
                        )">

                        Open Company
                        <span>→</span>

                    </button>

                </div>

            </div>

            `;

        });

    }


    /* =====================================
       PAGE
    ===================================== */

    app.innerHTML = `

    <div class="dashboard products-page">


        <!-- PRODUCTS HEADER -->

        <div class="products-page-header">

            <div class="products-header-icon">
                📦
            </div>

            <div>

                <p class="products-eyebrow">
                    INVENTORY
                </p>

                <h1>
                    All Products
                </h1>

                <p class="products-subtitle">
                    ${products.length}
                    ${products.length === 1 ? "Product" : "Products"}
                    across all companies
                </p>

            </div>

        </div>


        <!-- PRODUCT KPIs -->

        <div class="products-kpi-grid">


            <div class="products-kpi-card">

                <div class="products-kpi-icon">
                    📦
                </div>

                <div>

                    <span>
                        TOTAL PRODUCTS
                    </span>

                    <strong>
                        ${products.length}
                    </strong>

                </div>

            </div>


            <div class="products-kpi-card">

                <div class="products-kpi-icon value-icon">
                    ₹
                </div>

                <div>

                    <span>
                        INVENTORY VALUE
                    </span>

                    <strong>
                        ₹${totalValue}
                    </strong>

                </div>

            </div>


        </div>


        <!-- PRODUCTS -->

        <div class="products-section">

            <div class="products-section-heading">

                <div>

                    <h2>
                        Product Inventory
                    </h2>

                    <p>
                        Products from all your companies
                    </p>

                </div>

            </div>


            ${productCards}

        </div>


        ${bottomNav("products")}

    </div>

    `;

}
