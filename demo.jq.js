$(document).ready(function() {
    $('#form_id').submit(function(e) {
        e.preventDefault();
        console.log("Form submission attempted.");

        var IsValidateInputText = false;
        var Inputfield = $('#nameInput');
        var InputError = $('#textError');

        var IsValidateEmail = false;
        var Emailerror = $('#emailError');

        var IsValidPhone = false;
        var PhoneError = $('#phoneError');

        var IsValidategender = false;
        var genderError = $('#genderError');

        var IsValidateCountry = false;
        var CountryError = $('#countryError');

        var IsValidateState = false;
        var stateError = $('#stateError');

        var IsValidTextarea = false;
        var CommentsError = $('#commentError');

        var IsValidateDate = false;
        var Input_date = $('#dateInput');
        var dateError = $('#dateError');

        if (Inputfield.val() === "") {
            IsValidateInputText = false;
            Inputfield.addClass('border_red');
            InputError.text('Please fill input fields');
        } else {
            IsValidateInputText = true;
        }

        // Similarly, complete the rest of your validation logic

        // Form validation completed
        var isValidForm = IsValidateInputText && IsValidateEmail && IsValidPhone && IsValidategender && IsValidatelang && IsValidateCountry && IsValidateState && IsValidTextarea && IsValidateDate;

        if (isValidForm) {
            // Create formObject, formDataJSON, and set cookie
            var formObject = {};
            var form_data = new FormData($('#form_id')[0]);

            form_data.forEach(function(value, key) {
                formObject[key] = value;
            });

            var date = new Date();
            var current_time = date.toLocaleTimeString();
            var current_date = date.toLocaleDateString();

            formObject["current_date"] = current_time + '_' + current_date;

            var formDataJSON = JSON.stringify(formObject);
            document.cookie = formDataJSON;

            console.log(formDataJSON);

            // Redirect to result.html
            window.location.href = 'result.html';
        } else {
            return false;
        }
    });

    // Validation functions
    $('#nameInput').on('input', function() {
        inputTextValidation();
    });

    $('#emailInput').on('input', function() {
        ValidateEmail();
    });

    $('#phoneInput').on('input', function() {
        ValidatePhone();
    });

    $('#MaleRadio, #FemaleRadio').change(function() {
        genderChange();
    });

    $('input[type="checkbox"]').change(function() {
        ValidateCheckbox();
    });

    $('#sltcountry').change(function(e) {
        countryChange(e);
    });

    $('#SelectState').change(function(e) {
        stateChange(e);
    });

    $('#Comments').on('input', function() {
        verfiyTextaArea();
    });

    // Form Reset and Clear functions
    $('#resetBtn').click(function() {
        alert('Form reset successfully');
        $('#form_id')[0].reset();
    });

    $('#clearBtn').click(function() {
        alert('Form cleared all fields successfully');
        $('input[type="text"], input[type="email"], input[type="tel"], textarea, input[type="radio"], input[type="checkbox"], select').val('');
        $('input[type="text"], input[type="email"], input[type="tel"], textarea').removeClass('border_red');
        $('select').removeClass('border_red');
    });
});
