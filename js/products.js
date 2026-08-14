/* =========================================
   COMPANY PRODUCTS
========================================= */

function loadProducts(companyId) {

    const company = getCompany(companyId);

    const app = document.getElementById("app");


    if (!company) {

        app.innerHTML = `

        <div class="dashboard">

            <div class="card">

                <h2>Company not found</h2>

                <br>

                <button
                    class="search"
                    onclick="location.hash='companies'">

                    ← Back

                </button>

            </div>

            ${bottomNav("companies")}

        </div>

        `;

        return;

    }


    const products =
        getProducts(companyId);


    let totalValue = 0;


    products.forEach(product => {

        totalValue +=
            Number(product.quantity || 0) *
            Number(product.price || 0);

    });


    let productCards = "";


    if (products.length === 0) {

        productCards = `

        <div
            class="card"
            style="margin-top:20px;">

            <h3>
                No Products Yet
            </h3>

            <p>
                Add your first product.
            </p>

        </div>

        `;

    } else {

        products.forEach(product => {

            const quantity =
                Number(product.quantity || 0);

            const price =
                Number(product.price || 0);

            const productValue =
                quantity * price;


            productCards += `

            <div
                class="card"
                style="margin-top:20px;">

                <h3>
                    ${product.name || "Unnamed Product"}
                </h3>

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
                    <strong>Unit Price:</strong>
                    ₹${price}
                </p>

                <p>
                    <strong>Total Value:</strong>
                    ₹${productValue}
                </p>

                <p>
                    <strong>Description:</strong>
                </p>

                <p>
                    ${product.description || "No description available."}
                </p>

                <br>

                <button
                    class="search"
                    onclick="loadEditProduct(
                        ${companyId},
                        ${product.id}
                    )">

                    ✏️ Edit

                </button>

                <br>
                <br>

                <button
                    class="search"
                    onclick="deleteProductConfirm(
                        ${companyId},
                        ${product.id}
                    )">

                    🗑 Delete

                </button>

            </div>

            `;

        });

    }


    app.innerHTML = `

    <div class="dashboard">

        <div class="header">

            <h1>
                Products
            </h1>

            <p class="subtitle">
                ${company.companyName}
            </p>

        </div>


        <div class="card">

            <p>
                <strong>Total Products:</strong>
                ${products.length}
            </p>

            <p>
                <strong>Total Inventory Value:</strong>
                ₹${totalValue}
            </p>

            <br>

            <button
                class="search"
                onclick="loadAddProduct(${companyId})">

                ➕ Add Product

            </button>

        </div>


        ${productCards}


        <button
            class="search"
            style="margin-top:20px;"
            onclick="loadCompany(${companyId})">

            ← Back to Company

        </button>


        ${bottomNav("companies")}

    </div>

    `;

}


/* =========================================
   DELETE PRODUCT
========================================= */

function deleteProductConfirm(
    companyId,
    productId
) {

    const confirmDelete =
        confirm("Delete this product?");


    if (!confirmDelete) {

        return;

    }


    const saved =
        deleteProduct(
            companyId,
            productId
        );


    if (!saved) {

        console.error(
            "Delete product failed"
        );

        return;

    }


    loadProducts(companyId);

}
