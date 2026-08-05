function loadDashboard() {

const app = document.getElementById("app");

app.innerHTML = `

<div class="dashboard">

    <div class="header">

        <p class="greeting">
            Good Evening 👋
        </p>

        <h1>
            Virtual Genie CRM
        </h1>

        <p class="subtitle">
            Your Business Operating System
        </p>

        <input
            class="search"
            placeholder="Search companies...">

    </div>

    <div class="stats">

        <div class="stats-grid">

            <div class="card">

                <p>Calls Today</p>

                <h2>0</h2>

            </div>

            <div class="card">

                <p>Follow-ups</p>

                <h2>0</h2>

            </div>

            <div class="card">

                <p>Pipeline</p>

                <h2>₹0</h2>

            </div>

            <div class="card">

                <p>Clients</p>

                <h2>0</h2>

            </div>

        </div>

        <div class="card activity-card">

            <h3>Recent Activity</h3>

            <br>

            <p><strong>ABC Dental Clinic</strong></p>
            <p>Website Proposal Sent</p>

            <br>

            <p><strong>Bliss Beach Villa</strong></p>
            <p>Meeting Scheduled</p>

            <br>

            <p><strong>Elite Builders</strong></p>
            <p>AI Receptionist Demo</p>

        </div>

        <div class="card task-card">

            <h3>Today's Tasks</h3>

            <br>

            <p>☐ Call ABC Dental</p>

            <br>

            <p>☐ Send Website Proposal</p>

            <br>

            <p>☐ Follow-up Bliss Beach Villa</p>

            <br>

            <p>☐ Cold Call 25 Leads</p>

        </div>

    </div>

    <button class="fab">
        +
    </button>

</div>

`;

}
