window.onload= function(){
	var operador="";
		var colorAmarillo = function(){
		this.style.background = "yellow";
	}
	var colorBlanco = function(){
		this.style.background = "white";
	}

var operando1=document.getElementById("operando1");
operando1.addEventListener("focus",colorAmarillo);
operando1.addEventListener("focusout",colorBlanco);

var operando2=document.getElementById("operando2");
operando2.addEventListener("focus",colorAmarillo);
operando2.addEventListener("focusout",colorBlanco);


/* Insertar numeros */

var numeros = function(){

var valor = this.value;

	if (operador=="") { //operando1

		var valorInput=document.getElementById("operando1").value;
		if (valorInput=="0") {
			document.getElementById("operando1").value="";			
		}
		document.getElementById("operando1").value+=valor;


	}else //operando2
	{
		var valorInput=document.getElementById("operando2").value;
		if (valorInput=="0") {
			document.getElementById("operando2").value="";
			 }
		document.getElementById("operando2").value+=valor;
	}
	




}

var cero=document.getElementById("cero");
cero.addEventListener("click",numeros);

var uno=document.getElementById("uno");
uno.addEventListener("click",numeros);




























}
