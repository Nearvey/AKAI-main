
function testText(field, lng) {
    return field.value.length >= lng;
};

function testEmail(field) {
    const reg = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
    return reg.test(field.value);
};

function removeFieldError(field) {
    const errorText = field.nextElementSibling;
    if (errorText !== null) {
        if (errorText.classList.contains("form-error-text")) {
            errorText.remove();
        }
    }
};

function createFieldError(field, text) {
    removeFieldError(field); //przed stworzeniem usuwam by zawsze był najnowszy komunikat

    const div = document.createElement("div");
    div.classList.add("form-error-text");
    div.innerText = text;
    if (field.nextElementSibling === null) {
        field.parentElement.appendChild(div);
    } else {
        if (!field.nextElementSibling.classList.contains("form-error-text")) {
            field.parentElement.insertBefore(div, field.nextElementSibling);
        }
    }
};

function markFieldAsError(field, show) {
    if (show) {
        field.classList.add("field-error");
    } else {
        field.classList.remove("field-error");
        removeFieldError(field);
    }
};

//pobieram elementy
const form = document.querySelector("form");
const inputName = form.querySelector("input[name=name]");
const inputEmail = form.querySelector("input[name=email]");
const inputLastname = form.querySelector("input[name=lastname");

//etap 1 : podpinam eventy
inputName.addEventListener("input", e => {
    const testResult = !testText(e.target, 3) && e.target.value !== "";
    markFieldAsError(e.target, testResult);
});
inputName.addEventListener("input", e => {
    if (e.target.classList.contains("field-error") && testText(e.target, 3)) {
         markFieldAsError(e.target, false);
    }
});

inputLastname.addEventListener("input", e => {
    const testResult = !testText(e.target, 3) && e.target.value !== "";
    markFieldAsError(e.target, testResult);
});
inputLastname.addEventListener("input", e => {
    if (e.target.classList.contains("field-error") && testText(e.target, 3)) {
         markFieldAsError(e.target, false);
    }
});

inputEmail.addEventListener("input", e => {
    const testResult = !testEmail(e.target) && e.target.value !== "";
    markFieldAsError(e.target, testResult);
});
inputEmail.addEventListener("input", e => {
    if (e.target.classList.contains("field-error") && testEmail(e.target)) {
         markFieldAsError(e.target, false);
    }
});

form.addEventListener("submit", e => {
    e.preventDefault();

    let formErrors = false;

    //2 etap - sprawdzamy poszczególne pola gdy ktoś chce wysłać formularz
    for (const el of [inputName, inputEmail, inputLastname]) {
        markFieldAsError(el, false);
        removeFieldError(el);
    }

    if (!testText(inputName, 3)) {
        markFieldAsError(inputName, true);
        createFieldError(inputName, "Wpisana wartość jest niepoprawna");
        formErrors = true;
    }

    if (!testText(inputLastname, 3)) {
        markFieldAsError(inputLastname, true);
        createFieldError(inputLastname, "Wpisana wartość jest niepoprawna");
        formErrors = true;
    }

    if (!testEmail(inputEmail)) {
        markFieldAsError(inputEmail, true);
        createFieldError(inputEmail, "Wpisany email jest niepoprawny");
        formErrors = true;
    }

    if (!formErrors) {
        var formElements = form.querySelector(".button-success")
              if (formElements) {
                  formElements.style.display = "none"; // hide form
              }
              var thankYouMessage = form.querySelector(".thankyou_message");
              if (thankYouMessage) {
                  thankYouMessage.style.display = "block";
              }
        e.target.preventDefault();
        e.target.submit();
    }
});