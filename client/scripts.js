const avatar = document.getElementById('avatar');
const avatarDropdownMenu = document.getElementById('avatarDropdownMenu');
const roleDropdownMenu = document.getElementById('dropdownRole');
const nameDropdownMenu = document.getElementById('dropdownName');


// const decodedImgCookie =  getCookie('img').replace(/%3A/g, ':').replace(/%2F/g, '/');


if (avatar) {
    const decodedImgCookie = getCookie('img').replace(/%3A/g, ':').replace(/%2F/g, '/');
    if (decodedImgCookie !== "undefined") {
        avatar.src = decodedImgCookie;
        avatarDropdownMenu.src = decodedImgCookie;
    } else {
        avatar.src = "https://cdn-icons-png.flaticon.com/512/64/64572.png";
        avatarDropdownMenu.src = "https://cdn-icons-png.flaticon.com/512/64/64572.png";
    }
    nameDropdownMenu.innerText = getCookie('name').replace(/%20/g, ' ');
    roleDropdownMenu.innerText = getCookie('role');
}

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
        squadTable(data);
    })
}

const getSquadsByParam = async (key, value) => {
    const response = await fetch(`https://woliday-0yt9.onrender.com/squad/${key}/${value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data.squads;
}


const getSquads = async () => {
    const response = await fetch(`https://woliday-0yt9.onrender.com/squad`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.status !== 200) {
        return {};
    } else {
        const data = await response.json();
        return data.squad;
    }
}

const squadTable = (data) => {
    if (!Array.isArray(data)) {
        data = [data];
    }
    const tbl = document.querySelector("#squadTbl");
    tbl.innerHTML = "";
    let letter = 65;
    for (let i = 0; i < data.length; i++) {
        const status = data[i].finished == true ? 'Finished' : 'In-Progress'
        let vol2 = "";
        if (data[i].volunteer2) {
            vol2 = `<tr>
<td><img src=${data[i].volunteer2.img} alt="Avatar" class="w-px-40 h-auto rounded-circle"></td>
            <td><strong>${data[i].volunteer2.name}</strong></td>
            <td>${data[i].volunteer2.role}</td>
            <td>${data[i].volunteer2.tel}</td>
            <td>${data[i].volunteer2.email}</td>
        </tr>`
        }
        let test =
            `<div class="card-body">
          <div class="card">
              <h6 class="card-header">Squad: ${data[i].name}
              <h6 class="card-header ${status}">Status: ${status}</h6>
              <div id="squadsTable" class="table-responsive text-nowrap">
                <table class="table table-hover">
                  <thead>
                  <tr>
                    <th>Img</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                  </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                  <tr>
                    <td><img src=${data[i].driver.img} alt="Avatar" class="w-px-40 h-auto rounded-circle"></td>
                    <td><strong>${data[i].driver.name}</strong></td>
                    <td>${data[i].driver.role}</td>
                    <td>${data[i].driver.tel}</td>
                    <td>${data[i].driver.email}</td>
                    </tr>
                     <tr>
                     <td><img src=${data[i].volunteer.img} alt="Avatar" class="w-px-40 h-auto rounded-circle"></td>
                    <td><strong>${data[i].volunteer.name}</strong></td>
                    <td>${data[i].volunteer.role}</td>
                    <td>${data[i].volunteer.tel}</td>
                    <td>${data[i].volunteer.email}</td>
                    </tr>
                    ${vol2}
                  </tbody>
                </table>
              </div>
            </div>
</div>`
        tbl.innerHTML += test;
        letter++
    }
}

