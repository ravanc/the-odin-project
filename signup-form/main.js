const form = document.querySelector("#signup");
const firstName = form.querySelector("input[name='first-name']");
const lastName = form.querySelector("input[name='last-name']");
const email = form.querySelector("input[name='email']");
const phone = form.querySelector("input[name='phone']");
const password = form.querySelector("input[name='password']");
const confirmPwd = form.querySelector("input[name='confirm-pwd']");
const passwordMessage = form.querySelector(".password-message");
const submit = form.querySelector(".submit")

const inputs = [form, firstName, lastName, email, phone, password, confirmPwd]

function nameValidation(name) {
    let re = /[a-zA-z]+/;
    if (!re.test(name)) {
        return true
    }
}

function numberValidation(number) {
    let re = /\+?\d{7,10}/;
    if (!re.test(number)) {
        return true
    }
}

function emailValidation(email) {
    let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!re.test(email)) {
        return true
    }
}

submit.addEventListener("click", (e) => {
    console.log('submit')
    if (nameValidation(firstName.value)) {
        firstName.classList.add("error");
    }
    if (nameValidation(lastName.value)) {
        lastName.classList.add("error");
    }
    if (numberValidation(phone.value)) {
        phone.classList.add("error");
    }
    if (emailValidation(email.value)) {
        email.classList.add("error");
    }
    if (password.value != confirmPwd.value) {
        password.classList.add("error");
        confirmPwd.classList.add("error");
        passwordMessage.textContent = "* Passwords do not match"
    }
    e.preventDefault();
});

inputs.forEach((field) => {
    field.addEventListener("input", (e) => {
        if (field.classList.contains("error")) {
            field.classList.remove("error");
        }
    })
})