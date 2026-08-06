function loadEditProduct(companyId, productId){

const company = getCompany(companyId);

const product = company.products.find(
p => p.id == productId
);

const app = document.getElementById("app");

app.innerHTML = `

<div class="dashboard">

<div class="header">

<h1>Edit Product</h1>

<p class="subtitle">${company.companyName}</p>

</div>

<input
class="search"
id="productName"
placeholder="Product Name"
value="${product.name}">

<input
class="search"
id="productQuantity"
type="number"
placeholder="Quantity"
value="${product.quantity}">

<input
class="search"
id="productPrice"
type="number"
placeholder="Price"
value="${product.price}">

<button
class="fab"
style="position:static;width:100%;height:60px;border-radius:18px;font-size:20px;"
onclick="updateProduct(${companyId},${productId})">

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

function updateProduct(companyId, productId){

const company = getCompany(companyId);

const product = company.products.find(
p => p.id == productId
);

product.name = document.getElementById("productName").value.trim();
product.quantity = Number(document.getElementById("productQuantity").value);
product.price = Number(document.getElementById("productPrice").value);

updateCompany(company);

loadProducts(companyId);

}