const logout = async () => {
    console.log('logout')
    const response = await fetch(`https://woliday-0yt9.onrender.com/auth/logout`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    location.reload();
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
    const response = await fetch(`https://woliday-0yt9.onrender.com/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const body = await response.json();
    if (response.status === 200) {
        window.location.href = 'https://woliday-0yt9.onrender.com/client/index.html';
    }
};

const registration = async () => {
    const data = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        phone: document.getElementById('phone').value,
        name: document.getElementById('username').value,
    };
    const response = await fetch(`https://woliday-0yt9.onrender.com/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const body = await response.json();
    if (response.status === 200) {
        window.location.href = 'https://woliday-0yt9.onrender.com/client/index.html';
    }
};


const EventRegistrationButton = () => {
    const signUpEventBth = document.getElementById("signUpEventShow");
    const creatingGroupsButton = document.getElementById("creatingGroupsButton");
    const creatingFamiliesButton = document.getElementById("creatingFamiliesButton");
    creatingFamiliesButton.style.display = 'none'
    const role = getCookie('role');
    if (role !== 'none') {
        signUpEventBth.style.display = 'inline-block';
        signUpEventBth.innerText = 'You have registered for the upcoming event';
        signUpEventBth.disabled = true
        creatingGroupsButton.style.display = 'none'
    }
    if (role === 'admin') {
        creatingGroupsButton.style.display = 'inline-block';
        signUpEventBth.style.display = 'none';
    }
}

const signUpEventShowForm = () => {
    const signUpEvent = document.getElementById("signUpEventForm");
    const signUpEventBth = document.getElementById("signUpEventShow");

    signUpEvent.style.display = 'block';
    signUpEventBth.style.display = 'none';
}

const signUpEvent = async () => {
    const signUpEvent = document.getElementById("signUpEventForm");
    const signUpEventBth = document.getElementById("signUpEventShow");

    const data = {
        role: document.getElementById('role').value,
    };
    const response = await fetch(`https://woliday-0yt9.onrender.com/user/event`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const body = await response.json();
    if (response.status === 200) {
        signUpEvent.style.display = 'none';
        signUpEventBth.style.display = 'inline-block';
        signUpEventBth.innerText = 'You have registered for the upcoming event';
        signUpEventBth.disabled = true;
    } else {
        let message = body.message;
        if (!message) message = 'Your registration was not accepted. Please try again later'
        alert(` ${message} `, 'danger', 'signUpEventForm');
    }
};

const alert = (message, type, id) => {
    const alertPlaceholder = document.getElementById(id);
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>',
    ].join('');

    alertPlaceholder.append(wrapper);
};

const showSelectArea = () => {
    const select = document.getElementById("area").value;
    const span = createSelect(select);
    if (span)
        document.getElementById("areaSelect").appendChild(span);
}
const showSelectLanguage = () => {
    const select = document.getElementById("language").value;
    const span = createSelect(select);
    if (span)
        document.getElementById("languageSelect").appendChild(span);
}

const createSelect = (name) => {
    const spanList = document.getElementsByClassName("showSelect");
    for (let i = 0; i < spanList.length; i++) {
        if (spanList[i].innerText === name + ' X') {
            return;
        }
    }
    const newSpan = document.createElement("span");
    newSpan.innerHTML = name + ' X';
    newSpan.className = "showSelect"
    newSpan.addEventListener('click', () => {
        newSpan.remove();
    })
    return newSpan;
}

const getUser = async () => {
    const img = document.getElementById('uploadedAvatar');
    const response = await fetch(`https://woliday-0yt9.onrender.com/user/details`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const body = await response.json();
    if (response.status === 200) {
        document.getElementById('firstName').value = body.user.name;
        document.getElementById('email').value = body.user.email;
        document.getElementById('phoneNumber').value = body.user.tel;
        document.getElementById('role').value = body.user.role;
        document.getElementById('uploadedAvatar').src = body.user.img;
    }
};

const editProfile = () => {
    const name = document.getElementById('firstName');
    const email = document.getElementById('email');
    const tel = document.getElementById('phoneNumber');
    const role = document.getElementById('role');
    const language = document.getElementById('language');
    const area = document.getElementById('area');

    name.removeAttribute('readonly');
    email.removeAttribute('readonly');
    tel.removeAttribute('readonly');
    role.removeAttribute('disabled');
    area.removeAttribute('disabled');
    language.removeAttribute('disabled');

    document.getElementById('saveButton').style.display = 'block';
    document.getElementById('editButton').style.display = 'none';
}

const saveEditProfile = async () => {
    const data = {
        name: document.getElementById('firstName').value,
        email: document.getElementById('email').value,
        tel: document.getElementById('phoneNumber').value,
        role: document.getElementById('role').value,
    };
    const response = await fetch(`https://woliday-0yt9.onrender.com/user/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const body = await response.json();
    if (response.status === 200) {
        document.getElementById('saveButton').style.display = 'none';
        document.getElementById('editButton').style.display = 'block';
    } else {
        alert(` ${message} `, 'danger', 'profileMassege');
    }
};

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()
            .split(';')
            .shift();
    }
}

const groupingFamilies = async () => {
    const response = await fetch(`https://woliday-0yt9.onrender.com/squad/groupFamilies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.status === 200) {
        const creatingFamiliesButton = document.getElementById("creatingFamiliesButton");
        creatingFamiliesButton.value = 1;
        creatingFamiliesButton.disabled = true
        alert('Excellent, Families grouped into squads!', 'success', 'alertGroups');
    } else {
        alert('Families grouping failed', 'danger', 'alertGroups');
    }
}

const creatingGroups = async () => {
    const response = await fetch(`https://woliday-0yt9.onrender.com/squad/groupSquads`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.status === 200) {
        const creatingGroupsButton = document.getElementById("creatingGroupsButton");
        creatingGroupsButton.value = 1;
        creatingGroupsButton.disabled = true
        const creatingFamiliesButton = document.getElementById("creatingFamiliesButton");
        creatingFamiliesButton.style.display = 'inline-block';
        alert('Excellent, Users grouped into squads!', 'success', 'alertGroups');
    } else {
        alert('Squads grouping failed', 'danger', 'alertGroups');
    }
}

