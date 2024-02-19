$(document).ready(function() {
    $('#btn').click(function(error) {
        const num = parseInt($('#idHero').val());
        let isnum = /^[0-9]+$/;

        error.preventDefault();

        if (isnum.test(num)) {
            console.log(num)
            whatHero(num);
        } else {
            alert('Por favor ingrese un valor numérico');
        }
    });

    function whatHero(num) {
        
    }

});