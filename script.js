const selectNumDimensiones = document.getElementById("num-dimensiones");
const coordenadas2D = document.getElementById("coordenadas-2d");
const coordenadas3D = document.getElementById("coordenadas-3d");
const cuadrante2D = document.getElementById("cuadrante-2d");
const btnCalcular = document.getElementById("btn-calcular");
const spanMagnitud = document.getElementById("magnitud");
const pFormulaMagnitud = document.getElementById("formula-magnitud");
const spanAngulo = document.getElementById("angulo");
const pCuadrante = document.getElementById("cuadrante");
const pCosenos = document.getElementById("cosenos");
const pVectorUnitario = document.getElementById("vector-unitario");
const pDireccion = document.getElementById("direccion");
const pFormulaAngulo = document.getElementById("formula-angulo");
const pFormulaCuadrante = document.getElementById("formula-cuadrante");
const pFormulaCosenos = document.getElementById("formula-cosenos");
const pFormulaVectorUnitario = document.getElementById("formula-vector-unitario");
const pFormulaDireccion = document.getElementById("formula-direccion");


//seleccionar calculadora

function mostrarCalculadora(tipo) {
  const titulo = document.getElementById("titulo");
  const seleccionCalculadora = document.getElementById("seleccion-calculadora");
  const calculadoraVectores = document.getElementById("calculadora-vectores");
  const calculadoraMatrices = document.getElementById("calculadora-matrices");


  if (tipo === "vector") {
    titulo.style.display = "nones";
    seleccionCalculadora.style.display = "none";
    calculadoraVectores.style.display = "block";
    calculadoraMatrices.style.display = "none";
  } else if (tipo === "matriz") {
    titulo.style.display = "none";
    seleccionCalculadora.style.display = "none";
    calculadoraVectores.style.display = "none";
    calculadoraMatrices.style.display = "block";
  }
   else if (tipo === "operacionesDos") {
    titulo.style.display = "none";
    seleccionCalculadora.style.display = "none";
    calculadoraVectores.style.display = "none";
    calculadoraMatrices.style.display = "none";
    operacionesDos.style.display ="block";
  }
}





//seleccionar las cordenadas del vector

selectNumDimensiones.addEventListener("change", (event) => {
  const numDimensiones = event.target.value;
  if (numDimensiones === "2") {
    coordenadas2D.style.display = "block";
    coordenadas3D.style.display = "none";
  } else if (numDimensiones === "3") {
    coordenadas2D.style.display = "none";
    coordenadas3D.style.display = "block";
  }
});


