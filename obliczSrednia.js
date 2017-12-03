var listaPrzedmiotow = document.querySelectorAll('.ocenyZwykle-table tbody tr');
if (listaPrzedmiotow.length > 0) {
    //INFO: pentla przedmiotow
    for (var i = 1, len = listaPrzedmiotow.length; i < len; i++) {
        //console.group("Ocency: " + i);
        var listaPolPrzedmiotu = Array();
        // INFO: pentla dla pol poziomych
        for (var j = 0; j < 4; j++) {
            listaPolPrzedmiotu.push(listaPrzedmiotow[i].getElementsByTagName('td')[j]);
        }

        //INFO: pobieranie ocen i wagi do średniej
        var listaOcen = Array();
        var wartoscOceny = Array();
        var sumaWartosciOcen = 0.0;
        var sumaWagi = 0;
        listaOcen = listaPolPrzedmiotu[1].getElementsByTagName('span');
        // INFO:pentla ocen
        for (var k = 0; k < listaOcen.length; k++) {
            textOceny = listaOcen[k].innerText;
            console.log(textOceny[0]);
            if (!isNumeric(textOceny[0])) {
                //console.log("to nie liczba")
                waga = 0;
            } else {
                //console.log("to liczba")
                wagaSzukamy = listaOcen[k].attributes.alt.textContent;
                wagas = wagaSzukamy.search("Waga: ") + 6;
                waga = parseFloat(wagaSzukamy[wagas]);
                if (textOceny[1] == "+") {
                    sumaWartosciOcen += (parseFloat(textOceny[0]) + 0.25) * parseFloat(waga);
                } else if (textOceny[1] == '-') {
                    sumaWartosciOcen += (parseFloat(textOceny[0]) - 0.25) * parseFloat(waga);
                } else if (textOceny[1] == 'p') {
                    waga = 0;
                } else {
                    sumaWartosciOcen += parseFloat(textOceny[0]) * parseFloat(waga);
                }
            }

            sumaWagi += waga;
        }

        var srednia = sumaWartosciOcen / sumaWagi;

        var dodajSrednio = listaPolPrzedmiotu[3];
        var pokazSrednio = document.createElement('span');
        pokazSrednio.innerHTML = srednia.toFixed(2);
        dodajSrednio.appendChild(pokazSrednio);
        //console.log(listaPolPrzedmiotu[0].innerText + " / " + srednia.toFixed(2))
        //console.groupEnd();
    }
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}