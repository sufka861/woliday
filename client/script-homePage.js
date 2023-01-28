

const EventRegistrationButton = () => {
    const signUpEventBth = document.getElementById("signUpEventShow");
    if(getCookie('role') !== 'none') {
        signUpEventBth.style.display = 'inline-block';
        signUpEventBth.innerText = 'You have registered for the upcoming event';
        signUpEventBth.disabled = true;
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
    const response = await fetch(`http://localhost:3000/user/event`, {
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
    }else {
        let message = body.message;
        if(!message) message = 'Your registration was not accepted. Please try again later'
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

const showSelectArea= () => {
    const select = document.getElementById("area").value;
    const span = createSelect(select);
    if(span)
    document.getElementById("areaSelect").appendChild(span);
}
const showSelectLanguage= () => {
    const select = document.getElementById("language").value;
    const span = createSelect(select);
    if(span)
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
    newSpan.addEventListener('click',() => {
       newSpan.remove();
    })
    return newSpan;
}

const getUser = async () => {
    const response = await fetch(`http://localhost:3000/user/details`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const body = await response.json();
    if (response.status !== 200) {
        document.getElementById('firstName').value = body.name;
        document.getElementById('email').value = body.email;
        document.getElementById('phoneNumber').value = body.tel;
        document.getElementById('role').value = body.role;
    }
};

const editProfile = () => {
  const name =  document.getElementById('firstName');
  const email =  document.getElementById('email');
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
    const response = await fetch(`http://localhost:3000/user/details`, {
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
    }else {
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
