// main.js
document.addEventListener('DOMContentLoaded', function() {
    const pageContainer = document.getElementById('page-container');
    pageContainer.innerHTML = cargarNavbar() + cargarHero() + cargarContenidoPrincipal() + cargarFooter();
});

function cargarContenidoPrincipal() {
    return `
        <main id="content-wrap" class="container my-4">
            <div class="text-center">
                <div class="row mb-2">
                    <h2 class="fw-bold">Elige el Programa</h2>
                    <p>Selecciona el tipo de comparación que deseas realizar.</p>
                </div>

                <div class="row g-4">
                    <div class="col-md-6 mb-3">
                        <div class="card border-0 shadow-lg h-100" style="border-radius: 10px; cursor: pointer;">
                            <div class="card-header bg-primary text-white" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                                Programa 1
                            </div>
                            <div class="card-body bg-light text-dark" style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                                <h3 class="card-title">Comparativo Detallado</h3>
                                <p class="card-text">Comparativo detallado de dos o más procesadores. Descubre cuál ofrece el mejor rendimiento para tus necesidades.</p>
                                <button class="btn btn-primary btn-lg " onclick="cargarPrograma1()">Explorar Programa 1</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="card border-0 shadow-lg h-100" style="border-radius: 10px; cursor: pointer;">
                            <div class="card-header bg-secondary text-white" style="border-top-left-radius: 10px; border-top-right-radius: 10px;">
                                Programa 2
                            </div>
                            <div class="card-body bg-light text-dark" style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
                                <h3 class="card-title">Cálculos Específicos</h3>
                                <p class="card-text">Cálculos específicos de tiempo de ejecución y frecuencia. Averigua las capacidades reales de tu hardware.</p>
                                <button class="btn btn-secondary btn-lg " onclick="cargarPrograma2()">Explorar Programa 2</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    `;
}


function cargarPrograma1() {
    fetch('../views/program1.html')
        .then(response => response.text())
        .then(html => {
            const pageContainer = document.getElementById('page-container');
            pageContainer.innerHTML = cargarNavbar() + html + cargarFooter();
            initProgram1(); 
        })
        .catch(error => {
            console.error('Error al cargar el programa 1:', error);
        });
}



function cargarPrograma2() {
    fetch('../views/program2.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('content-wrap').innerHTML = html;
        })
        .catch(error => {
            console.error('Error al cargar el programa 2:', error);
        });
}

function cargarVistaPrincipal() {
    // Aquí estamos reutilizando la función definida previamente que muestra el contenido principal con las opciones de los programas.
    const pageContainer = document.getElementById('page-container');
    pageContainer.innerHTML = cargarNavbar() + cargarHero() + cargarContenidoPrincipal() + cargarFooter();
}

document.addEventListener('DOMContentLoaded', cargarVistaPrincipal);

