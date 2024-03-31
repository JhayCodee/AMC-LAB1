function initProgram1() {
    document.getElementById('botonComparar').addEventListener('click', function () {
        // Recoger valores del formulario y convertirlos a números
        const frecuenciaCPU1 = Number(document.getElementById('frecuenciaCPU1').value); // En MHz
        const ciclosCPU1 = Number(document.getElementById('ciclosCPU1').value);
        const frecuenciaCPU2 = Number(document.getElementById('frecuenciaCPU2').value); // En MHz
        const ciclosCPU2 = Number(document.getElementById('ciclosCPU2').value);
        const tipoFrecuenciaCPU1 = Number(document.getElementById('fuCPU1').value);
        const tipoFrecuenciaCPU2 = Number(document.getElementById('fuCPU2').value);

// Definir las variables tiempoEjecucionCPU1 y tiempoEjecucionCPU2 antes del bloque if
let tiempoEjecucionCPU1;
let tiempoEjecucionCPU2;

let tiempoEjecucionCPU1Nano;
let tiempoEjecucionCPU2Nano;

// 1 para Mega Hertz 2 para kilo Hertz 3 para Hertz
if (tipoFrecuenciaCPU1 == 1 && tipoFrecuenciaCPU2 == 1) {
    // Segundos
    tiempoEjecucionCPU1 = ciclosCPU1 / (frecuenciaCPU1);
    tiempoEjecucionCPU2 = ciclosCPU2 / (frecuenciaCPU2);
    // Nano segundos
    tiempoEjecucionCPU1Nano = tiempoEjecucionCPU1 * 1000000000;
    tiempoEjecucionCPU2Nano = tiempoEjecucionCPU2 * 1000000000;
} else if (tipoFrecuenciaCPU1 == 1 && tipoFrecuenciaCPU2 == 2) {
    tiempoEjecucionCPU1 = ciclosCPU1 / (frecuenciaCPU1);
    tiempoEjecucionCPU2 = ciclosCPU2 / (frecuenciaCPU2/1000);

    tiempoEjecucionCPU1Nano = tiempoEjecucionCPU1 * 1000000000;
    tiempoEjecucionCPU2Nano = tiempoEjecucionCPU2 * 1000000000;
}
else if (tipoFrecuenciaCPU1 == 2 && tipoFrecuenciaCPU2 == 1) {
    tiempoEjecucionCPU1 = ciclosCPU1 / (frecuenciaCPU1/100);
    tiempoEjecucionCPU2 = ciclosCPU2 / (frecuenciaCPU2);

    tiempoEjecucionCPU1Nano = tiempoEjecucionCPU1 * 1000000000;
    tiempoEjecucionCPU2Nano = tiempoEjecucionCPU2 * 1000000000;
}
else if (tipoFrecuenciaCPU1 == 2 && tipoFrecuenciaCPU2 == 2) {
    tiempoEjecucionCPU1 = ciclosCPU1 / (frecuenciaCPU1/1000);
    tiempoEjecucionCPU2 = ciclosCPU2 / (frecuenciaCPU2/1000);

    tiempoEjecucionCPU1Nano = tiempoEjecucionCPU1 * 1000000000;
    tiempoEjecucionCPU2Nano = tiempoEjecucionCPU2 * 1000000000;

}else if(tipoFrecuenciaCPU1 == 1 && tipoFrecuenciaCPU2 == 3){
    tiempoEjecucionCPU1 = ciclosCPU1 / (frecuenciaCPU1);
    tiempoEjecucionCPU2 = ciclosCPU2 / (frecuenciaCPU2/1e+6);

    tiempoEjecucionCPU1Nano = tiempoEjecucionCPU1 * 1000000000;
    tiempoEjecucionCPU2Nano = tiempoEjecucionCPU2 * 1000000000;
}else if(tipoFrecuenciaCPU1 == 2 && tipoFrecuenciaCPU2 == 3){
    tiempoEjecucionCPU1 = ciclosCPU1 / (frecuenciaCPU1/1000);
    tiempoEjecucionCPU2 = ciclosCPU2 / (frecuenciaCPU2/1e+6);

    tiempoEjecucionCPU1Nano = tiempoEjecucionCPU1 * 1000000000;
    tiempoEjecucionCPU2Nano = tiempoEjecucionCPU2 * 1000000000;
}
else if(tipoFrecuenciaCPU1 == 3 && tipoFrecuenciaCPU2 == 1){
    tiempoEjecucionCPU1 = ciclosCPU1 / (frecuenciaCPU1/1e+6);
    tiempoEjecucionCPU2 = ciclosCPU2 / (frecuenciaCPU2);

    tiempoEjecucionCPU1Nano = tiempoEjecucionCPU1 * 1000000000;
    tiempoEjecucionCPU2Nano = tiempoEjecucionCPU2 * 1000000000;

} else if(tipoFrecuenciaCPU1 == 3 && tipoFrecuenciaCPU2 == 2){
    tiempoEjecucionCPU1 = ciclosCPU1 / (frecuenciaCPU1/1e+6);
    tiempoEjecucionCPU2 = ciclosCPU2 / (frecuenciaCPU2/1000);

    tiempoEjecucionCPU1Nano = tiempoEjecucionCPU1 * 1000000000;
    tiempoEjecucionCPU2Nano = tiempoEjecucionCPU2 * 1000000000;
}
else if(tipoFrecuenciaCPU1 == 3 && tipoFrecuenciaCPU2 == 3){
    tiempoEjecucionCPU1 = ciclosCPU1 / (frecuenciaCPU1/1e6);
    tiempoEjecucionCPU2 = ciclosCPU2 / (frecuenciaCPU2/1e6);

    tiempoEjecucionCPU1Nano = tiempoEjecucionCPU1 * 1000000000;
    tiempoEjecucionCPU2Nano = tiempoEjecucionCPU2 * 1000000000;
}

        // Calcular el tiempo de ejecución directamente con la frecuencia en MHz
        // Nota: La fórmula se ajusta para trabajar directamente con MHz en lugar de Hz
        //const tiempoEjecucionCPU1 = ciclosCPU1 / (frecuenciaCPU1); // Tiempo en segundos
        //const tiempoEjecucionCPU2 = ciclosCPU2 / (frecuenciaCPU2); // Tiempo en segundos

        // Ejemplo de cómo mostrar resultados
        // Otra forma de mostra los resultados


        const resultados = document.getElementById('resultadoComparacion');
        resultados.innerHTML = `
            <div class="alert alert-success" role="alert">
                <h4>Resultados de Comparación</h4>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Tiempo de ejecución (segundos)</th>
                            <th scope="col">Tiempo de ejecución (nanosegundos)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">CPU 1:</th>
                            <td>${tiempoEjecucionCPU1.toFixed(2)}</td>
                            <td>${tiempoEjecucionCPU1Nano}</td>
                        </tr>
                        <tr>
                            <th scope="row">CPU 2:</th>
                            <td>${tiempoEjecucionCPU2}</td>
                            <td>${tiempoEjecucionCPU2Nano}</td>
                        </tr>
                    </tbody>
                </table>
                <p>Conclusión: ${
                tiempoEjecucionCPU1 < tiempoEjecucionCPU2
                    ? "CPU 1 es más eficiente que CPU 2."
                    : "CPU 2 es más eficiente que CPU 1."
                }</p>
            </div>
        `;
    });
}

initProgram1();
