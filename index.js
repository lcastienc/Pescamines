let filas = 0;
let columnas = 0;
function iniciarPartida() {
    filas = parseInt(prompt("Introduce el numero de filas,minimo 10 y maximo 30:"));
    columnas = parseInt(prompt("Introduce el numero de columnas, minimo 10 y maximo 30:"));
    filas = Math.max(10, Math.min(filas, 30));
    columnas = Math.max(10, Math.min(columnas, 30));

    crearTaulell(filas, columnas);
    // setMines(filas,columnas);
    // console.log("hola")
}

// function crearTaulell(filas,columnas){
//     let taulell = document.getElementById("taulell");
//     let tabla = document.createElement("table");

//      for (let index = 0; index < filas; index++) {
//         let fila = document.createElement("tr");
//         for (let ini = 0; ini < columnas; ini++) {
//             let celda = document.createElement("td");
//             let imagen = document.createElement("img");
//             celda.setAttribute("data-mina","false");
//             imagen.src="fons20px.jpg";
//             imagen.onclick = function(){
//                 obreCasella(`Fila: ${index}, Columna: ${ini}`);
//             };
//             celda.appendChild(imagen);
//             fila.appendChild(celda);
//         }
//         tabla.appendChild(fila);
//      }
//      taulell.innerHTML="";
//      taulell.appendChild(tabla);
//      setMines(filas,columnas);
// }

function crearTaulell() {
    let taulell = document.getElementById("taulell");
    let tabla = `<table>`;

    for (let index = 0; index < filas; index++) {
        tabla += "<tr>";
        for (let ini = 0; ini < columnas; ini++) {
            tabla += `<td data-mina ="false"><img src="fons20px.jpg" onclic ></td>`;
        }
        tabla += "</tr>"
    }

    tabla += "</table>"
    document.getElementById("taulell").innerHTML = tabla;
    setMines(filas,columnas);
}

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

function obreCasella() {

}
function calculaAdjacents() {

}

function esMina(x, y) {

}


function setMinesAdjacents(x, y, nMinesAdjacents) {

}
