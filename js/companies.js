function loadCompanies() {

const app = document.getElementById("app");

app.innerHTML = `

<div class="dashboard">

    <div class="header">

        <h1>Companies</h1>

        <p class="subtitle">
            Manage all your leads and clients
        </p>

        <input
        class="search"
        placeholder="Search companies...">

    </div>

    <div class="card">

        <h3>No Companies Yet</h3>

        <br>

        <p>
        Tap the + button to add your first company.
        </p>

    </div>

    <button class="fab" onclick="location.hash='add-company'">
    +
</button>

</div>

`;

}
