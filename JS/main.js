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
                const frecuenciaCPU1 = Number(document.getElementById('frecuenciaCPU1').value); // En MHz
                const ciclosCPU1 = Number(document.getElementById('ciclosCPU1').value);
                const frecuenciaCPU2 = Number(document.getElementById('frecuenciaCPU2').value); // En MHz
                const ciclosCPU2 = Number(document.getElementById('ciclosCPU2').value);
                const tipoFrecuenciaCPU1 = Number(document.getElementById('fuCPU1').value);
                const tipoFrecuenciaCPU2 = Number(document.getElementById('fuCPU2').value);
            
                // Función para ajustar la frecuencia según el tipo
                function ajustarFrecuencia(frecuencia, tipo) {
                    switch(tipo) {
                        case 1: // MHz a Hz
                            return frecuencia * 1e6;
                        case 2: // kHz a Hz
                            return frecuencia * 1e3;
                        case 3: // Hz
                            return frecuencia;
                        default:
                            return frecuencia; // Por defecto asume que ya está en Hz
                    }
                }
            
                // Función para calcular el tiempo de ejecución en nanosegundos
                function calcularTiempoEjecucion(ciclos, frecuencia, tipo) {
                    const frecuenciaAjustada = ajustarFrecuencia(frecuencia, tipo);
                    const tiempoEjecucionSegundos = ciclos / frecuenciaAjustada;
                    return tiempoEjecucionSegundos * 1e9; // Convertir a nanosegundos
                }
            
                // Calcular tiempos de ejecución
                const tiempoEjecucionCPU1Nano = calcularTiempoEjecucion(ciclosCPU1, frecuenciaCPU1, tipoFrecuenciaCPU1);
                const tiempoEjecucionCPU2Nano = calcularTiempoEjecucion(ciclosCPU2, frecuenciaCPU2, tipoFrecuenciaCPU2);
            
                // Mostrar resultados
                mostrarResultados(tiempoEjecucionCPU1Nano, tiempoEjecucionCPU2Nano);
            });
            
            function mostrarResultados(tiempo1, tiempo2) {
                const resultados = document.getElementById('resultadoComparacion');
                resultados.innerHTML = `
                    <div class="alert alert-success" role="alert">
                        <h4>Resultados de Comparación</h4>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Tiempo de ejecución (nanosegundos)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">CPU 1:</th>
                                    <td>${tiempo1.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <th scope="row">CPU 2:</th>
                                    <td>${tiempo2.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>Conclusión: ${tiempo1 < tiempo2 ? "CPU 1 es más eficiente que CPU 2." : "CPU 2 es más eficiente que CPU 1."}</p>
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



