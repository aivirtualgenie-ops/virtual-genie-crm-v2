/* =========================================
   EDIT PRODUCT
========================================= */

function loadEditProduct(
    companyId,
    productId
) {

    const company =
        getCompany(companyId);


    if (!company) {

        console.error(
            "Edit product failed: company not found",
            companyId
        );

        return;

    }


    const product =
        (company.products || []).find(
            p =>
                String(p.id) ===
                String(productId)
        );


    if (!product) {

        console.error(
            "Edit product failed: product not found",
            productId
        );

        return;

    }


    const app =
        document.getElementById("app");


    app.innerHTML = `

    <div class="dashboard">

        <div class="header">

            <h1>
                Edit Product
            </h1>

            <p class="subtitle">
                ${company.companyName}
            </p>

        </div>


        <input
            class="search"
            id="productName"
            placeholder="Product Name"
            value="${product.name || ""}">


        <input
            class="search"
            id="productSKU"
            placeholder="SKU"
            value="${product.sku || ""}">


        <input
            class="search"
            id="productCategory"
            placeholder="Category"
            value="${product.category || ""}">


        <input
            class="search"
            id="productQuantity"
            type="number"
            min="0"
            placeholder="Quantity"
            value="${product.quantity || 0}">


        <input
            class="search"
            id="productPrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="Unit Price"
            value="${product.price || 0}">


        <textarea
            class="search"
            id="productDescription"
            placeholder="Description"
            style="
                height:120px;
                resize:none;
            ">${product.description || ""}</textarea>


        <button
            class="fab"
            style="
                position:static;
                width:100%;
                height:60px;
                border-radius:18px;
                font-size:20px;
            "
            onclick="updateProduct(
                ${companyId},
                ${productId}
            )">

            Update Product

        </button>


        <button
            class="search"
            style="margin-top:20px;"
            onclick="loadProducts(${companyId})">

            ← Back

        </button>


        ${bottomNav("companies")}

    </div>

    `;

}


/* =========================================
   UPDATE PRODUCT
========================================= */

function updateProduct(
    companyId,
    productId
) {

    const company =
        getCompany(companyId);


    if (!company) {

        console.error(
            "Update product failed: company not found",
            companyId
        );

        return;

    }


    const product =
        (company.products || []).find(
            p =>
                String(p.id) ===
                String(productId)
        );


    if (!product) {

        console.error(
            "Update product failed: product not found",
            productId
        );

        return;

    }


    product.name =
        document
            .getElementById("productName")
            .value
            .trim();


    if (product.name === "") {

        alert(
            "Product name is required."
        );

        return;

    }


    product.sku =
        document
            .getElementById("productSKU")
            .value
            .trim();


    product.category =
        document
            .getElementById("productCategory")
            .value
            .trim();


    product.quantity =
        Number(
            document
                .getElementById("productQuantity")
                .value
        ) || 0;


    product.price =
        Number(
            document
                .getElementById("productPrice")
                .value
        ) || 0;


    product.description =
        document
            .getElementById("productDescription")
            .value
            .trim();


    const saved =
        updateCompany(company);


    if (!saved) {

        console.error(
            "Update product failed"
        );

        return;

    }


    loadProducts(companyId);

}
