let filas = 0;
let columnas = 0;

function iniciarPartida() {
    filas = parseInt(prompt("Introduce el numero de filas,minimo 10 y maximo 30:"));
    columnas = parseInt(prompt("Introduce el numero de columnas, minimo 10 y maximo 30:"));
    filas = Math.max(10, Math.min(filas, 30));
    columnas = Math.max(10, Math.min(columnas, 30));

    crearTaulell(filas, columnas);
}

//Aportacion para completar de Marco
function crearTaulell() {
    let taulell = document.getElementById("taulell");
    let tabla = `<table>`;

    for (let index = 0; index < filas; index++) {
        tabla += "<tr>";
        for (let ini = 0; ini < columnas; ini++) {
            tabla += `<td data-mina ="false"> <img onclick="obreCasella(${index},${ini})" src="fons20px.jpg"></td>`;
        }
        tabla += "</tr>"
    }
    tabla += "</table>"
    document.getElementById("taulell").innerHTML = tabla;
    setMines(filas, columnas);
}

//Colocamos las minas
function setMines(filas, columnas) {
    let areaTotal = filas * columnas;
    let minasAIntroducir = Math.floor(areaTotal * 0.17);

    console.log(minasAIntroducir);

    let minasInGame = 0;
    while (minasInGame < minasAIntroducir) {
        let filasAleatorias = Math.floor(Math.random() * filas);
        let columnasAleatorias = Math.floor(Math.random() * columnas);

        let celda = document.querySelector('#taulell table tr:nth-child(' + (filasAleatorias + 1) + ') td:nth-child(' + (columnasAleatorias + 1) + ')');

        if (celda.getAttribute("data-mina") !== "true") {
            celda.setAttribute("data-mina", "true");
            minasInGame++;
        }
    }
    console.log(minasInGame);
}

//Abrimos casilla 
function obreCasella(index, ini) {
    let celda = document.querySelector('#taulell table tr:nth-child(' + (index + 1) + ') td:nth-child(' + (ini + 1) + ')');

    if (esMina(index, ini) == true) {
        celda.innerHTML = '<img src="mina20px.jpg">';
        alert(`Fila: ${index} y Columna: ${ini} tiene mina, has perdido, vuelve a empezar`);
    } else {
        celda.innerHTML = '';
        let minasAdyacentes = calculaAdjacents(index, ini);

        if (minasAdyacentes === 0) {
            for (let i = index - 1; i <= index + 1; i++) {
                for (let j = ini - 1; j <= ini + 1; j++) {
                    if (i >= 0 && j >= 0 && i < filas && j < columnas) {
                        if (!(i === index && j === ini)) {
                            let celdaAdyacente = document.querySelector('#taulell table tr:nth-child(' + (i + 1) + ') td:nth-child(' + (j + 1) + ')');
                            let tieneMinaAdyacente = esMina(i, j);

                            if (!tieneMinaAdyacente) {
                                let minas = calculaAdjacents(i, j);
                                if (minas !== 0) {
                                    celdaAdyacente.textContent = minas;
                                } else if (celdaAdyacente.textContent === '') {
                                    obreCasella(i, j);
                                }
                            }
                        }
                    }
                }
            }
        } else {
            // Mostrar el número de minas adyacentes en la celda
            celda.textContent = minasAdyacentes;
        }
    }
}


//torna un boleà de si la posició x,y hi ha una mina. Solo retorna true o false
function esMina(x, y) {
    let celdaMina = document.querySelector('#taulell table tr:nth-child(' + (x + 1) + ') td:nth-child(' + (y + 1) + ')');

    if (celdaMina.getAttribute("data-mina") === "true") {
        return true;
    } else {
        return false;
    }
}

//Calcular las minas adyacentes a la celda que hacemos click
//No minas
function calculaAdjacents(index, ini) {
    let minasAdyacentes = 0;

    for (let i = index - 1; i <= index + 1; i++) {
        for (let j = ini - 1; j <= ini + 1; j++) {
            if (i >= 0 && j >= 0 && i < filas && j < columnas) {
                if (!(i === index && j === ini)) {
                    if (esMina(i, j)) {
                        minasAdyacentes++;
                    }
                }
            }
        }
    }

    return minasAdyacentes;
}

//estableix a la casella de posició x,y l’atribut del número de mines a nMinesAdjacents
function setMinesAdjacents(x, y, nMinesAdjacents) {

}



/**
Crea una pàgina html que contingui un botó d’iniciar partida i un div tal que:  
```<button onclick="iniciarPartida()">Iniciar Partida</button>```  
```<div id="taulell"></div>```  
Hecho
iniciarPartida() ha de demanar el número de files i de columnes que són de mínim 10 de cada. Si el
número introduït és menor, s’ignora i es situa a 10. Igualment el màxim és de 30 (si s’introdueix un
número major de 30 s’ignora i es situa en 30).   

Després el que ha de fer es invocar a crearTaulell(), que crearà una taula dinàmica del
número de files per el número de columnes especificat abans. Cada cel·la tindrà una custom html
property data-mina = "false" i contindrà una imatge fons20px.jpg. Cada imatge invocarà al polsar el
botó esquerre del ratolí al mètode obreCasella(‘...’);    

Després hi haurà un mètode setMines() que establirà la propietat de mina a true a un 17% de les
caselles totals.  

També has de crear un mètode ***calculaAdjacents()*** que recorrerà el taulell i apuntarà el
número de mines adjacents de cada casella en una custom html property data-num-mines
inicialment a cero.  

Has de crear les funcions:
* esMina(x,y); que torna un boleà de si la posició x,y hi ha una mina
* setMinesAdjacents(x,y,nMinesAdjacents); que estableix a la casella de
posició x,y l’atribut del número de mines a nMinesAdjacents
Pots crear funcions addicionals per completar la tasca proposada

 */