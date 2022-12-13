function afficherDiv(id_div) {
    var div = document.getElementById(id_div);
    if (div.style.display === "none") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
}
$(document).ready(function() {
    $('#exampleModalLong').modal('show');
});

function afficherRecettes() {
    var div = document.getElementById('recettess');
    var bouton = document.getElementById('oui');
    div.style.display = "block";
    bouton.setAttribute('disabled', '')
}