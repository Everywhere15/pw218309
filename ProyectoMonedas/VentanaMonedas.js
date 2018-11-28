var indice = localStorage.getItem("indice");
var grupo = localStorage.getItem("mostrador");

const { BrowserWindow } = require("electron").remote;
const app = require("electron").app;
const path = require("path");
const url = require("url");
let PantallaDetalleMonedas;
let PantallaDetalleGrupos;

var btnMostradores = document.getElementsByClassName("btnMostradores");

var VentanaDetalleMonedas = function() {
  var unico = "";
  var detalle = "";
  var detalleGrupo = "";

  var urls = "http://museobillete.azurewebsites.net/api/Expo/";
  fetch(urls + indice)
    .then(datos => datos.json())
    .then(datos => {
      unico = datos.mostradores[grupo].grupos[this.value].unico;

      if (unico == true) {
        detalle =
          datos.mostradores[grupo].grupos[this.value].piezas[0].detallesUrl;
        console.log(detalle);
        localStorage.setItem("detalle", detalle);
        PantallaDetalleMonedas = new BrowserWindow({ width: 500, height: 400 });
        PantallaDetalleMonedas.loadURL(
          url.format({
            pathname: path.join(__dirname, "MonedaDetalle.html"),
            protocol: "file",
            slashes: true
          })
        );

        //PantallaDetalleMonedas.show();
      } else {
        detalleGrupo = this.value;
        console.log(detalle);
        localStorage.setItem("detalleGrupo", detalleGrupo);
        PantallaDetalleGrupos = new BrowserWindow({ width: 700, height: 600 });
        PantallaDetalleGrupos.loadURL(
          url.format({
            pathname: path.join(__dirname, "PantallaDetalleGrupos.html"),
            protocol: "file",
            slashes: true
          })
        );
        console.log("es falso");
      }
    });
};

var buscaDetalleComics = function() {
  var url = "http://museobillete.azurewebsites.net/api/Expo/";
  console.log(url + indice);
  fetch(url + indice)
    .then(datos => datos.json())
    .then(datos => {
      document.getElementById("VentanaMonedas").innerHTML = "";
      grupos = datos.mostradores[grupo].grupos;
      var foto = "";
      var descrip = "";
      for (let i = 0; i < grupos.length; i++) {
        descrip = datos.mostradores[grupo].grupos[i].descripcion;
        if (descrip == null) {
          descrip = "Grupo de Piezas";
        }

        document.getElementById("VentanaMonedas").innerHTML += `
				<article class="abajoIzquierda">
					<img src="${datos.mostradores[grupo].grupos[i].imagenFondoUrl}" class="imgFoto">
				</article>
				<article class="abajoDerecha">
					<div class="txtNombre">${datos.mostradores[grupo].grupos[i].titulo}</div>
          <div class="txtNombre">${descrip}
          </div>
					<button class="btnMostradores" value="${i}">Detalle</button> 
				</article>
				<hr>
				<br> 

			`;
      }

      for (let i = 0; i < btnMostradores.length; i++) {
        btnMostradores[i].addEventListener("click", VentanaDetalleMonedas);
      }
    });
};

buscaDetalleComics();
