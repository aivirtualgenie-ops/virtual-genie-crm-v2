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
            onclick="saveProduct(${companyId})">

            Save Product

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


    const name =
        document
            .getElementById("productName")
            .value
            .trim();


    const sku =
        document
            .getElementById("productSKU")
            .value
            .trim();


    const category =
        document
            .getElementById("productCategory")
            .value
            .trim();


    const quantity =
        Number(
            document
                .getElementById("productQuantity")
                .value
        ) || 0;


    const price =
        Number(
            document
                .getElementById("productPrice")
                .value
        ) || 0;


    const description =
        document
            .getElementById("productDescription")
            .value
            .trim();


    if (name === "") {

        alert(
            "Product name is required."
        );

        return;

    }


    const product = {

        id: Date.now(),

        name,

        sku,

        category,

        quantity,

        price,

        description

    };


    const saved =
        addProduct(
            companyId,
            product
        );


    if (!saved) {

        console.error(
            "Save product failed"
        );

        return;

    }


    loadProducts(companyId);

}
