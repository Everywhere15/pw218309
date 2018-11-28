var detalleGrupo = localStorage.getItem("detalleGrupo");
var indice = localStorage.getItem("indice");
var grupo = localStorage.getItem("mostrador");

var btnGrupos = document.getElementsByClassName("btnGrupos");
var grupodetalle = "";
var VentanaDetallegrupo = function() {
  var url = "http://museobillete.azurewebsites.net/api/Expo/";
  console.log(url + indice);
  fetch(url + indice)
    .then(datos => datos.json())
    .then(datos => {
      grupodetalle =
        datos.mostradores[grupo].grupos[detalleGrupo].piezas[this.value]
          .detallesUrl;
      console.log(grupodetalle);
      window.open(grupodetalle, "_self");
    });
};

var buscaDetalleGrupos = function() {
  var url = "http://museobillete.azurewebsites.net/api/Expo/";
  console.log(url + indice);
  fetch(url + indice)
    .then(datos => datos.json())
    .then(datos => {
      document.getElementById("VentanaGrupoMonedas").innerHTML = "";
      grupos = datos.mostradores[grupo].grupos[detalleGrupo].piezas;
      var foto = "";
      for (let i = 0; i < grupos.length; i++) {
        document.getElementById("VentanaGrupoMonedas").innerHTML += `
                  <article class="abajoIzquierda">
                      <img src="${
                        datos.mostradores[grupo].grupos[detalleGrupo].piezas[i]
                          .imagenFondoUrl
                      }" class="imgFoto">
                  </article>
                  <article class="abajoDerecha">
                      <div class="txtNombre">${
                        datos.mostradores[grupo].grupos[detalleGrupo].piezas[i]
                          .titulo
                      }</div>
                     
                      <button class="btnGrupos" value="${i}">Piezas</button> 
                  </article>
                  <hr>
                  <br> 
  
              `;
      }

      for (let i = 0; i < btnGrupos.length; i++) {
        btnGrupos[i].addEventListener("click", VentanaDetallegrupo);
      }
    });
};

buscaDetalleGrupos();
