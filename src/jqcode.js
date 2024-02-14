function ValidateSubmit(e) {
    console.log('form sumbitted attained')
    e.preventDefault();

    var IsValidateInputText = false;
    var Inputfield = $("#nameInput");
    var InputError = $("#textError");

    var IsValidPhone = false;
    var PhoneError = $("#phoneError");

    var IsValidategender = false;
    var genderError = $("#genderError");


    var IsValidateCountry = false;
    var CountryError = $("#countryError");


    var IsValidateState = false;
    var stateError = $("#stateError");

    var IsValidTextarea = false;
    var CommentsError = $("#commentError");

    var IsValidateDate = false;
    var Input_date = $("#dateInput")
    var dateError = $("#dateError");



    if (Inputfield.val() == "") {
        IsValidateInputText = false;
        Inputfield.addClass('border_red')
        InputError.text('Please fill input fields')
    }
    else {

        IsValidateInputText = true;
    }


    if ($("#emailInput").val() == "") {
        var Emailerror = $("#emailError")
        $("#emailInput").addClass('border_red')
        IsValidateEmail = false;
        Emailerror.text('Please fill your email')
    }
    else {
        IsValidateEmail = true
    }



    if (Input_date.val() == "") {
        $("#dateInput").addClass('border-red');
        dateError.text('please select your date')
        IsValidateDate = false;
    }
    else {
        IsValidateDate = true;
    }

    if ($("#phoneInput").val() == "") {
        $('#phoneInput').addClass('border_red')
        IsValidPhone = false;
        PhoneError.text('Please enter your Mobile no')
    }
    else {
        IsValidPhone = true
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



    if ($("#sltcountry").val() === "-1") {
        $("#sltcountry").addClass('border_red')
        IsValidateCountry = false;
        CountryError.text('Please Select Your Country')
    }
    else {
        IsValidateCountry = true
    }
    if ($("#SelectState").val() == "") {
        $("#SelectState").addClass('border_red')
        stateError.text('Select Your State')
        IsValidateState = false;
    }
    else {
        IsValidateState = true
    }


    if ($("#Comments").val() == "") {
        $('#Comments').addClass('border_red')
        IsValidTextarea = false;
        CommentsError.text("Please fill the textarea")
    }
    else {
        IsValidTextarea = true;
    }

    var isValidForm = IsValidateInputText && IsValidateEmail && IsValidPhone && IsValidategender && IsValidatelang && IsValidateCountry && IsValidateState && IsValidTextarea && IsValidateDate;
    if (isValidForm) {

        var formObject = {};
        var form_data = new FormData(document.getElementById('form_id'));

        form_data.forEach(function (value, key) {
            formObject[key] = value
        })


        var date = new Date();
        var current_time = date.toLocaleTimeString();
        var current_date = date.toLocaleDateString()

        formObject["current_date"] = current_time + '-' + current_date

        var previous_data = document.cookie;
        var cookieObj = []

        if (previous_data != "") {
            cookieObj = JSON.parse(previous_data);
            cookieObj.push(formObject)
        }
        else {
            cookieObj.push(formObject)
        }


        document.cookie = JSON.stringify(cookieObj);

        window.location.href = "result.html";

    }
    else {
        return false;
    }
}



//$('#form_id').submit(ValidateSubmit);




document.addEventListener("DOMContentLoaded", function () {

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

function getCookie(name){
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }
    return null;
}


function inputTextValidation() {
    var nameInput = $("#nameInput");
    var textError = $("#textError");

    var trimmedValue = nameInput.val().trim();

    if (!/^[a-zA-Z ]*$/.test(trimmedValue) || trimmedValue === "") {
        textError.text('Only Characters allowed ')
    }
    else {
        textError.text('')
        nameInput.removeClass('border_red')
    }
}



function ValidateEmail() {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    var emailInput = $("#emailInput").val().trim();;
    var emailError = $("#emailError")
    if (emailInput == "") {
        emailError.text("email cant be empty")
    }
    else if (!validRegex.test(emailInput)) {
        emailError.text("Invalid @ emailId")
    }
    else {
        emailError.text('')
        $("#emailInput").removeClass('border_red')
    }
}


function dateChange() {
    var Input_date = $("#dateInput");
    var dateError = $("#dateError")

    if (Input_date.val() == "") {
        dateError.text('Please select Your Date')
    }
    else if (Input_date.val()) {
        dateError.text('')
    }
    else {
        dateError.text('Please select Your Date')
    }
}


function ValidatePhone() {
    var phoneInput = $('#phoneInput').val();
    var phoneError = $('#phoneError')

    if (phoneInput == "") {
        phoneError.text('')
    }
    else if (phoneInput.length != 10) {
        phoneError.text('phone no must be 10 digit only')
    }
    else {
        phoneError.text('')
        $('#phoneInput').removeClass('border_red')
    }
}


function genderChange() {
    var genderError = $('#genderError');
    if (document.getElementById('MaleRadio').checked != true && document.getElementById('FemaleRadio').checked !== true) {
        genderError.text("Please Select Your Gender")
    }
    else {
        genderError.text('')
    }
}


function ValidateCheckbox() {
    var checkbox = document.querySelectorAll('input[type="checkbox"]');
    var langError = $('#langError');
    var checked = false;


    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            checked = true;
            break;
        }
    }

    if (!checked) {
        alert('please fill atleast one field')
    }

    if (checkbox.checked = true) {
        langError.text("")
    }
}


function countryChange(e) {
    var CountryError = $('#countryError');
    if ($('#sltcountry').val(e.target.value)) {
        CountryError.text('')
        $('#sltcountry').removeClass('border_red')
    }
    else {
        CountryError.text("Please Select Your Country")
    }
}


function stateChange() {
    var stateError = $('#stateError')
    if ($('#SelectState').val() != "-1") {
        stateError.text("")
        $('#SelectState').removeClass('border_red')
    }
    else {
        stateError.text("Select Your State")
    }
}


function verfiyTextaArea(){
    var comments = $('#Comments');
    var CommentsError = $('#commentError');

    if (comments.val() == "") {
        CommentsError.text("Please fill the textarea")
    }
    else if (comments.val()) {
        CommentsError.text("")
        comments.removeClass('border_red')
    }
    else {
        CommentsError.text("Please fill the textarea")
    }
}


function formReset(){
    alert('form reset successfully')
}


function formClear(){
    alert('form all data cleared')
}