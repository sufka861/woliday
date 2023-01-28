const filter = () => {
    let input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("wantedUser");
    filter = input.value.toUpperCase();
    tr = document.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            txtValue = td[j].textContent || td[j].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                break;
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

const squadsLoad = () => {
    getSquads().then(data => {
        squadTable(data);
    })
}

const byStatus = (key, value) => {
    getSquadsByParam(key, value).then(data => {
        const tbl = document.querySelector("#squadTbl");
        tbl.innerHTML = "";
        console.log(data)
        squadTable(data);
    })
}

const getSquadsByParam = async (key, value) => {
    const response = await fetch(`http://localhost:3000/squad/${key}/${value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
}


const getSquads = async () => {
    const response = await fetch(`http://localhost:3000/squad`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.status !== 200) {
        return {};
    } else {
        const data = await response.json();
        return data;
    }
}

const squadTable = (data) => {
    // console.log("data: "+ data.squad);
    const tbl = document.querySelector("#squadTbl");
    tbl.innerHTML = "";
    let myArray = Object.keys(data.squads).map(function (key) {
        return {[key]: data.squads[key]};
    });
    console.log("myArray: "+ myArray);
    for (const squad of myArray) {
        const status = squad.finished == true ? 'Finished' : 'In-Progress'
        let vol2 = "";
        if (squad.volunteer2) {
            vol2 = `<tr>
            <td><strong>${squad.volunteer2.name}</strong></td>
            <td>${squad.volunteer2.role}</td>
            <td>${squad.volunteer2.tel}</td>
            <td>${squad.volunteer2.email}</td>
        </tr>`
        }
        let test =
            `<div class="card-body">
          <div class="card">
              <h6 class="card-header">Squad Id: ${squad._id}
              <h6 class="card-header ${status}">Status: ${status}</h6>
              <div id="squadsTable" class="table-responsive text-nowrap">
                <table class="table table-hover">
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                  </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                  <tr>
                    <td><strong>${squad.driver.name}</strong></td>
                    <td>${squad.driver.role}</td>
                    <td>${squad.driver.tel}</td>
                    <td>${squad.driver.email}</td>
                    </tr>
                     <tr>
                    <td><strong>${squad.volunteer.name}</strong></td>
                    <td>${squad.volunteer.role}</td>
                    <td>${squad.volunteer.tel}</td>
                    <td>${squad.volunteer.email}</td>
                    </tr>
                    ${vol2}
                  </tbody>
                </table>
              </div>
            </div>
</div>`
        tbl.innerHTML += test;
    }
}

const logout = async () => {
    const response = await fetch(`http://localhost:3000/auth/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

const logOutBtn = document.getElementById("logOutBtn");
if (logOutBtn) {
    logOutBtn.addEventListener('click', logout);
}

const login = async () => {
    const data = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
    const response = await fetch(`http://localhost:3000/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const body = await response.json();
    if (response.status === 200) {
        window.location.href = 'http://localhost:3000/client/index.html';
    }
};


