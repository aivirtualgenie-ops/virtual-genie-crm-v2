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
                ${escapeProductField(
                    company.companyName
                )}
            </p>

        </div>


        <input
            class="search"
            id="productName"
            placeholder="Product Name"
            value="${escapeProductField(
                product.name || ""
            )}">


        <input
            class="search"
            id="productSKU"
            placeholder="SKU"
            value="${escapeProductField(
                product.sku || ""
            )}">


        <input
            class="search"
            id="productCategory"
            placeholder="Category"
            value="${escapeProductField(
                product.category || ""
            )}">


        <input
            class="search"
            id="productQuantity"
            type="number"
            min="0"
            placeholder="Quantity"
            value="${Number(
                product.quantity || 0
            )}">


        <input
            class="search"
            id="productPrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="Unit Price"
            value="${Number(
                product.price || 0
            )}">


        <textarea
            class="search"
            id="productDescription"
            placeholder="Description"
            style="
                height:120px;
                resize:none;
            ">${escapeProductField(
                product.description || ""
            )}</textarea>


        <button
            class="fab"
            style="
                position:static;
                width:100%;
                height:60px;
                border-radius:18px;
                font-size:20px;
                margin-top:20px;
            "
            onclick="
                updateProduct(
                    ${companyId},
                    ${productId}
                )
            ">

            Update Product

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


    const quantity =
        Number(
            document
                .getElementById(
                    "productQuantity"
                )
                .value
        );


    const price =
        Number(
            document
                .getElementById(
                    "productPrice"
                )
                .value
        );


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
            "Price must be 0 or greater."
        );

        return;

    }


    /* =====================================
       UPDATE PRODUCT
    ===================================== */

    product.name =
        name;


    product.sku =
        sku;


    product.category =
        category;


    product.quantity =
        quantity;


    product.price =
        price;


    product.description =
        description;


    /* =====================================
       SAVE
    ===================================== */

    const saved =
        updateCompany(
            company
        );


    if (!saved) {

        alert(
            "Could not update product."
        );

        return;

    }


    /* =====================================
       RETURN
    ===================================== */

    loadProducts(
        companyId
    );

}


/* =========================================
   ESCAPE PRODUCT FIELD
========================================= */

function escapeProductField(
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
