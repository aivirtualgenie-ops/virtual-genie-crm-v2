function loadProducts(companyId){

const company = getCompany(companyId);

const products = getProducts(companyId);

const app = document.getElementById("app");

let totalValue = 0;

products.forEach(product=>{

totalValue += Number(product.quantity || 0) * Number(product.price || 0);

});

app.innerHTML = `

<div class="dashboard">

<div class="header">

<h1>Products</h1>

<p class="subtitle">${company.companyName}</p>

</div>

<div class="card">

<p><strong>Total Products:</strong> ${products.length}</p>

<p><strong>Total Inventory Value:</strong> ₹${totalValue}</p>

<br>

<button
class="search"
onclick="loadAddProduct(${companyId})">

➕ Add Product

</button>

</div>

${
products.length===0

?

`

<div class="card" style="margin-top:20px;">

<h3>No Products Yet</h3>

<p>Add your first product.</p>

</div>

`

:

products.map(product=>`

<div class="card" style="margin-top:20px;">

<h3>${product.name}</h3>

<p><strong>SKU:</strong> ${product.sku || "-"}</p>

<p><strong>Category:</strong> ${product.category || "-"}</p>

<p><strong>Quantity:</strong> ${product.quantity || 0}</p>

<p><strong>Unit Price:</strong> ₹${product.price || 0}</p>

<p><strong>Total Value:</strong> ₹${(Number(product.quantity || 0) * Number(product.price || 0))}</p>

<p><strong>Description:</strong></p>

<p>${product.description || "No description available."}</p>

<br>

<button
class="search"
onclick="loadEditProduct(${companyId},${product.id})">

✏️ Edit

</button>

<br><br>

<button
class="search"
onclick="deleteProductConfirm(${companyId},${product.id})">

🗑 Delete

</button>

</div>

`).join("")

}

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

function deleteProductConfirm(companyId, productId){

const confirmDelete = confirm("Delete this product?");

if(!confirmDelete){
return;
}

deleteProduct(companyId, productId);

loadProducts(companyId);

}
