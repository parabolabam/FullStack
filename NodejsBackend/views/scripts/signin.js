(function() {


    var pass = document.getElementById('password');
    pass.addEventListener('change', function() {
        if (pass.value !== '') {
            document.getElementById('send').disabled = false;
            document.getElementById('send').focus()
        }
    })
})()