function loadGlobalProducts(){

const companies = getCompanies();

const app = document.getElementById("app");

let products=[];

companies.forEach(company=>{

(company.products || []).forEach(product=>{

products.push({

companyId:company.id,

companyName:company.companyName,

...product

});

});

});

let totalValue=0;

products.forEach(product=>{

totalValue += product.quantity * product.price;

});

let productCards="";

if(products.length===0){

productCards=`

<div class="card">

<h3>No Products</h3>

<p>Products from all companies will appear here.</p>

</div>

`;

}else{

products.forEach(product=>{

productCards+=`

<div class="card">

<h3>${product.name}</h3>

<p><strong>Company:</strong> ${product.companyName}</p>

<p><strong>Quantity:</strong> ${product.quantity}</p>

<p><strong>Price:</strong> ₹${product.price}</p>

<p><strong>Total:</strong> ₹${product.quantity * product.price}</p>

<br>

<button
class="search"
onclick="loadCompany(${product.companyId})">

Open Company

</button>

</div>

`;

});

}

app.innerHTML=`

<div class="dashboard">

<div class="header">

<h1>All Products</h1>

<p class="subtitle">

${products.length} Products

</p>

</div>

<div class="card">

<p><strong>Total Products:</strong> ${products.length}</p>

<p><strong>Total Inventory Value:</strong> ₹${totalValue}</p>

</div>

${productCards}

${bottomNav("products")}

</div>

`;

}