btnCalcular.addEventListener("click", (event) => {
  event.preventDefault(); // que no se envie el formulario

  //valores del vector
  let x, y, z;
  const numDimensiones =
    selectNumDimensiones.options[selectNumDimensiones.selectedIndex].value;
  if (numDimensiones === "2") {
    x = Number(document.getElementById("x-2d").value);
    y = Number(document.getElementById("y-2d").value);
    z = 0;
  } else if (numDimensiones === "3") {
    x = Number(document.getElementById("x-3d").value);
    y = Number(document.getElementById("y-3d").value);
    z = Number(document.getElementById("z-3d").value);
  }

 
  if (isNaN(x) || isNaN(y) || isNaN(z)) {
    alert("Introduce un valor numérico en todas las coordenadas");
    return;
  }

  //calcular la magnitud del vector
  const magnitud = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
  spanMagnitud.textContent = `La magnitud es: ${magnitud.toFixed(2)}`;
  pFormulaMagnitud.style.display = "block";

  if (numDimensiones === "2") {
    //calcular el angulo del vector en 2 dimensiones
    const angulo = Math.atan2(y, x) * (180 / Math.PI);
    spanAngulo.textContent = `El ángulo es: ${angulo.toFixed(2)}°`;
    spanAngulo.style.display = "block";
    pCuadrante.style.display = "block";
    pFormulaAngulo.style.display = "block";

   //cuadrante
    let cuadrante;
    if (x > 0 && y > 0) {
      cuadrante = "I";
    } else if (x < 0 && y > 0) {
      cuadrante = "II";
    } else if (x < 0 && y < 0) {
      cuadrante = "III";
    } else if (x > 0 && y < 0) {
      cuadrante = "IV";
    } else {
      cuadrante = "No definido";
    }
    pCuadrante.textContent = `El vector se encuentra en el cuadrante ${cuadrante}`;
    pFormulaCuadrante.style.display = "block";
  } else if (numDimensiones === "3") {
    
    //calcular angulo3d
    const anguloXY = Math.atan2(y, x) * (180 / Math.PI);
    const anguloXZ = Math.atan2(Math.sqrt(x ** 2 + y ** 2), z) * (180 / Math.PI);
    spanAngulo.innerHTML = `El ángulo en el plano XY es: ${anguloXY.toFixed(2)}°<br>
      El ángulo en el plano XZ es: ${anguloXZ.toFixed(2)}°`;
    spanAngulo.style.display = "block";
    pCosenos.style.display = "block";
    pVectorUnitario.style.display = "block";
    pDireccion.style.display = "block";
    pFormulaAngulo.style.display = "block";
    pFormulaCosenos.style.display = "block";
    pFormulaVectorUnitario.style.display = "block";
    pFormulaDireccion.style.display = "block";
    
    //codigo cosenos
    
    const cosenoX = x / magnitud;
    const cosenoY = y / magnitud;
    const cosenoZ = z / magnitud;
    pCosenos.innerHTML = `Los cosenos directores son:<br>
      Coseno θ (eje x): ${cosenoX.toFixed(2)}<br>
      Coseno φ (eje y): ${cosenoY.toFixed(2)}<br>
      Coseno λ (eje z): ${cosenoZ.toFixed(2)}`;
    
    //calcular el vector unitario del vector en 3D
    
    const vectorUnitario = `(${(x / magnitud).toFixed(2)})i + (${(y / magnitud).toFixed(2)})j + (${(z / magnitud).toFixed(2)})k`;
    pVectorUnitario.innerHTML = `El vector unitario es: ${vectorUnitario}`;

    //calcular la direccion del vector en 3D
    
   let direccion;
    if (isNaN(anguloXY) || isNaN(anguloXZ)) {
      direccion = "No definida";
    } else {
      if (anguloXY >= -90 && anguloXY < 90 && anguloXZ >= 0 && anguloXZ < 90) {
        direccion = "En el primer octante (hacia arriba y hacia adelante)";
      } else if (anguloXY >= 90 && anguloXY < 180 && anguloXZ >= 0 && anguloXZ < 90) {
        direccion = "En el segundo octante (hacia abajo y hacia adelante)";
      } else if (anguloXY >= 180 && anguloXY < 270 && anguloXZ >= 0 && anguloXZ < 90) {
        direccion = "En el tercer octante (hacia abajo y hacia atrás)";
      } else if ((anguloXY >= -180 && anguloXY < -90 || anguloXY >= 270 && anguloXY < 360) && anguloXZ >= 0 && anguloXZ < 90) {
        direccion = "En el cuarto octante (hacia arriba y hacia atrás)";
      } else if (anguloXY >= 0 && anguloXY < 90 && anguloXZ >= 90 && anguloXZ < 180) {
        direccion = "En el quinto octante (hacia arriba y hacia adelante)";
      } else if (anguloXY >= 90 && anguloXY < 180 && anguloXZ >= 90 && anguloXZ < 180) {
        direccion = "En el sexto octante (hacia abajo y hacia adelante)";
      } else if (anguloXY >= 180 && anguloXY < 270 && anguloXZ >= 90 && anguloXZ < 180) {
        direccion = "En el séptimo octante (hacia abajo y hacia atrás)";
      } else if ((anguloXY >= -180 && anguloXY < -90 || anguloXY >= 270 && anguloXY < 360) && anguloXZ >= 90 && anguloXZ < 180) {
        direccion = "En el octavo octante (hacia arriba y hacia atraas)";
      } else {
        direccion = "No definida";
      }
    }
    pDireccion.textContent = `La direccion del vector es: ${direccion}`;
  }
});

const LimpiarCal = document.getElementById("LimpiarCalculadora");

