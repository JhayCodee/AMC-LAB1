function initProgram2() {
    document.getElementById('botonComparar').addEventListener('click', function () {
        // Recoger valores del formulario y convertirlos a números
        const frecuenciaCPU1 = Number(document.getElementById('frecuenciaCPU1').value); // En MHz
        const ciclosCPU1 = Number(document.getElementById('ciclosCPU1').value);
        const frecuenciaCPU2 = Number(document.getElementById('frecuenciaCPU2').value); // En MHz
        const ciclosCPU2 = Number(document.getElementById('ciclosCPU2').value);

        // Calcular el tiempo de ejecución directamente con la frecuencia en MHz
        // Nota: La fórmula se ajusta para trabajar directamente con MHz en lugar de Hz
        const tiempoEjecucionCPU1 = ciclosCPU1 / (frecuenciaCPU1 * 1e6); // Tiempo en segundos
        const tiempoEjecucionCPU2 = ciclosCPU2 / (frecuenciaCPU2 * 1e6); // Tiempo en segundos

        // Ejemplo de cómo mostrar resultados
        const resultados = document.getElementById('resultadoComparacion');
        resultados.innerHTML = `
            <h4>Resultados de Comparación</h4>
            <p>Resultado para CPU 1: ${tiempoEjecucionCPU1.toFixed(2)} segundos (${frecuenciaCPU1} MHz)</p>
            <p>Resultado para CPU 2: ${tiempoEjecucionCPU2.toFixed(2)} segundos (${frecuenciaCPU2} MHz)</p>
            <p>Conclusión: ${
              tiempoEjecucionCPU1 < tiempoEjecucionCPU2
                ? "CPU 1 es más eficiente que CPU 2."
                : "CPU 2 es más eficiente que CPU 1."
            }</p>
        `;
    });
}

export default initProgram2();
