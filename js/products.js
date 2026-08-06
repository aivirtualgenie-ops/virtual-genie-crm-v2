function loadProducts(companyId){

const company = getCompany(companyId);

const products = getProducts(companyId);

const app = document.getElementById("app");

app.innerHTML = `

<div class="dashboard">

<div class="header">

<h1>Products</h1>

<p class="subtitle">${company.companyName}</p>

</div>

<div class="card">

<button
class="search"
onclick="loadAddProduct(${companyId})">

➕ Add Product

</button>

</div>

${
products.length === 0

?

`

<div class="card" style="margin-top:20px;">

<h3>No products yet</h3>

<p>Add your first product.</p>

</div>

`

:

products.map(product => `

<div class="card" style="margin-top:20px;">

<h3>${product.name}</h3>

<p><strong>Quantity:</strong> ${product.quantity}</p>

<p><strong>Price:</strong> ₹${product.price}</p>

</div>

`).join("")

}

<button
class="search"
style="margin-top:20px;"
onclick="loadCompany(${companyId})">

← Back

</button>

${bottomNav("companies")}

</div>

`;

}
