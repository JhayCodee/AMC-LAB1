// Obtener los botones de los programas
const btnPrograma1 = document.getElementById('btnPrograma1');
const btnPrograma2 = document.getElementById('btnPrograma2');

// Función para cargar el programa 1
function cargarPrograma1() {
    fetch('../views/program1.html')
        .then(response => response.text())
        .then(html => {

            document.getElementById('section_2').innerHTML = html;

            const botonComparar = document.getElementById('botonComparar');

            botonComparar.addEventListener('click', () => {
                // Recoger valores del formulario y convertirlos a números
                const magnitudtiempoA = Number(document.getElementById('tteA').value); // Selección de la magnitud del tiempo
                const tiempoEjecucionA = Number(document.getElementById('teA').value);

                const magnitudfrecuenciaA = Number(document.getElementById('tfA').value); // Selección de la magnitud de la frecuencia
                const frecuenciaA = Number(document.getElementById('fA').value);

                const magnitudtiempoB = Number(document.getElementById('tteB').value); // Selección de la magnitud del tiempo
                const tiempoEjecucionB = Number(document.getElementById('teB').value);
                const magnitudfrecuenciaB = Number(document.getElementById('tfB').value); // Selección de la magnitud de la frecuencia
                const frecuenciaB = Number(document.getElementById('fB').value);
                
                const ciclosParaAoB = Number(document.getElementById('cpiParaAoB').value); // Ciclos para A o B CPIA = Numero * CPIB o CPIB = Numero * CPIA
                const cpi = Number(document.getElementById('ciclosAoB').value);

                // Función para ajustar la frecuencia según el tipo para retornar en MHz
                function ajustarFrecuencia(frecuencia, tipof) {
                    switch(tipof) {
                        case 1: // MHz                            
                            return frecuencia;
                        case 2: // kiloHetz a MHz
                            return frecuencia * 1e-3;
                        case 3: // Hz a MHz
                            return frecuencia * 1e-6;
                        default:
                            return frecuencia; // Por defecto asume que ya está en MHz
                    }
                }

                // Función para ajustar el tiempo de ejecución según el tipo para retornar en segundos
                function ajustarTiempoEjecucion(tiempoEjecucion, tipot) {
                    switch(tipot) {
                        case 1: // s
                            return tiempoEjecucion;
                        case 2: // ns a s                        
                            return tiempoEjecucion * 1e9;
                        case 3: // kilosegundos a segundos                            
                            return tiempoEjecucion * 1e3;
                        default:                            
                            return tiempoEjecucion; // Por defecto asume que ya está en s
                    }
                }

                function asignarCiclos(darCPI, cpiPara) {
                    switch(cpiPara) {
                        case 1: // Dar CPI para A
                            return darCPI;                            
                        case 2: // Dar CPI para B
                            return darCPI;
                        default:
                            return darCPI; // Por defecto para A
                    }
                }
            
                // calcular el tiempo de ejecución o frecuencia
                const frecuenciaAjustadaA = ajustarFrecuencia(frecuenciaA, magnitudfrecuenciaA);
                const frecuenciaAjustadaB = ajustarFrecuencia(frecuenciaB, magnitudfrecuenciaB);
                const tiempoEjecucionAjustadoA = ajustarTiempoEjecucion(tiempoEjecucionA, magnitudtiempoA);
                const tiempoEjecucionAjustadoB = ajustarTiempoEjecucion(tiempoEjecucionB, magnitudtiempoB);
                const ciclos = asignarCiclos(cpi, ciclosParaAoB);

                if(tiempoEjecucionB == 0){
                    const tb = (tiempoEjecucionAjustadoA * frecuenciaAjustadaA) / (ciclos * frecuenciaAjustadaB);
                    const ta = tiempoEjecucionAjustadoA;

                    mostrarResultados(ta, tb, ta*1e9, tb*1e9, frecuenciaAjustadaA, frecuenciaAjustadaB);
                }else if(tiempoEjecucionA == 0){
                    const ta = (ciclos * tiempoEjecucionAjustadoB * frecuenciaAjustadaB) / frecuenciaAjustadaA;
                    const tb = tiempoEjecucionAjustadoB;
                    mostrarResultados(ta, tb, ta*1e9, tb*1e9, frecuenciaAjustadaA, frecuenciaAjustadaB);

                }else if(frecuenciaA == 0){
                    const fa = (frecuenciaB * tiempoEjecucionAjustadoB) / (ciclos * tiempoEjecucionAjustadoA);
                    const fb = frecuenciaAjustadaB;
                    mostrarResultados(tiempoEjecucionAjustadoA,tiempoEjecucionAjustadoB, tiempoEjecucionAjustadoA*1e9, tiempoEjecucionAjustadoB*1e9,fa, fb);
                }else{
                    console.log("ciclos",ciclos);
                    console.log("frecuenciaAjustadaA",frecuenciaAjustadaA);
                    console.log("tiempoEjecucionAjustadoA",tiempoEjecucionAjustadoA);
                    console.log("tiempoEjecucionAjustadoB",tiempoEjecucionAjustadoB);
                    const fb = (ciclos * frecuenciaAjustadaA * tiempoEjecucionAjustadoA) / (tiempoEjecucionAjustadoB);
                    const fa = frecuenciaAjustadaA;
                    mostrarResultados(tiempoEjecucionAjustadoA,tiempoEjecucionAjustadoB, tiempoEjecucionAjustadoA*1e9, tiempoEjecucionAjustadoB*1e9,fa, fb);
                }
            });
            
            function mostrarResultados(tiempo1s, tiempo2s, tiempo1n, tiempo2n, frecuencia1, frecuencia2) {
                    // Asegurarse de que los tiempos son números
                    tiempo1s = parseFloat(tiempo1s);
                    tiempo2s = parseFloat(tiempo2s);
                    tiempo1n = parseFloat(tiempo1n);
                    tiempo2n = parseFloat(tiempo2n);
                    frecuencia1 = parseFloat(frecuencia1);
                    frecuencia2 = parseFloat(frecuencia2);

                const resultados = document.getElementById('resultadoComparacion');
                resultados.innerHTML = `
                    <div class="alert alert-success" role="alert">
                        <h4>Resultados de Comparación</h4>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Segundos</th>
                                    <th scope="col">Nanosegundos</th>
                                    <th scope="col">Frecuencia en MHz</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">CPU 1:</th>
                                    <td>${tiempo1s.toFixed(2)}</td>  
                                    <td>${tiempo1n.toFixed(2)}</td>   
                                    <td>${frecuencia1.toFixed(2)}</td>                           
                                </tr>
                                <tr>
                                    <th scope="row">CPU 2:</th>
                                    <td>${tiempo2s.toFixed(2)}</td>
                                    <td>${tiempo2n.toFixed(2)}</td>
                                    <td>${frecuencia2.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>Conclusión: ${tiempo1s < tiempo2s ? "CPU 1 es más eficiente que CPU 2." : "CPU 2 es más eficiente que CPU 1."}</p>
                    </div>
                `;
            }

        })
        .catch(error => {
            console.error('Error al cargar el programa 1:', error);
        });
}

