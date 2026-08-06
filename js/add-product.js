function loadAddProduct(companyId){

const app = document.getElementById("app");

app.innerHTML = `

<div class="dashboard">

<div class="header">

<h1>Add Product</h1>

<p class="subtitle">Create a product for this company</p>

</div>

<input
class="search"
id="productName"
placeholder="Product Name">

<input
class="search"
id="productQuantity"
type="number"
placeholder="Quantity">

<input
class="search"
id="productPrice"
type="number"
placeholder="Price">

<button
class="fab"
style="position:static;width:100%;height:60px;border-radius:18px;font-size:20px;"
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

function saveProduct(companyId){

const name = document.getElementById("productName").value.trim();
const quantity = Number(document.getElementById("productQuantity").value);
const price = Number(document.getElementById("productPrice").value);

if(name===""){

alert("Product name is required.");

return;

}

const product = {

id: Date.now(),

name,

quantity,

price

};

addProduct(companyId, product);

loadProducts(companyId);

}
