function initProgram1() {
    document.getElementById('botonComparar').addEventListener('click', function () {
        // Recoger valores del formulario
        const frecuenciaCPU1 = document.getElementById('frecuenciaCPU1').value;
        const ciclosCPU1 = document.getElementById('ciclosCPU1').value;
        const frecuenciaCPU2 = document.getElementById('frecuenciaCPU2').value;
        const ciclosCPU2 = document.getElementById('ciclosCPU2').value;

        // Aquí iría la lógica para calcular el tiempo de ejecución y otros cálculos relevantes

        // Ejemplo de cómo mostrar resultados
        const resultados = document.getElementById('resultadoComparacion');
        resultados.innerHTML = `
            <h4>Resultados de Comparación</h4>
            <p>Resultado para CPU 1: ...</p>
            <p>Resultado para CPU 2: ...</p>
            <p>Conclusión: ...</p>
        `;
    });
}


