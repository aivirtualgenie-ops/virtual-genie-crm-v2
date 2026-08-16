/* =========================================
   ADD PRODUCT
========================================= */

function loadAddProduct(companyId) {

    const company =
        getCompany(companyId);


    const app =
        document.getElementById("app");


    if (!company) {

        console.error(
            "Add product failed: company not found",
            companyId
        );

        return;

    }


    app.innerHTML = `

    <div class="dashboard">

        <div class="header">

            <h1>
                Add Product
            </h1>

            <p class="subtitle">
                Create a product for this company
            </p>

        </div>


        <input
            class="search"
            id="productName"
            placeholder="Product Name">


        <input
            class="search"
            id="productSKU"
            placeholder="SKU">


        <input
            class="search"
            id="productCategory"
            placeholder="Category">


        <input
            class="search"
            id="productQuantity"
            type="number"
            min="0"
            step="1"
            placeholder="Quantity">


        <input
            class="search"
            id="productPrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="Unit Price">


        <textarea
            class="search"
            id="productDescription"
            placeholder="Description"
            style="
                height:120px;
                resize:none;
            "></textarea>


        <button
            class="fab"
            style="
                position:static;
                width:100%;
                height:60px;
                border-radius:18px;
                font-size:20px;
            "
            onclick="
                saveProduct(
                    ${companyId}
                )
            ">

            Save Product

        </button>


        <button
            class="search"
            style="margin-top:20px;"
            onclick="
                loadProducts(
                    ${companyId}
                )
            ">

            ← Back

        </button>


        ${bottomNav("companies")}

    </div>

    `;

}


/* =========================================
   SAVE PRODUCT
========================================= */

function saveProduct(companyId) {

    const company =
        getCompany(companyId);


    if (!company) {

        console.error(
            "Save product failed: company not found",
            companyId
        );

        return;

    }


    /* =====================================
       READ FORM
    ===================================== */

    const name =
        document
            .getElementById(
                "productName"
            )
            .value
            .trim();


    const sku =
        document
            .getElementById(
                "productSKU"
            )
            .value
            .trim();


    const category =
        document
            .getElementById(
                "productCategory"
            )
            .value
            .trim();


    const quantityRaw =
        document
            .getElementById(
                "productQuantity"
            )
            .value
            .trim();


    const priceRaw =
        document
            .getElementById(
                "productPrice"
            )
            .value
            .trim();


    const description =
        document
            .getElementById(
                "productDescription"
            )
            .value
            .trim();


    /* =====================================
       VALIDATION
    ===================================== */

    if (!name) {

        alert(
            "Product name is required."
        );

        return;

    }


    const quantity =
        quantityRaw === ""
            ? 0
            : Number(quantityRaw);


    const price =
        priceRaw === ""
            ? 0
            : Number(priceRaw);


    if (
        !Number.isFinite(quantity) ||
        quantity < 0
    ) {

        alert(
            "Quantity must be 0 or greater."
        );

        return;

    }


    if (
        !Number.isFinite(price) ||
        price < 0
    ) {

        alert(
            "Unit price must be 0 or greater."
        );

        return;

    }


    /* =====================================
       PRODUCT OBJECT
       
       IMPORTANT:
       No ID is generated here.

       storage.js owns ID generation.
    ===================================== */

    const product = {

        name:
            name,

        sku:
            sku,

        category:
            category,

        quantity:
            quantity,

        price:
            price,

        description:
            description

    };


    /* =====================================
       SAVE THROUGH STORAGE
    ===================================== */

    const saved =
        addProduct(
            companyId,
            product
        );


    if (!saved) {

        alert(
            "Could not save product."
        );

        return;

    }


    /* =====================================
       RETURN TO PRODUCTS
    ===================================== */

    loadProducts(
        companyId
    );

}
