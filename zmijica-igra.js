$(document).ready(function () {
    let velicina;
    let tezina;
    let zmija = [];
    let hrana = 0;
    let superHrana = -1;
    let rez = 0;
    let pravac = "l";
    let handle3 = 0;
    let handle1=0;
    let najbolji = 0;
    let kraj = false;
    let niz=[];
    
    $(document).keydown(function (e) {
        switch (e.keyCode) {
            case 39: if (pravac != "r") pravac = "l";
                break;
            case 37: if (pravac != "l") pravac = "r";
                break;
            case 38: if (pravac != "d") pravac = "u";
                break;
            case 40: if (pravac != "u") pravac = "d";
                break;
        }
    })
    dodajTablu();
    pokreniIgru();
    let imePoslednjeg;
    function dodajTablu() {
        velicina = localStorage.getItem("velicina");
        if (velicina == "mala") velicina = 20;
        else if (velicina == "srednja") velicina = 30;
        else velicina = 40;
        let turn = true;
        if (localStorage.getItem("najbolji") != null) najbolji = localStorage.getItem("najbolji");
        for (let i = 0; i < velicina; i++) {
            turn = !turn;
            let red = $("<tr></tr>");
            for (let j = 0; j < velicina; j++) {
                let indeks = i * velicina + j;
                let celija = $("<td></td>").attr("id", "br" + indeks)
                    .css({
                        "width": "20px",
                        "height": "20px",
                        "border-style": "solid"
                    });
                if (turn) {
                    celija.css("background-color", " rgb(47, 52, 89)");
                    turn = false;
                }
                else {
                    celija.css("background-color", " rgb(30, 35, 89)");
                    turn = true;
                } red.append(celija);
            }
            $("#tabela").append(red);

        }
    }

    function generisiSuper() {
        while (true) {
            let nema = true;
            superHrana = Math.floor(Math.random() * velicina * velicina);
            if (hrana == superHrana) {
                continue;
            }
            for (let i = 0; i < zmija.length; i++) {
                if (zmija[i] == superHrana) {
                    nema = false;
                    break;
                }
            }
            if (nema) break;

        }
        setTimeout(izbrisiSuper, 4000);
        $("#br" + superHrana).css({
            "background-color": "gold",
            "border-radius": "50%"
        });

    }
    function generisiHranu() {
        while (true) {
            let nema = true;
            hrana = Math.floor(Math.random() * velicina * velicina);
            if (hrana == superHrana) {
                continue;
            }
            for (let i = 0; i < zmija.length; i++) {
                if (zmija[i] == hrana) {
                    nema = false;
                    break;
                }
            }
            if (nema) break;
        }

        $("#br" + hrana).css({
            "background-color": "red",
            "border-radius": "50%"
        });

    }
    function azurirajRezultat() {
        $("#now").text(rez);
        if (rez > najbolji) {
            najbolji = rez;
            localStorage.setItem("najbolji", najbolji);
        }
        $("#best").text(najbolji);
    }

    function izbrisiSuper() {
        izbrisi(superHrana);
        superHrana = -1;

    }
    function izbrisiHranu() {
        izbrisi(hrana);
    }
    function izbrisi(indeks) {
        if (((indeks % 2 == 0) && (Math.floor(indeks / velicina)) % 2 == 0) ||
            ((indeks % 2 == 1) && (Math.floor(indeks / velicina)) % 2 == 1)) $("#br" + indeks).css({
                "background-color": " rgb(30, 35, 89)",
                "border-radius": "0%"
            });
        else $("#br" + indeks).css({
            "background-color": "rgb(47, 52, 89)",
            "border-radius": "0%"
        });
    }
    function proveri(sledeci) {
        if (sledeci == hrana) {
            rez += 1;
            izbrisiHranu();
            generisiHranu();
            azurirajRezultat();
            return true;
        }
        if (sledeci == superHrana) {
            rez += 10;
            izbrisiSuper();
            azurirajRezultat();
            return true;
        }
        for (let i = 1; i < zmija.length; i++) {
            if (sledeci == zmija[i]) {
                prikaziRez();
                return false;
            }
        } return false;

    }

    function nacrtajZmiju() {
        for (let i = 0; i < zmija.length; i++) {
            $("#br" + zmija[i]).css("background-color", "CadetBlue");
        }
    }


    function pokreniIgru() {
        azurirajRezultat();
        tezina = localStorage.getItem("tezina");
        if (tezina == "lagano") tezina = 1;
        else if (tezina == "srednje") tezina = 2;
        else tezina = 3;

        for (let i = 0; i < 10; i++) {
            zmija.push(velicina / 2 * velicina - velicina / 2 - i);

        }
        generisiHranu();
        nacrtajZmiju();
        let interval = Math.floor(750 / tezina);
        handle3 = setInterval(pomeriZmiju, interval);
        handle1 = setInterval(generisiSuper, 10000);

    }
    
    function prikaziRez() {
        kraj = true;
        clearInterval(handle3);
        if(handle1 !=0)clearInterval(handle1);
        imePoslednjeg = prompt("Gotova igra!Unesite svoje ime!");
        localStorage.setItem("imePoslednjeg", imePoslednjeg);
        localStorage.setItem("rezultatPoslednjeg", rez);
        
        if(localStorage.getItem("igraci5")!=null){
            niz=JSON.parse(localStorage.getItem("igraci5"));
        }
        else niz=[];
        let korisnik={ime: imePoslednjeg, rezultat:rez};
        niz.push(korisnik);
        localStorage.setItem("igraci5",JSON.stringify(niz));
        window.location.href = "zmijica-rezultati.html";
        return false;
    }
    function pomeriZmiju() {
        //if(kraj)return;
        switch (pravac) {
            case "l":
                if ((zmija[0] + 1) % velicina == 0) {
                    prikaziRez();
                    return;
                }
                else {
                    if (!proveri(zmija[0] + 1)) {
                        izbrisi(zmija[zmija.length - 1]);
                        zmija.pop();
                    }
                    zmija = [zmija[0] + 1].concat(zmija);
                    nacrtajZmiju();
                }

                break;
            case "r": if ((zmija[0]) % velicina == 0) {
                prikaziRez();
                return;
            }
            else {
                if (!proveri(zmija[0] - 1)) {
                    izbrisi(zmija[zmija.length - 1]);
                    zmija.pop();
                }
                zmija = [zmija[0] - 1].concat(zmija);
                nacrtajZmiju();
            }

                break;
            case "u": if ((zmija[0] - velicina) < 0) {
                prikaziRez();
                return;
            }
            else {
                if (!proveri(zmija[0] - velicina)) {
                    izbrisi(zmija[zmija.length - 1]);
                    zmija.pop();
                }
                zmija = [zmija[0] - velicina].concat(zmija);
                nacrtajZmiju();
            }

                break;
            case "d": if ((zmija[0] + velicina) >= velicina * velicina) {
                prikaziRez();
                return;
            }
            else {
                if (!proveri(zmija[0] + velicina)) {
                    izbrisi(zmija[zmija.length - 1]);
                    zmija.pop();
                }
                zmija = [zmija[0] + velicina].concat(zmija);
                nacrtajZmiju();

            }

                break;
        }
    }

})