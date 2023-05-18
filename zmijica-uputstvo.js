$(document).ready(function(){
    $("#zapocni").click(function(){
        
        let velicina = $('input[name="velicina"]:checked').val();
        let tezina=$('input[name="tezina"]:checked').val();
        localStorage.setItem("velicina",velicina);
        localStorage.setItem("tezina",tezina);
        window.location.href="zmijica-igra.html";
    })
    $("#rezultati").click(function(){
        
        window.location.href="zmijica-rezultati.html";
    })

})