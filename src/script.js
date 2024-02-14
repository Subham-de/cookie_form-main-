function ValidateSubmit(e) {
    e.preventDefault();

    var IsValidateInputText = false;
    var Inputfield = document.getElementById('nameInput');
    var InputError = document.getElementById('textError');

    var IsValidateEmail = false;
    var Emailerror = document.getElementById('emailError');

    var IsValidPhone = false;
    var PhoneError = document.getElementById('phoneError');

    var IsValidategender = false;
    var genderError = document.getElementById('genderError');

    var IsValidateCountry = false;
    var CountryError = document.getElementById('countryError');

    var IsValidateState = false;
    var stateError = document.getElementById('stateError');

    var IsValidTextarea = false;
    var CommentsError = document.getElementById('commentError');

    var IsValidateDate = false;
    var Input_date = document.getElementById('dateInput');
    var dateError = document.getElementById('dateError');

    if (Inputfield.value == "") {
        IsValidateInputText = false;
        Inputfield.classList.add('border_red');
        InputError.innerText = 'Please fill input fields';
    } else {
        IsValidateInputText = true;
    }

    if (document.getElementById('emailInput').value == "") {
        document.getElementById('emailInput').classList.add('border_red');
        IsValidateEmail = false;
        Emailerror.innerText = 'Please fill your email';
    } else {
        IsValidateEmail = true;
    }

    if (Input_date.value == "") {
        document.getElementById('dateInput').classList.add('border_red');
        dateError.innerText = 'please select your date';
        IsValidateDate = false;
    } else {
        IsValidateDate = true;
    }

    if (document.getElementById('phoneInput').value == "") {
        document.getElementById('phoneInput').classList.add('border_red');
        IsValidPhone = false;
        PhoneError.innerText = 'Please enter your Mobile no';
    } else {
        IsValidPhone = true;
    }

    if (document.getElementById('MaleRadio').checked != true && document.getElementById('FemaleRadio').checked !== true) {
        IsValidategender = false;
        genderError.innerText = 'Please Select Your Gender';
    } else {
        genderError.innerText = "";
        IsValidategender = true;
    }

    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var IsValidatelang = false;
    var langError = document.getElementById('langError');
    var checkedValues = [];

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            IsValidatelang = true;
            checkedValues.push(checkboxes[i].value);
            // console.log(checkedValues)
        }
    }

    if (!IsValidatelang) {
        langError.innerText = 'Please select at least one language';
    } else {
        langError.innerText = '';
    }

    langError.innerText = IsValidatelang ? '' : 'Please Select Your language';

    if (document.getElementById('sltcountry').value === "-1") {
        document.getElementById('sltcountry').classList.add('border_red');
        IsValidateCountry = false;
        CountryError.textContent = 'Please Select Your Country';
    } else {
        IsValidateCountry = true;
    }

    if (document.getElementById('SelectState').value == "") {
        document.getElementById('SelectState').classList.add('border_red');
        IsValidateState = false;
        stateError.innerText = 'Select Your State';
    } else {
        IsValidateState = true;
    }

    if (document.getElementById("Comments").value == "") {
        document.getElementById('Comments').classList.add('border_red');
        IsValidTextarea = false;
        CommentsError.innerText = "Please fill the textarea";
    } else {
        IsValidTextarea = true;
    }

    var isValidForm = IsValidateInputText && IsValidateEmail && IsValidPhone && IsValidategender && IsValidatelang && IsValidateCountry && IsValidateState && IsValidTextarea && IsValidateDate;
    if (isValidForm) {
        var formObject = {};
        var form_data = new FormData(document.getElementById('form_id'));

        form_data.forEach(function(value, key) {
            formObject[key] = value;
        });

        var date = new Date();
        var current_time = date.toLocaleTimeString();
        var current_date = date.toLocaleDateString();

        formObject["current_date"] = current_time + '-' + current_date;

        var editIndex = parseInt(getCookie("editIndex"));
        if (!isNaN(editIndex) && editIndex >= 0) {
            var presentData = getCookie("presentData");
            if (presentData) {
                var presentDataArray = JSON.parse(presentData);
                if (editIndex < presentDataArray.length) {
                    presentDataArray[editIndex] = formObject;
                    document.cookie = 'presentData=' + JSON.stringify(presentDataArray);
                    alert('Record updated');
                    window.location.href = 'result.html';
                    return;
                }
            }
            console.error("Invalid editIndex:", editIndex);
            return;
        }

        var previousData = getCookie('presentData');
        var cookieObj = [];

        if (previousData) {
            try {
                cookieObj = JSON.parse(previousData);
            } catch (error) {
                console.error("Error parsing presentData cookie:", error);
            }
        }

        cookieObj.push(formObject);
        document.cookie = 'presentData=' + JSON.stringify(cookieObj);
        window.location.href = 'result.html';
    } else {
        return false;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var editDataCookie = getCookie('editData');

    if (editDataCookie) {
        var editData = JSON.parse(editDataCookie);

        document.getElementById('nameInput').value = editData.inputText || "";
        document.getElementById('emailInput').value = editData.inputEmail || "";
        document.getElementById('dateInput').value = editData.inputDate || "";
        document.getElementById('phoneInput').value = editData.inputPhonenumber || "";

        if (editData.Radio === 'male') {
            document.getElementById('MaleRadio').checked = true;
        } else if (editData.Radio === 'female') {
            document.getElementById('FemaleRadio').checked = true;
        }

        var checkboxes = document.getElementsByName('MyCheckbox');
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = editData.MyCheckbox.includes(checkboxes[i].value);
        }

        document.getElementById('sltcountry').value = editData.sltcountry || "";

        var selectState = document.getElementById('SelectState');
        for (var i = 0; i < selectState.options.length; i++) {
            selectState.options[i].selected = editData.sltstate.includes(selectState.options[i].value);
        }

        document.getElementById('Comments').value = editData.message || "";

        document.getElementById('submit').style.display = 'none';
        document.getElementById('update').style.display = 'block';
    }
});

