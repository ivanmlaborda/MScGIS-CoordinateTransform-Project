function conviertePunto(){
  console.debug("aquí transformaremos las coordenadas");

  //Definimos los sistemas de referencia de entrada y salida
  var epsgEntrada = document.getElementById('sel_epsg_entrada').options[document.getElementById('sel_epsg_entrada').selectedIndex].value;
  var epsgSalida = document.getElementById('sel_epsg_salida').options[document.getElementById('sel_epsg_salida').selectedIndex].value;

  console.debug("EPSG entrada: "+epsgEntrada);
  console.debug("EPSG salida: "+epsgSalida);
  //obtenemos el valor de entrada del punto
  var coordenadaX = document.getElementById("entradaX").value
  var coordenadaY = document.getElementById("entradaY").value
  //convertimos el punto a float
  var coordenadaX_float = parseFloat(coordenadaX);
  var coordenadaY_float = parseFloat(coordenadaY);
  // creamos el punto de entrada con los valores del formulario
  var pEntrada = proj4.toPoint([coordenadaX_float,coordenadaY_float]);
  console.debug(pEntrada);
  // transformamos las coordenadas del punto de entrada
  var pSalida = proj4(epsgEntrada, epsgSalida, pEntrada);
  console.debug(pSalida);
  //mostramos las propiedades del epsgSalida
  var projSalida = proj4.Proj(epsgSalida);
  console.debug(projSalida);
  //mostramos la propiedad ellipseName del epsgSalida
  var elipseSalida = projSalida.ellipseName;
  console.debug("Propiedad ellipseName del epsgSalida: " + elipseSalida);
  //mostramos el resultado en los campos de salida
  document.getElementById("resultado_transformacion").innerHTML =
  '<br>' +
  "Resultado de la transformación de coordenadas: " +
  '<span class="result_coord">'+coordenadaX+'</span>'
  + ", " +
  '<span class="result_coord">'+coordenadaY+'</span>'
  + " en " +
  '<span class="result_epsg">'+epsgEntrada+'</span>'
  + " al " +
  '<span class="result_epsg">'+epsgSalida+'</span>'
  + " = " +
  '<span class="result_coord">'+pSalida.x+'</span>'
  + ", " +
  '<span class="result_coord">'+pSalida.y+'</span>'
  +'<br>'
  +'<br>'
  ;

  document.getElementById("historico").innerHTML +=
  '<span>'+coordenadaX+'</span>'
  + ", " +
  '<span>'+coordenadaY+'</span>'
  + " en " +
  '<span>'+epsgEntrada+'</span>'
  + " al " +
  '<span>'+epsgSalida+'</span>'
  + " = " +
  '<span class="result_coord_historico">'+pSalida.x+'</span>'
  + ", " +
  '<span class="result_coord_historico">'+pSalida.y+'</span>'
  +'<br>'
  +'<br>'
  ;
}

function mostrarResultado(objeto){
  objeto.style.display = "block";
}

function ocultarResultado(objeto){
  objeto.style.display = "none";
}

function limpiarResultado(){
  document.getElementById("resultado_transformacion").innerHTML = "";
}

function limpiarHistorico(){
  document.getElementById("historico").innerHTML = "";
}
