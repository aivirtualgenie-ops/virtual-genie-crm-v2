function bottomNav(active = "") {

return `

<div class="bottom-nav">

<button
onclick="location.hash=''"
class="${active==="dashboard"?"active":""}">

🏠
<br>
<span>Home</span>

</button>

<button
onclick="location.hash='companies'"
class="${active==="companies"?"active":""}">

🏢
<br>
<span>Companies</span>

</button>

<button
onclick="loadGlobalCalls()"
class="${active==="calls"?"active":""}">

📞
<br>
<span>Calls</span>

</button>

<button
onclick="loadGlobalProducts()"
class="${active==="products"?"active":""}">

📦
<br>
<span>Products</span>

</button>

<button
onclick="location.hash='settings'"
class="${active==="settings"?"active":""}">

⚙️
<br>
<span>Settings</span>

</button>

</div>

`;

}