function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}

document.getElementById('update').addEventListener('click', function() {
    var presentData = getCookie("presentData");

    if (presentData) {
        var presentDataArray = JSON.parse(presentData);
        var index = parseInt(getCookie("editIndex"));

        if (index >= 0 && index < presentDataArray.length) {
            var presentDataObject = presentDataArray[index];
            presentDataObject.inputText = document.getElementById('nameInput').value;
            presentDataObject.inputEmail = document.getElementById('emailInput').value;
            presentDataObject.inputDate = document.getElementById('dateInput').value;
            presentDataObject.inputPhonenumber = document.getElementById('phoneInput').value;
            presentDataObject.Radio = document.querySelector('input[name="Radio"]:checked').value;
            presentDataObject.MyCheckbox = Array.from(document.querySelectorAll('input[name="MyCheckbox"]:checked')).map(input => input.value);
            presentDataObject.sltcountry = document.getElementById('sltcountry').value;
            presentDataObject.sltstate = Array.from(document.getElementById('SelectState').selectedOptions).map(option => option.value);
            presentDataObject.message = document.getElementById('Comments').value;
            document.cookie = 'presentData=' + JSON.stringify(presentDataArray);
            alert('Record updated');
            window.location.href = 'result.html';
        } else {
            console.error("Invalid editIndex:", index);
        }
    } else {
        console.error("No presentData found in cookie");
    }
});

function inputTextValidation() {
    var nameInput = document.getElementById('nameInput');
    var textError = document.getElementById('textError');

    var trimmedValue = nameInput.value.trim();

    if (!/^[a-zA-Z ]*$/.test(trimmedValue) || trimmedValue === "") {
        textError.innerText = 'Only Characters allowed ';
    } else {
        nameInput.classList.remove('border_red');
        textError.innerHTML = "";
    }
}

function ValidateEmail() {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var emailInput = document.getElementById('emailInput').value.trim();
    var emailError = document.getElementById('emailError');
    if (emailInput == "") {
        emailError.innerText = "email cant be empty";
    } else if (!validRegex.test(emailInput)) {
        emailError.innerText = "Invalid @ emailId";
    } else {
        emailError.innerText = "";
        document.getElementById('emailInput').classList.remove('border_red');
    }
}

function dateChange() {
    var Input_date = document.getElementById('dateInput');

    if (Input_date.value == "") {
        dateError.innerText = 'Please select Your Date';
    } else if (Input_date.value) {
        dateError.innerText = "";
    } else {
        dateError.innerText = 'Please select Your Date';
    }
}

function ValidatePhone() {
    var phoneInput = document.getElementById('phoneInput').value;
    var phoneError = document.getElementById('phoneError');

    if (phoneInput == "") {
        phoneError.innerText = "";
    } else if (phoneInput.length != 10) {
        phoneError.innerText = 'phone no must be 10 digit only';
    } else {
        phoneError.innerText = "";
        document.getElementById('phoneInput').classList.remove('border_red');
    }
}

function genderChange() {
    var genderError = document.getElementById('genderError');
    if (document.getElementById('MaleRadio').checked != true && document.getElementById('FemaleRadio').checked !== true) {
        genderError.innerText = "Please Select Your Gender";
    } else {
        genderError.innerText = "";
    }
}

function ValidateCheckbox() {
    var checkbox = document.querySelectorAll('input[type="checkbox"]');
    var langError = document.getElementById('langError');
    var checked = false;

    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            checked = true;
            break;
        }
    }

    if (!checked) {
        alert('please fill atleast one field');
    }

    if (checkbox.checked = true) {
        langError.innerText = "";
    }
}

function countryChange(e) {
    var CountryError = document.getElementById('countryError');
    if (document.getElementById('sltcountry').value == e.target.value) {
        CountryError.textContent = '';
        document.getElementById('sltcountry').classList.remove('border_red');
    } else {
        CountryError.textContent = "Please Select Your Country";
    }
}

function stateChange(e) {
    var stateError = document.getElementById('stateError');
    if (document.getElementById('SelectState').value != "-1") {
        stateError.innerText = "";
        document.getElementById('SelectState').classList.remove('border_red');
    } else {
        stateError.innerText = "Select Your State";
    }
}

function verfiyTextaArea() {
    var comments = document.getElementById('Comments');
    var CommentsError = document.getElementById('commentError');

    if (comments.value == "") {
        CommentsError.innerText = "Please fill the textarea";
    } else if (comments.value) {
        CommentsError.innerText = "";
        comments.classList.remove('border_red');
    } else {
        CommentsError.innerText = "Please fill the textarea";
    }
}

function formReset() {
    alert('form reset successfully');
    var element = document.getElementById('form_id');
    element.reset();
}

function formClear() {
    alert('form clear all fields succesfully');
}
