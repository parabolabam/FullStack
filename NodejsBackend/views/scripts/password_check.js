(function() {
    'use strict'
    var badpassword = `Password you've put is the bad password &#10008`;
    var goodpassword = `Password you've put is the Good password &#10004`;
    var pass_check = document.getElementById("password");
    var confirm = document.getElementById("confirm");
    var clean = document.getElementById('clean')

    confirm.addEventListener('change', () => {
        if (pass_check.value === '') {
            alert('Empty password');
            pass_check.focus();

        }
        if (confirm.value !== pass_check.value) {
            confirm.value = '';
            pass_check.value = '';
            alert("try again, passwords must be the same");
            pass_check.focus();
        }
    })

})()