function LimpiarCalculadora() {
  document.getElementById("anguloXY").value = "";
  document.getElementById("anguloXZ").value = "";
  document.getElementById("direccion").textContent = "";
}

function crearCampoInput(id) {
  const input = document.createElement("input");
  input.type = "text";
  input.className = "matriz-input";
  input.id = id;
  return input;
}

function crearMatrizInput(dimensiones) {
  const matrizInput = document.getElementById("matriz-input");
  matrizInput.innerHTML = "";
  
  for (let i = 0; i < dimensiones; i++) {
    const fila = document.createElement("div");
    fila.className = "fila";
    
    for (let j = 0; j < dimensiones; j++) {
      const inputId = `input-${i}-${j}`;
      const input = crearCampoInput(inputId);
      fila.appendChild(input);
    }
    
    matrizInput.appendChild(fila);
  }
}

function obtenerMatrizIngresada(dimensiones) {
  const matrizIngresada = [];
  
  for (let i = 0; i < dimensiones; i++) {
    const fila = [];
    
    for (let j = 0; j < dimensiones; j++) {
      const inputId = `input-${i}-${j}`;
      const valor = parseFloat(document.getElementById(inputId).value);
      fila.push(valor);
    }
    
    matrizIngresada.push(fila);
  }
  
  return matrizIngresada;
}

function mostrarMatriz(matriz, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";
  
  const tabla = document.createElement("table");
  
  for (let i = 0; i < matriz.length; i++) {
    const fila = document.createElement("tr");
    
    for (let j = 0; j < matriz[i].length; j++) {
      const celda = document.createElement("td");
      celda.textContent = matriz[i][j];
      fila.appendChild(celda);
    }
    
    tabla.appendChild(fila);
  }
  
  contenedor.appendChild(tabla);
}

function calcularInversa() {
  const dimensiones = parseInt(document.getElementById("dimensiones").value);
  const matrizIngresada = obtenerMatrizIngresada(dimensiones);
  
  if (matrizIngresada.length !== dimensiones) {
    alert("La matriz ingresada no tiene las dimensiones correctas.");
    return;
  }
  
  const identidad = crearIdentidad(dimensiones);
  const matrizExtendida = matrizIngresada.map((fila, i) => [...fila, ...identidad[i]]);
  
  for (let i = 0; i < dimensiones; i++) {
    const elementoDiagonal = matrizExtendida[i][i];
    
    if (elementoDiagonal === 0) {
      alert("La matriz ingresada no tiene inversa.");
      return;
    }
    
    for (let j = 0; j < 2 * dimensiones; j++) {
      matrizExtendida[i][j] /= elementoDiagonal;
    }
    
    for (let k = 0; k < dimensiones; k++) {
      if (k !== i) {
        const coeficiente = matrizExtendida[k][i];
        
        for (let j = 0; j < 2 * dimensiones; j++) {
          matrizExtendida[k][j] -= coeficiente * matrizExtendida[i][j];
        }
      }
    }
  }
  
  const matrizInversa = matrizExtendida.map((fila) => fila.slice(dimensiones));
  
  mostrarMatriz(matrizIngresada, "matriz-original");
  mostrarMatriz(matrizInversa, "matriz-inversa");
}

function crearIdentidad(dimensiones) {
  const identidad = [];
  
  for (let i = 0; i < dimensiones; i++) {
    const fila = [];
    
    for (let j = 0; j < dimensiones; j++) {
      fila.push(i === j ? 1 : 0);
    }
    
    identidad.push(fila);
  }
  
  return identidad;
}

document.getElementById("dimensiones").addEventListener("change", function () {
  const dimensiones = parseInt(this.value);
  crearMatrizInput(dimensiones);
});

document.getElementById("btn-calcular-two").addEventListener("click", calcularInversa);

function limpiarCalculadoraMatrices() {
  const calculadoraMatrices = document.getElementById("calculadora-matrices");
  const seleccionCalculadora = document.getElementById("seleccion-calculadora");
  
  seleccionCalculadora.style.display = "block";
  calculadoraMatrices.style.display = "none";
  titulo.style.display = "block";
}