// Función para cargar el programa 2
function cargarPrograma2() {
    fetch('../views/program2.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('section_2').innerHTML = html;


            const botonTabla = document.getElementById('genTabla');

            botonTabla.addEventListener('click', () => {
                // Obtener los valores ingresados por el usuario
                const instrucciones = document.getElementById('instrucciones').value.split(',').map(item => item.trim());
                const ciclos = document.getElementById('ciclos').value.split(',').map(item => item.trim());
                const veces = document.getElementById('veces').value.split(',').map(item => item.trim());
                let frecuencia = parseFloat(document.getElementById('frecuencia').value);
                let tiempoEjecucion = parseFloat(document.getElementById('tiempo-ejecucion').value);
    
                // Obtener la opción seleccionada
                const opcionSeleccionada = document.getElementById('que-desea-calcular').value;
    
                // Obtener las unidades seleccionadas
                const frecuenciaUnidad = document.getElementById('frecuencia-unidad').value;
                const tiempoEjecucionUnidad = document.getElementById('tiempo-ejecucion-unidad').value;
    
                // Calcular los ciclos totales
                let ciclosTotales = 0;
                for (let i = 0; i < ciclos.length; i++) {
                    ciclosTotales += parseInt(ciclos[i]) * parseInt(veces[i]);
                }
    
                // Convertir la frecuencia a megahertz si es kilohertz
                if (frecuenciaUnidad === 'kilohertz') {
                    frecuencia /= 1000;
                }
                
    
                // Convertir el tiempo de ejecución a segundos si es nanosegundos
                if (tiempoEjecucionUnidad === 'nanosegundos') {
                    tiempoEjecucion /= 1000000000;
                }
    
                // Convertir el tiempo de ejecución a segundos si es milisegundos
                if (tiempoEjecucionUnidad === 'milisegundos') {
                    tiempoEjecucion = tiempoEjecucion / 1000;
                }
    
    
                // Calcular el tiempo de ejecución o la frecuencia según la opción seleccionada
                //pasar de microsegundos a segundos y de segundos a nanosegundos
                let resultado;
                let tiempoejecucionnano=0;
                let tiempoejecucionseg=0;
                if (opcionSeleccionada === 'tiempoejecucion') {
                    resultado = ciclosTotales / frecuencia;
                    tiempoejecucionseg=resultado * 1e-6; //segundos
                    tiempoejecucionnano = tiempoejecucionseg * 1e+9; //nanosegundos
                } else if (opcionSeleccionada === 'frecuencia') {
                    resultado = ciclosTotales / tiempoEjecucion;
                    tiempoejecucionnano = tiempoEjecucion * 1e+9; //nanosegundos
                }
    
                // Construir la tabla HTML
                let tablaHTML = `
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Instrucciones</th>
                                    <th>Ciclos</th>
                                    <th>Veces que se repite</th>
                                </tr>
                            </thead>
                            <tbody>
                `;
                for (let i = 0; i < instrucciones.length; i++) {
                    tablaHTML += `
                        <tr>
                            <td>${instrucciones[i]}</td>
                            <td>${ciclos[i]}</td>
                            <td>${veces[i]}</td>
                        </tr>
                    `;
                }
                tablaHTML += `
                            </tbody>
                        </table>
                    </div>
                `;
    
                // Mostrar la tabla en el área de resultado
                document.getElementById('tablaResultado').innerHTML = tablaHTML;
    
                // Mostrar los ciclos totales
                document.getElementById('tablaResultado').insertAdjacentHTML('beforeend', `<p>Ciclos Totales: ${ciclosTotales}</p>`);
                   // Mostrar el tiempo de ejecucion en nanosegundos 
                   document.getElementById('tablaResultado').insertAdjacentHTML('beforeend', `<p>Tiempo nanoSegundos: ${tiempoejecucionnano.toFixed(2)}</p>`);
                // Mostrar el resultado (tiempo de ejecución o frecuencia)
                const unidad = opcionSeleccionada === 'tiempoejecucion' ? 'microSegundos' : 'MHZ';
                document.getElementById('tablaResultado').insertAdjacentHTML('beforeend', `<p>Resultado: ${resultado.toFixed(2)} ${unidad}</p>`);
            });

        })
        .catch(error => {
            console.error('Error al cargar el programa 2:', error);
        });
}

// Agregar eventos de clic a los botones
btnPrograma1.addEventListener('click', cargarPrograma1);
btnPrograma2.addEventListener('click', cargarPrograma2);